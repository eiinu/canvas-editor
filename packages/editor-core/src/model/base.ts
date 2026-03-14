/**
 * 渲染上下文接口
 */
export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  dpr: number;
  zoom: number;
  maxWidth: number;
}

/**
 * 所有文档元素的基类
 */
export abstract class DocumentElement<T = any> {
  public id: string;
  protected data: T;

  constructor(id: string, data: T) {
    this.id = id;
    this.data = data;
  }

  /**
   * 布局计算 (预测量、断行等)
   * @param context 渲染上下文
   * @returns 元素占据的逻辑高度
   */
  abstract layout(context: RenderContext): number;

  /**
   * 实际渲染逻辑
   * @param context 渲染上下文
   * @param x 渲染起始逻辑 X
   * @param y 渲染起始逻辑 Y (通常是基线或顶部)
   * @returns 渲染后下一元素的起始逻辑 Y
   */
  abstract render(context: RenderContext, x: number, y: number): number;

  /**
   * 获取底层原始数据
   */
  getData(): T {
    return this.data;
  }
}
