import type { Run, TextContent } from '@eiinu/editor-protocol';
import { DocumentElement, RenderContext } from './base.js';

/**
 * 文本运行块元素
 */
export class RunElement extends DocumentElement<Run> {
  constructor(data: Run) {
    super(Math.random().toString(36).substring(7), data);
  }

  layout(_context: RenderContext): number {
    // Run 本身不独立占行，高度由 Paragraph 决定
    return 0;
  }

  /**
   * 测量文本宽度
   */
  measureWidth(ctx: CanvasRenderingContext2D): number {
    if (this.data.content.type !== 'text') return 0;
    this.applyStyles(ctx);
    return ctx.measureText((this.data.content as TextContent).text).width;
  }

  /**
   * 渲染 Run
   */
  render(context: RenderContext, x: number, y: number): number {
    const { ctx } = context;
    const { properties, content } = this.data;

    if (content.type !== 'text') return x;
    const textContent = content as TextContent;

    this.applyStyles(ctx);
    ctx.fillText(textContent.text, x, y);

    const width = ctx.measureText(textContent.text).width;

    // 绘制装饰线
    if (properties.underline || properties.strike) {
      const fontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
      ctx.beginPath();
      ctx.strokeStyle = properties.color || '#000000';
      ctx.lineWidth = 1;
      
      if (properties.underline) {
        ctx.moveTo(x, y + 2);
        ctx.lineTo(x + width, y + 2);
      }
      if (properties.strike) {
        ctx.moveTo(x, y - fontSize / 3);
        ctx.lineTo(x + width, y - fontSize / 3);
      }
      ctx.stroke();
    }

    return x + width;
  }

  /**
   * 应用样式
   */
  public applyStyles(ctx: CanvasRenderingContext2D) {
    const { properties } = this.data;
    const fontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
    const fontFamily = properties.fontFamily || 'Arial';
    const weight = properties.bold ? 'bold' : 'normal';
    const style = properties.italic ? 'italic' : 'normal';

    ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = properties.color || '#000000';
    ctx.textBaseline = 'alphabetic';
  }
}
