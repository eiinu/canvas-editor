import type { Run, TextContent } from '@eiinu/editor-protocol';
import { DocumentElement, RenderContext } from './base.js';
import { FontManager } from '../fonts/font-manager.js';

/**
 * 文本运行块元素
 */
export class RunElement extends DocumentElement<Run> {
  private fontManager: FontManager;

  constructor(data: Run) {
    super(Math.random().toString(36).substring(7), data);
    this.fontManager = FontManager.getInstance();
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
    const text = (this.data.content as TextContent).text;
    this.applyStyles(ctx);
    return this.fontManager.measureText(ctx, text, ctx.font);
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
    
    // 异步检查字体加载 (不阻塞当前渲染，但加载后会触发重绘)
    const rawFontFamily = properties.fontFamily || 'Arial';
    const fontFamily = this.fontManager.getFontFamily(rawFontFamily);
    this.fontManager.ensureFontLoaded(fontFamily);

    // 处理上下标偏移
    let drawY = y;
    const originalFontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
    if (properties.vertAlign === 'superscript') {
      drawY -= originalFontSize * 0.35;
    } else if (properties.vertAlign === 'subscript') {
      drawY += originalFontSize * 0.15;
    }

    ctx.fillText(textContent.text, x, drawY);

    const width = this.fontManager.measureText(ctx, textContent.text, ctx.font);

    // 绘制装饰线
    if (properties.underline || properties.strike || properties.doubleStrike) {
      const fontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
      const decorFontSize = properties.vertAlign !== 'baseline' ? fontSize * 0.65 : fontSize;

      ctx.save(); // 保存当前状态
      ctx.lineWidth = 1;
      
      if (properties.underline) {
        ctx.beginPath();
        const uColor = properties.underlineColor || properties.color || '#000000';
        ctx.strokeStyle = uColor;
        ctx.moveTo(x, drawY + 2);
        ctx.lineTo(x + width, drawY + 2);
        ctx.stroke();
      }
      
      if (properties.strike) {
        ctx.beginPath();
        ctx.strokeStyle = properties.color || '#000000';
        ctx.moveTo(x, drawY - decorFontSize / 3);
        ctx.lineTo(x + width, drawY - decorFontSize / 3);
        ctx.stroke();
      }

      if (properties.doubleStrike) {
        ctx.beginPath();
        ctx.strokeStyle = properties.color || '#000000';
        // 第一条线
        ctx.moveTo(x, drawY - decorFontSize / 3 - 1);
        ctx.lineTo(x + width, drawY - decorFontSize / 3 - 1);
        // 第二条线
        ctx.moveTo(x, drawY - decorFontSize / 3 + 2);
        ctx.lineTo(x + width, drawY - decorFontSize / 3 + 2);
        ctx.stroke();
      }
      ctx.restore(); // 恢复状态
    }

    return x + width;
  }

  /**
   * 应用样式
   */
  public applyStyles(ctx: CanvasRenderingContext2D) {
    const { properties } = this.data;
    const originalFontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
    const vertAlign = properties.vertAlign || 'baseline';
    
    // 上下标缩放
    const fontSize = vertAlign !== 'baseline' ? originalFontSize * 0.65 : originalFontSize;
    
    const rawFontFamily = properties.fontFamily || 'Arial';
    const fontFamily = this.fontManager.getFontFamily(rawFontFamily);
    const weight = properties.bold ? 'bold' : 'normal';
    const style = properties.italic ? 'italic' : 'normal';

    ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = properties.color || '#000000';
    ctx.textBaseline = 'alphabetic';
  }
}
