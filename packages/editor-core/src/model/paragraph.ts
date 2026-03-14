import type { Paragraph, TextContent } from '@eiinu/editor-protocol';
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
   * 判断字符是否属于东亚字符集 (CJK)
   */
  private isEastAsian(char: string): boolean {
    const code = char.charCodeAt(0);
    return (
      (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
      (code >= 0x3400 && code <= 0x4dbf) || // CJK Unified Ideographs Extension A
      (code >= 0x3000 && code <= 0x303f) || // CJK Symbols and Punctuation
      (code >= 0xff00 && code <= 0xffef)    // Halfwidth and Fullwidth Forms
    );
  }

  /**
   * 获取当前字符应使用的字体名称
   */
  private getFontForChar(run: RunElement, char: string): string {
    const props = run.getData().properties;
    const fonts = props.fonts;
    
    if (!fonts) return props.fontFamily || 'Arial';
    
    if (this.isEastAsian(char)) {
      return fonts.eastAsia || props.fontFamily || 'SimSun';
    } else {
      const code = char.charCodeAt(0);
      if (code <= 127) {
        return fonts.ascii || props.fontFamily || 'Arial';
      } else if (code <= 255) {
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
      if (data.content.type !== 'text') continue;
      
      const text = (data.content as TextContent).text;
      const fontSize = data.properties.fontSize ? (data.properties.fontSize / 2) : 12;
      const bold = data.properties.bold ? 'bold' : '';
      const italic = data.properties.italic ? 'italic' : '';
      
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
          const w = this.fontManager.measureText(ctx, subtext, currentFont);

          if (currentLine.width + w > maxWidth) {
            // 需要换行
            if (i > segmentStart + 1) {
              const finalSubtext = segmentText.substring(segmentStart, i - 1);
              const finalW = this.fontManager.measureText(ctx, finalSubtext, currentFont);
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
              const singleW = this.fontManager.measureText(ctx, singleChar, currentFont);
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
        ctx.font = frag.font;
        // 提取颜色
        const props = frag.run.getData().properties;
        ctx.fillStyle = props.color || '#000000';
        ctx.fillText(frag.text, drawX, currentY);
        
        // 渲染装饰线 (委托给 RunElement，但由于我们现在是在段落中切分的文本，需要特殊处理)
        // 为了简单，我们直接在 Paragraph 中处理 Fragment 的装饰线
        if (props.underline || props.strike) {
          const fontSize = props.fontSize ? (props.fontSize / 2) : 12;
          ctx.beginPath();
          ctx.strokeStyle = props.color || '#000000';
          ctx.lineWidth = 1;
          if (props.underline) {
            ctx.moveTo(drawX, currentY + 2);
            ctx.lineTo(drawX + frag.width, currentY + 2);
          }
          if (props.strike) {
            ctx.moveTo(drawX, currentY - fontSize / 3);
            ctx.lineTo(drawX + frag.width, currentY - fontSize / 3);
          }
          ctx.stroke();
        }

        drawX += frag.width;
      });

      currentY += line.height * lineSpacing;
    });

    return currentY + spacingAfter;
  }
}
