import { getDevicePixelRatio } from '@eiinu/editor-utils';
import { DocumentElement, RenderContext } from './model/base.js';

/**
 * 简单的 Canvas 渲染器
 * 负责将文档模型转换并在 Canvas 上绘制
 */
export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private dpr: number = 1;
  private zoom: number = 1;

  constructor(ctx: CanvasRenderingContext2D, options: { dpr?: number; zoom?: number } = {}) {
    this.ctx = ctx;
    this.dpr = options.dpr || getDevicePixelRatio();
    this.zoom = options.zoom || 1;
  }

  /**
   * 获取综合缩放比例 (Device DPR * App Zoom)
   */
  get scale(): number {
    return this.dpr * this.zoom;
  }

  /**
   * 更新缩放参数
   */
  updateScale(options: { dpr?: number; zoom?: number }) {
    if (options.dpr !== undefined) this.dpr = options.dpr;
    if (options.zoom !== undefined) this.zoom = options.zoom;
  }

  /**
   * 设置画布物理尺寸与逻辑尺寸
   * @param width 逻辑宽度
   * @param height 逻辑高度
   */
  setDimensions(width: number, height: number) {
    const { canvas } = this.ctx;
    const scale = this.scale;
    
    // 物理像素尺寸
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    // 逻辑像素尺寸 (CSS)
    canvas.style.width = `${width * this.zoom}px`;
    canvas.style.height = `${height * this.zoom}px`;

    // 重置变换矩阵，应用综合缩放
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  /**
   * 清空画布
   */
  clear(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
  }

  /**
   * 渲染文档元素
   */
  renderElement(el: DocumentElement, x: number, y: number, maxWidth: number = 800): number {
    const context: RenderContext = {
      ctx: this.ctx,
      dpr: this.dpr,
      zoom: this.zoom,
      maxWidth
    };

    // 1. 布局
    el.layout(context);
    
    // 2. 渲染
    return el.render(context, x, y);
  }
}
