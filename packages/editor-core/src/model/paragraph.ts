import type { Paragraph, TextContent } from '@eiinu/editor-protocol';
import { UnicodeRange } from '@eiinu/editor-utils';
import { DocumentElement, RenderContext } from './base.js';
import { RunElement } from './run.js';
import { FontManager } from '../fonts/font-manager.js';

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
    this.runs = data.children.map(run => new RunElement(run));
    this.fontManager = FontManager.getInstance();
  }

  /**
   * 获取当前字符应使用的字体名称
   */
  private getFontForChar(run: RunElement, char: string): string {
    const props = run.getData().properties;
    const fonts = props.fonts;
    
    if (!fonts) return props.fontFamily || 'Arial';
    
    if (UnicodeRange.isEastAsian(char)) {
      return fonts.eastAsia || props.fontFamily || 'SimSun';
    } else {
      if (UnicodeRange.isASCII(char)) {
        return fonts.ascii || props.fontFamily || 'Arial';
      } else if (UnicodeRange.isHighANSI(char)) {
        return fonts.hAnsi || fonts.ascii || props.fontFamily || 'Arial';
      } else {
        return fonts.cs || fonts.ascii || props.fontFamily || 'Arial';
      }
    }
  }

  /**
   * 布局计算 (自动换行 + 混合字体处理)
   */
  layout(context: RenderContext): number {
    const { ctx, maxWidth } = context;
    this.lines = [];
    let currentLine: RenderLine = { fragments: [], width: 0, height: 0 };

    for (const run of this.runs) {
      const data = run.getData();
      if (data.content.type !== 'text' || data.properties.vanish) continue;
      
      let text = (data.content as TextContent).text;
      const props = data.properties;
      
      // 处理全部大写转换 (smallCaps 模式下使用原文/小写进行测量，符合排版逻辑)
      if (props.caps) {
        text = text.toUpperCase();
      }

      const originalFontSize = props.fontSize ? (props.fontSize / 2) : 12;
      const vertAlign = data.properties.vertAlign || 'baseline';
      
      // 上下标缩放比例 (通常为 0.6-0.7)
      const fontSize = vertAlign !== 'baseline' ? originalFontSize * 0.65 : originalFontSize;
      
      const bold = data.properties.bold ? 'bold' : '';
      const italic = data.properties.italic ? 'italic' : '';
      
      const letterSpacing = (props.letterSpacing || 0) * 0.05; // 1 twip = 0.05px
      
      let start = 0;
      while (start < text.length) {
        // 1. 确定当前字符块的字体
         const firstChar = text[start];
         const currentFontFamily = this.getFontForChar(run, firstChar);
         const currentFont = `${italic} ${bold} ${fontSize}px ${this.fontManager.getFontFamily(currentFontFamily)}`.trim();
         
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
          // 测量时加上字符间距
          const w = this.fontManager.measureText(ctx, subtext, currentFont) + (subtext.length * letterSpacing);

          if (currentLine.width + w > maxWidth) {
            // 需要换行
            if (i > segmentStart + 1) {
              const finalSubtext = segmentText.substring(segmentStart, i - 1);
              const finalW = this.fontManager.measureText(ctx, finalSubtext, currentFont) + (finalSubtext.length * letterSpacing);
              currentLine.fragments.push({ run, text: finalSubtext, width: finalW, font: currentFont });
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
              const singleW = this.fontManager.measureText(ctx, singleChar, currentFont) + letterSpacing;
              currentLine.width = singleW;
              currentLine.height = fontSize;
              currentLine.fragments.push({ run, text: singleChar, width: singleW, font: currentFont });
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
    const { ctx, maxWidth } = context;
    const spacingBefore = (this.data.properties.spacing?.before || 0) * 0.05;
    const spacingAfter = (this.data.properties.spacing?.after || 0) * 0.05;
    
    let currentY = y + spacingBefore;
    const lineSpacing = 1.2;

    this.lines.forEach(line => {
      let offsetX = 0;
      if (this.data.properties.alignment === 'center') {
        offsetX = (maxWidth - line.width) / 2;
      } else if (this.data.properties.alignment === 'right') {
        offsetX = maxWidth - line.width;
      }

      let drawX = x + offsetX;

      line.fragments.forEach(frag => {
        // 每个 fragment 的样式完全独立，使用 save/restore 包裹整个绘制过程
        ctx.save();

        ctx.font = frag.font;
        // 提取颜色
        const props = frag.run.getData().properties;
        ctx.fillStyle = props.color || '#000000';
        
        // 处理文字内容 (caps 转换为全大写)
        let drawText = frag.text;
        if (props.caps) {
          drawText = drawText.toUpperCase();
        }

        // 处理上下标偏移
        let drawY = currentY;
        const originalFontSize = props.fontSize ? (props.fontSize / 2) : 12;
        if (props.vertAlign === 'superscript') {
          drawY -= originalFontSize * 0.35; // 向上偏移
        } else if (props.vertAlign === 'subscript') {
          drawY += originalFontSize * 0.15; // 向下偏移
        }

        // 绘制高亮或底纹背景
        if (props.highlight || props.shading) {
          ctx.fillStyle = (props.highlight || props.shading) as string;
          // 高亮/底纹高度通常覆盖整个行高
          ctx.fillRect(drawX, currentY - line.height, frag.width, line.height * lineSpacing);
          // 恢复原来的 fillStyle
          ctx.fillStyle = props.color || '#000000';
        }

        // 处理文字特效 (Shadow, Outline, Emboss, Imprint)
        if (props.shadow) {
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
        }
        if (props.outline) {
          ctx.strokeStyle = props.color || '#000000';
          ctx.lineWidth = 0.5;
          ctx.strokeText(drawText, drawX, drawY); // 只有在不是 smallCaps 时才这样简单处理，smallCaps 需要逐字符
        }
        if (props.emboss) {
          // 简单模拟：向左上偏移白色，向右下偏移黑色
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fillText(drawText, drawX - 0.5, drawY - 0.5);
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.fillText(drawText, drawX + 0.5, drawY + 0.5);
          ctx.fillStyle = props.color || '#000000';
        }
        if (props.imprint) {
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fillText(drawText, drawX + 0.5, drawY + 0.5);
          ctx.fillStyle = props.color || '#000000';
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

            // 记录原始字符的测量宽度 (排版宽度，已包含 letterSpacing)
            const charLayoutWidth = ctx.measureText(char).width + letterSpacing;

            if (isLower) {
              // 如果是小写字母，则渲染为较小字号的大写字母
              const smallFontSize = (props.fontSize ? (props.fontSize / 2) : 12) * 0.85;
              const weight = props.bold ? 'bold' : 'normal';
              const style = props.italic ? 'italic' : 'normal';
              const fontFamily = ctx.font.split(' ').pop();
              ctx.font = `${style} ${weight} ${smallFontSize}px ${fontFamily}`;

              ctx.fillText(char.toUpperCase(), currentX, drawY);
              // 恢复原始字体
              ctx.font = frag.font;
            } else {
              ctx.fillText(char, currentX, drawY);
            }

            currentX += charLayoutWidth;
          }
        } else {
          // 如果有字符间距，需要逐个字符绘制或使用更现代的 Canvas API (如果支持)
          if (letterSpacing !== 0) {
            let currentX = drawX;
            for (const char of drawText) {
              ctx.fillText(char, currentX, drawY);
              currentX += ctx.measureText(char).width + letterSpacing;
            }
          } else {
            ctx.fillText(drawText, drawX, drawY);
          }
        }

        // 渲染装饰线
        if (props.underline || props.strike || props.doubleStrike) {
          const fontSize = props.fontSize ? (props.fontSize / 2) : 12;
          // 装饰线也需要跟随上下标缩放和偏移
          const decorFontSize = props.vertAlign !== 'baseline' ? fontSize * 0.65 : fontSize;

          ctx.lineWidth = 1;

          if (props.underline) {
            ctx.beginPath();
            ctx.strokeStyle = props.underlineColor || props.color || '#000000';
            ctx.moveTo(drawX, drawY + 2);
            ctx.lineTo(drawX + frag.width, drawY + 2);
            ctx.stroke();
          }

          if (props.strike) {
            ctx.beginPath();
            ctx.strokeStyle = props.color || '#000000';
            ctx.moveTo(drawX, drawY - decorFontSize / 3);
            ctx.lineTo(drawX + frag.width, drawY - decorFontSize / 3);
            ctx.stroke();
          }

          if (props.doubleStrike) {
            ctx.beginPath();
            ctx.strokeStyle = props.color || '#000000';
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

    return currentY + spacingAfter;
  }
}
