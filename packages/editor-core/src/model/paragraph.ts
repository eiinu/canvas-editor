import type { Paragraph, TextContent } from '@eiinu/editor-protocol';
import { DocumentElement, RenderContext } from './base.js';
import { RunElement } from './run.js';
import { FontManager } from '../fonts/font-manager.js';

interface LineFragment {
  run: RunElement;
  text: string;
  width: number;
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
   * 布局计算 (自动换行)
   */
  layout(context: RenderContext): number {
    const { ctx, maxWidth } = context;
    this.lines = [];
    let currentLine: RenderLine = { fragments: [], width: 0, height: 0 };

    for (const run of this.runs) {
      const data = run.getData();
      if (data.content.type !== 'text') continue;
      
      const text = (data.content as TextContent).text;
      run.applyStyles(ctx);
      
      let start = 0;
      for (let i = 1; i <= text.length; i++) {
        const subtext = text.substring(start, i);
        const w = this.fontManager.measureText(ctx, subtext, ctx.font);
        const fontSize = data.properties.fontSize ? (data.properties.fontSize / 2) : 12;

        if (currentLine.width + w > maxWidth) {
          if (i > start + 1) {
            const finalSubtext = text.substring(start, i - 1);
            const finalW = this.fontManager.measureText(ctx, finalSubtext, ctx.font);
            currentLine.fragments.push({ run, text: finalSubtext, width: finalW });
            currentLine.width += finalW;
            currentLine.height = Math.max(currentLine.height, fontSize);
            this.lines.push(currentLine);
            
            currentLine = { fragments: [], width: 0, height: 0 };
            start = i - 1;
            i--;
          } else {
            if (currentLine.fragments.length > 0) {
              this.lines.push(currentLine);
              currentLine = { fragments: [], width: 0, height: 0 };
            }
            const singleChar = text.substring(start, i);
            const singleW = this.fontManager.measureText(ctx, singleChar, ctx.font);
            currentLine.width = singleW;
            currentLine.height = fontSize;
            this.lines.push(currentLine);
            currentLine = { fragments: [], width: 0, height: 0 };
            start = i;
          }
        } else if (i === text.length) {
          currentLine.fragments.push({ run, text: subtext, width: w });
          currentLine.width += w;
          currentLine.height = Math.max(currentLine.height, fontSize);
        }
      }
    }

    if (currentLine.fragments.length > 0) {
      this.lines.push(currentLine);
    }

    // 计算总高度 (行高 * 1.2)
    return this.lines.reduce((acc, line) => acc + line.height * 1.2, 0);
  }

  /**
   * 渲染段落
   */
  render(context: RenderContext, x: number, y: number): number {
    const { ctx, maxWidth } = context;
    let currentY = y;
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
        frag.run.applyStyles(ctx);
        ctx.fillText(frag.text, drawX, currentY);
        
        // 渲染装饰线 (委托给 RunElement，但由于我们现在是在段落中切分的文本，需要特殊处理)
        // 为了简单，我们直接在 Paragraph 中处理 Fragment 的装饰线
        const props = frag.run.getData().properties;
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

    return currentY;
  }
}
