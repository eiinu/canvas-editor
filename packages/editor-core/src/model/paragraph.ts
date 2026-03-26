import type { Paragraph, TextContent, MathContent } from "@eiinu/editor-protocol";
import { UnicodeRange, TextDirection } from "@eiinu/editor-utils";
import { DocumentElement, type RenderContext } from "./base.js";
import { RunElement } from "./run.js";
import { FontManager } from "../fonts/font-manager.js";

interface LineFragment {
  run: RunElement;
  text: string;
  width: number;
  font: string; // 每个片段使用的具体字体
}

interface RenderLine {
  fragments: LineFragment[];
  width: number;
  height: number;
}

/**
 * 段落元素
 */
export class ParagraphElement extends DocumentElement<Paragraph> {
  private runs: RunElement[];
  private lines: RenderLine[] = [];
  private fontManager: FontManager;

  constructor(data: Paragraph) {
    super(data.id, data);
    this.runs = data.children.map((run) => new RunElement(run));
    this.fontManager = FontManager.getInstance();
  }

  /**
   * 获取当前字符应使用的字体名称
   */
  private getFontForChar(run: RunElement, char: string): string {
    const props = run.getData().properties;
    const fonts = props.fonts;

    if (!fonts) return props.fontFamily || "Arial";

    // 首先检查是否为 emoji 字符
    if (UnicodeRange.isEmoji(char)) {
      return (
        fonts.emoji ||
        'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif'
      );
    }

    if (UnicodeRange.isEastAsian(char)) {
      return fonts.eastAsia || props.fontFamily || "SimSun";
    } else {
      if (UnicodeRange.isASCII(char)) {
        return fonts.ascii || props.fontFamily || "Arial";
      } else if (UnicodeRange.isHighANSI(char)) {
        return fonts.hAnsi || fonts.ascii || props.fontFamily || "Arial";
      } else {
        return fonts.cs || fonts.ascii || props.fontFamily || "Arial";
      }
    }
  }

  /**
   * 布局计算 (自动换行 + 混合字体处理)
   */
  layout(context: RenderContext): number {
    const { ctx, maxWidth, cellOptions, dpr } = context;
    this.lines = [];
    let currentLine: RenderLine = { fragments: [], width: 0, height: 0 };

    // 检查是否需要禁止换行
    const noWrap = cellOptions?.noWrap || false;
    // 检查是否需要文本自适应单元格
    // const fitText = cellOptions?.fitText || false;

    for (const run of this.runs) {
      const data = run.getData();
      if ((data.content.type !== "text" && data.content.type !== "math") || data.properties.vanish)
        continue;

      let text = (data.content as TextContent | MathContent).text;
      const props = data.properties;

      // 处理全部大写转换 (smallCaps 模式下使用原文/小写进行测量，符合排版逻辑)
      // 注意：emoji 字符不应该被转换
      if (props.caps) {
        text = text
          .split("")
          .map((char) => {
            // 如果是 emoji，保持原样
            if (UnicodeRange.isEmoji(char)) {
              return char;
            }
            return char.toUpperCase();
          })
          .join("");
      }

      const originalFontSize = props.fontSize ? (props.fontSize * (4 / 3)) / dpr : 12;
      const vertAlign = data.properties.vertAlign || "baseline";

      // 上下标缩放比例 (通常为 0.6-0.7)
      const fontSize = vertAlign !== "baseline" ? originalFontSize * 0.65 : originalFontSize;

      const bold = data.properties.bold ? "bold" : "";
      const italic = data.properties.italic ? "italic" : "";

      const letterSpacing = (props.letterSpacing || 0) * 0.05; // 1 twip = 0.05px

      let start = 0;
      while (start < text.length) {
        // 1. 确定当前字符块的字体
        const firstChar = text[start];
        const currentFontFamily = this.getFontForChar(run, firstChar);
        const currentFont =
          `${italic} ${bold} ${fontSize}px ${this.fontManager.getFontFamily(currentFontFamily)}`.trim();

        // 2. 找到相同字体的连续文本块
        let end = start + 1;
        while (end < text.length && this.getFontForChar(run, text[end]) === currentFontFamily) {
          end++;
        }

        const segmentText = text.substring(start, end);
        ctx.font = currentFont;

        // 3. 对该文本块进行换行处理
        let segmentStart = 0;
        for (let i = 1; i <= segmentText.length; i++) {
          const subtext = segmentText.substring(segmentStart, i);
          // 计算宽度，emoji 字符不应用字符间距
          const emojiCount = subtext.split("").filter((c) => UnicodeRange.isEmoji(c)).length;
          const nonEmojiCount = subtext.length - emojiCount;
          const w =
            this.fontManager.measureText(ctx, subtext, currentFont) + nonEmojiCount * letterSpacing;

          if (!noWrap && currentLine.width + w > maxWidth) {
            // 需要换行
            if (i > segmentStart + 1) {
              const finalSubtext = segmentText.substring(segmentStart, i - 1);
              const finalEmojiCount = finalSubtext
                .split("")
                .filter((c) => UnicodeRange.isEmoji(c)).length;
              const finalNonEmojiCount = finalSubtext.length - finalEmojiCount;
              const finalW =
                this.fontManager.measureText(ctx, finalSubtext, currentFont) +
                finalNonEmojiCount * letterSpacing;
              currentLine.fragments.push({
                run,
                text: finalSubtext,
                width: finalW,
                font: currentFont,
              });
              currentLine.width += finalW;
              currentLine.height = Math.max(currentLine.height, fontSize);
              this.lines.push(currentLine);

              currentLine = { fragments: [], width: 0, height: 0 };
              segmentStart = i - 1;
              i--;
            } else {
              // 单个字符就超过了宽度 (或者当前行已有内容)
              if (currentLine.fragments.length > 0) {
                this.lines.push(currentLine);
                currentLine = { fragments: [], width: 0, height: 0 };
              }
              const singleChar = segmentText.substring(segmentStart, i);
              const isEmoji = UnicodeRange.isEmoji(singleChar);
              const singleW =
                this.fontManager.measureText(ctx, singleChar, currentFont) +
                (isEmoji ? 0 : letterSpacing);
              currentLine.width = singleW;
              currentLine.height = fontSize;
              currentLine.fragments.push({
                run,
                text: singleChar,
                width: singleW,
                font: currentFont,
              });
              this.lines.push(currentLine);
              currentLine = { fragments: [], width: 0, height: 0 };
              segmentStart = i;
            }
          } else if (i === segmentText.length) {
            // 文本块结束，加入当前行
            currentLine.fragments.push({ run, text: subtext, width: w, font: currentFont });
            currentLine.width += w;
            currentLine.height = Math.max(currentLine.height, fontSize);
          }
        }

        start = end;
      }
    }

    if (currentLine.fragments.length > 0) {
      this.lines.push(currentLine);
    }

    // 计算内容高度 (行高 * 1.2)
    const contentHeight = this.lines.reduce((acc, line) => acc + line.height * 1.2, 0);

    // 加上段前距和段后距 (单位为 twips，需要转换为像素，简单处理 1 twip = 0.05px)
    const spacingBefore = (this.data.properties.spacing?.before || 0) * 0.05;
    const spacingAfter = (this.data.properties.spacing?.after || 0) * 0.05;

    return contentHeight + spacingBefore + spacingAfter;
  }

  /**
   * 渲染段落
   */
  render(context: RenderContext, x: number, y: number): number {
    const { ctx, maxWidth, dpr } = context;
    const spacingBefore = (this.data.properties.spacing?.before || 0) * 0.05;
    const spacingAfter = (this.data.properties.spacing?.after || 0) * 0.05;
    const indentLeft = (this.data.properties.indentation?.left || 0) * 0.05;
    const indentRight = (this.data.properties.indentation?.right || 0) * 0.05;
    const firstLineIndent = (this.data.properties.indentation?.firstLine || 0) * 0.05;
    const hangingIndent = (this.data.properties.indentation?.hanging || 0) * 0.05;

    let currentY = y + spacingBefore;
    const lineSpacing = 1.2;

    // 计算内容高度 (行高 * 1.2)
    // const contentHeight = this.lines.reduce((acc, line) => acc + line.height * 1.2, 0);

    // 绘制段落底纹 - 暂时注释掉
    /*
    if (this.data.properties.shading) {
      ctx.save();
      ctx.fillStyle = this.data.properties.shading;
      ctx.fillRect(x + indentLeft, y + spacingBefore, maxWidth - indentLeft - indentRight, contentHeight);
      ctx.restore();
    }
    */

    // 检测段落的主要文本方向
    let isRTL = false;
    for (const run of this.runs) {
      const data = run.getData();
      if (data.content.type === "text" || data.content.type === "math") {
        const text = (data.content as TextContent | MathContent).text;
        if (TextDirection.containsRTL(text)) {
          isRTL = true;
          break;
        }
      }
    }

    this.lines.forEach((line, index) => {
      let offsetX = 0;
      if (this.data.properties.alignment === "center") {
        offsetX = (maxWidth - indentLeft - indentRight - line.width) / 2;
      } else if (
        this.data.properties.alignment === "right" ||
        (isRTL && this.data.properties.alignment !== "left")
      ) {
        offsetX = maxWidth - indentLeft - indentRight - line.width;
      }

      // 应用缩进
      let drawX = x + indentLeft + offsetX;

      // 首行缩进或悬挂缩进
      if (index === 0) {
        if (firstLineIndent > 0) {
          drawX += isRTL ? -firstLineIndent : firstLineIndent;
        } else if (hangingIndent > 0) {
          drawX += isRTL ? hangingIndent : -hangingIndent;
        }
      } else if (hangingIndent > 0) {
        drawX += isRTL ? -hangingIndent : hangingIndent;
      }

      line.fragments.forEach((frag) => {
        // 每个 fragment 的样式完全独立，使用 save/restore 包裹整个绘制过程
        ctx.save();

        ctx.font = frag.font;
        // 提取颜色
        const props = frag.run.getData().properties;
        ctx.fillStyle = props.color || "#000000";

        // 处理文字内容 (caps 转换为全大写)
        let drawText = frag.text;
        if (props.caps) {
          drawText = drawText.toUpperCase();
        }

        // 处理上下标偏移
        let drawY = currentY;
        const originalFontSize = props.fontSize ? (props.fontSize * (4 / 3)) / dpr : 12;
        if (props.vertAlign === "superscript") {
          drawY -= originalFontSize * 0.35; // 向上偏移
        } else if (props.vertAlign === "subscript") {
          drawY += originalFontSize * 0.15; // 向下偏移
        }

        // 绘制高亮或底纹背景
        if (props.highlight || props.shading) {
          ctx.fillStyle = (props.highlight || props.shading) as string;
          // 高亮/底纹高度通常覆盖整个行高
          ctx.fillRect(drawX, currentY - line.height, frag.width, line.height * lineSpacing);
          // 恢复原来的 fillStyle
          ctx.fillStyle = props.color || "#000000";
        }

        // 处理文字特效 (Shadow, Outline, Emboss, Imprint)
        if (props.shadow) {
          ctx.shadowColor = "rgba(0,0,0,0.5)";
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
        }
        if (props.outline) {
          ctx.strokeStyle = props.color || "#000000";
          ctx.lineWidth = 0.5;
          ctx.strokeText(drawText, drawX, drawY); // 只有在不是 smallCaps 时才这样简单处理，smallCaps 需要逐字符
        }
        if (props.emboss) {
          // 简单模拟：向左上偏移白色，向右下偏移黑色
          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.fillText(drawText, drawX - 0.5, drawY - 0.5);
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillText(drawText, drawX + 0.5, drawY + 0.5);
          ctx.fillStyle = props.color || "#000000";
        }
        if (props.imprint) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillText(drawText, drawX + 0.5, drawY + 0.5);
          ctx.fillStyle = props.color || "#000000";
        }

        // 处理字符间距绘制逻辑
        const letterSpacing = (props.letterSpacing || 0) * 0.05;

        // 处理小型大写字母渲染
        if (props.smallCaps) {
          const rawText = frag.text;
          let currentX = drawX;
          for (let i = 0; i < rawText.length; i++) {
            const char = rawText[i];
            const isLower = char === char.toLowerCase() && char !== char.toUpperCase();
            const isEmoji = UnicodeRange.isEmoji(char);

            // 记录原始字符的测量宽度 (排版宽度，已包含 letterSpacing)
            // 注意：emoji 通常不应用字符间距
            const applyLetterSpacing = !isEmoji;
            const charLayoutWidth =
              ctx.measureText(char).width + (applyLetterSpacing ? letterSpacing : 0);

            if (isLower && !isEmoji) {
              // 如果是小写字母且不是 emoji，则渲染为较小字号的大写字母
              const smallFontSize = (props.fontSize ? (props.fontSize * (4 / 3)) / dpr : 12) * 0.85;
              const weight = props.bold ? "bold" : "normal";
              const style = props.italic ? "italic" : "normal";
              const fontFamily = ctx.font.split(" ").pop();
              ctx.font = `${style} ${weight} ${smallFontSize}px ${fontFamily}`;

              ctx.fillText(char.toUpperCase(), currentX, drawY);
              // 恢复原始字体
              ctx.font = frag.font;
            } else {
              // emoji 或其他字符保持原样
              ctx.fillText(char, currentX, drawY);
            }

            currentX += charLayoutWidth;
          }
        } else {
          // 如果有字符间距，需要逐个字符绘制或使用更现代的 Canvas API (如果支持)
          if (letterSpacing !== 0) {
            let currentX = drawX;
            for (const char of drawText) {
              // emoji 不应用字符间距
              const isEmoji = UnicodeRange.isEmoji(char);
              ctx.fillText(char, currentX, drawY);
              const charWidth = ctx.measureText(char).width;
              currentX += charWidth + (isEmoji ? 0 : letterSpacing);
            }
          } else {
            ctx.fillText(drawText, drawX, drawY);
          }
        }

        // 渲染装饰线
        if (props.underline || props.strike || props.doubleStrike) {
          const fontSize = props.fontSize ? (props.fontSize * (4 / 3)) / dpr : 12;
          // 装饰线也需要跟随上下标缩放和偏移
          const decorFontSize = props.vertAlign !== "baseline" ? fontSize * 0.65 : fontSize;

          ctx.lineWidth = 1;

          if (props.underline) {
            ctx.beginPath();
            ctx.strokeStyle = props.underlineColor || props.color || "#000000";
            ctx.moveTo(drawX, drawY + 2);
            ctx.lineTo(drawX + frag.width, drawY + 2);
            ctx.stroke();
          }

          if (props.strike) {
            ctx.beginPath();
            ctx.strokeStyle = props.color || "#000000";
            ctx.moveTo(drawX, drawY - decorFontSize / 3);
            ctx.lineTo(drawX + frag.width, drawY - decorFontSize / 3);
            ctx.stroke();
          }

          if (props.doubleStrike) {
            ctx.beginPath();
            ctx.strokeStyle = props.color || "#000000";
            // 第一条线
            ctx.moveTo(drawX, drawY - decorFontSize / 3 - 1);
            ctx.lineTo(drawX + frag.width, drawY - decorFontSize / 3 - 1);
            // 第二条线
            ctx.moveTo(drawX, drawY - decorFontSize / 3 + 2);
            ctx.lineTo(drawX + frag.width, drawY - decorFontSize / 3 + 2);
            ctx.stroke();
          }
        }

        // 恢复所有样式状态，确保不影响后续片段
        ctx.restore();

        drawX += frag.width;
      });

      currentY += line.height * lineSpacing;
    });

    // 计算最终的底部位置，包括段后距
    const finalBottom = currentY + spacingAfter;

    // 绘制段落边框 - 暂时注释掉
    /*
    if (this.data.properties.borders) {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      
      // 计算实际内容边界
      let minX = x + indentLeft;
      let maxX = x + maxWidth - indentRight;
      let minY = y + spacingBefore;
      let maxY = finalBottom;
      
      // 绘制上边框
      if (this.data.properties.borders['w:top'] || this.data.properties.borders.top) {
        ctx.beginPath();
        ctx.moveTo(minX, minY);
        ctx.lineTo(maxX, minY);
        ctx.stroke();
      }
      
      // 绘制下边框
      if (this.data.properties.borders['w:bottom'] || this.data.properties.borders.bottom) {
        ctx.beginPath();
        ctx.moveTo(minX, maxY);
        ctx.lineTo(maxX, maxY);
        ctx.stroke();
      }
      
      // 绘制左边框
      if (this.data.properties.borders['w:left'] || this.data.properties.borders.left) {
        ctx.beginPath();
        ctx.moveTo(minX, minY);
        ctx.lineTo(minX, maxY);
        ctx.stroke();
      }
      
      // 绘制右边框
      if (this.data.properties.borders['w:right'] || this.data.properties.borders.right) {
        ctx.beginPath();
        ctx.moveTo(maxX, minY);
        ctx.lineTo(maxX, maxY);
        ctx.stroke();
      }
      
      ctx.restore();
    }
    */

    return finalBottom;
  }
}
