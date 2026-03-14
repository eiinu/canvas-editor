import type { 
  Paragraph, 
  Run, 
  RunProperties, 
  TextContent 
} from '@eiinu/editor-protocol';

/**
 * 简单的 Canvas 渲染器
 * 负责将文档模型转换并在 Canvas 上绘制
 */
export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * 清空画布
   */
  clear(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
  }

  /**
   * 渲染一个段落
   * @param p 段落数据
   * @param x 段落左上角 X
   * @param y 段落基线 Y
   * @param maxWidth 最大绘制宽度，用于处理对齐
   */
  renderParagraph(p: Paragraph, x: number, y: number, maxWidth: number = 800) {
    let currentX = x;
    
    // 1. 预先测量总宽度，以便处理对齐
    let totalWidth = 0;
    const runWidths: number[] = [];
    for (const run of p.children) {
      if (run.content.type === 'text') {
        this.applyRunStyles(run.properties);
        const w = this.ctx.measureText((run.content as TextContent).text).width;
        runWidths.push(w);
        totalWidth += w;
      } else {
        runWidths.push(0);
      }
    }

    // 2. 处理对齐偏移
    let offsetX = 0;
    if (p.properties.alignment === 'center') {
      offsetX = (maxWidth - totalWidth) / 2;
    } else if (p.properties.alignment === 'right') {
      offsetX = maxWidth - totalWidth;
    }

    currentX += offsetX;

    // 3. 实际渲染
    p.children.forEach((run, index) => {
      this.renderRun(run, currentX, y);
      currentX += runWidths[index];
    });
  }

  /**
   * 渲染一个 Run (文本块)
   * 返回渲染后的下一个 X 坐标
   */
  renderRun(run: Run, x: number, y: number): number {
    const { properties, content } = run;

    if (content.type !== 'text') {
      return x;
    }

    const textContent = content as TextContent;
    
    this.applyRunStyles(properties);
    this.ctx.fillText(textContent.text, x, y);

    // 绘制下划线/删除线 (简单模拟)
    if (properties.underline || properties.strike) {
      const metrics = this.ctx.measureText(textContent.text);
      const fontSize = properties.fontSize ? (properties.fontSize / 2) : 12;
      this.ctx.beginPath();
      this.ctx.strokeStyle = properties.color || '#000000';
      this.ctx.lineWidth = 1;
      
      if (properties.underline) {
        this.ctx.moveTo(x, y + 2);
        this.ctx.lineTo(x + metrics.width, y + 2);
      }
      if (properties.strike) {
        this.ctx.moveTo(x, y - fontSize / 3);
        this.ctx.lineTo(x + metrics.width, y - fontSize / 3);
      }
      this.ctx.stroke();
    }

    return x + this.ctx.measureText(textContent.text).width;
  }

  /**
   * 应用运行块样式
   */
  private applyRunStyles(props: RunProperties) {
    const fontSize = props.fontSize ? (props.fontSize / 2) : 12; // OpenXML sz 是半磅
    const fontFamily = props.fontFamily || 'Arial';
    const weight = props.bold ? 'bold' : 'normal';
    const style = props.italic ? 'italic' : 'normal';

    this.ctx.font = `${style} ${weight} ${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = props.color || '#000000';
    this.ctx.textBaseline = 'alphabetic'; // 对齐 OpenXML 习惯
  }
}
