import type { Table, TableRow, TableCell, Paragraph, DocumentBase } from '@eiinu/editor-protocol';
import { DocumentElement, RenderContext } from './base.js';
import { ParagraphElement } from './paragraph.js';

/**
 * 表格元素
 */
export class TableElement extends DocumentElement<Table> {
  private rows: TableRowElement[];

  constructor(data: Table) {
    super(data.id, data);
    this.rows = data.rows.map((row, index) => {
      return new TableRowElement(row, index);
    });
  }

  /**
   * 布局计算
   */
  layout(context: RenderContext): number {
    const { maxWidth } = context;
    let totalHeight = 0;

    // 计算表格宽度
    const tableWidth = this.data.properties.width || maxWidth;

    // 计算列宽
    const columnWidths = this.calculateColumnWidths(tableWidth);

    // 布局每一行
    for (const row of this.rows) {
      const rowHeight = row.layout(context, columnWidths);
      totalHeight += rowHeight;
    }

    return totalHeight;
  }

  /**
   * 渲染表格
   */
  render(context: RenderContext, x: number, y: number): number {
    const { ctx, maxWidth } = context;

    // 计算表格宽度和位置，确保不超过最大宽度
    const tableWidth = Math.min(this.data.properties.width || maxWidth, maxWidth);
    let tableX = x;

    // 应用表格缩进
    if (this.data.properties.indent) {
      tableX += this.data.properties.indent;
    }

    // 表格对齐
    if (this.data.properties.alignment === 'center') {
      tableX = x + (maxWidth - tableWidth) / 2;
      // 对齐后再应用缩进
      if (this.data.properties.indent) {
        tableX += this.data.properties.indent;
      }
    } else if (this.data.properties.alignment === 'right') {
      tableX = x + maxWidth - tableWidth;
      // 对齐后再应用缩进
      if (this.data.properties.indent) {
        tableX += this.data.properties.indent;
      }
    }

    // 计算列宽
    const columnWidths = this.calculateColumnWidths(tableWidth);

    // 确保列宽不为 0
    const validColumnWidths = columnWidths.map(width => Math.max(width, 10));

    // 绘制表格边框
    const totalHeight = this.calculateTotalHeight();
    const validTotalHeight = Math.max(totalHeight, 50);
    this.drawTableBorders(ctx, tableX, y, tableWidth, validTotalHeight);

    // 渲染所有行
    let currentY = y;
    for (const row of this.rows) {
      currentY = row.render(context, tableX, currentY, validColumnWidths);
    }

    // 返回渲染后下一元素的起始 Y 坐标
    return y + validTotalHeight;
  }

  /**
   * 计算列宽
   */
  private calculateColumnWidths(tableWidth: number): number[] {
    const { grid } = this.data;
    if (grid && grid.columns.length > 0) {
      // 使用表格网格定义的列宽
      const totalGridWidth = grid.columns.reduce((sum, col) => sum + col.width, 0);
      if (totalGridWidth > 0) {
        return grid.columns.map(col => (col.width / totalGridWidth) * tableWidth);
      }
    }

    // 自动计算列宽
    if (this.rows.length > 0) {
      const firstRow = this.rows[0];
      const columnCount = firstRow.getCellCount();
      const columnWidth = tableWidth / columnCount;
      return Array(columnCount).fill(columnWidth);
    }

    return [tableWidth];
  }

  /**
   * 计算表格总高度
   */
  private calculateTotalHeight(): number {
    let totalHeight = 0;
    for (const row of this.rows) {
      totalHeight += row.getHeight();
    }
    return totalHeight;
  }

  /**
   * 绘制表格边框
   */
  private drawTableBorders(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const { borders } = this.data.properties;
    if (!borders) return;

    ctx.save();

    // 绘制外边框
    if (borders.top) {
      this.drawBorder(ctx, x, y, width, 0, borders.top);
    }
    if (borders.bottom) {
      this.drawBorder(ctx, x, y + height, width, 0, borders.bottom);
    }
    if (borders.left) {
      this.drawBorder(ctx, x, y, 0, height, borders.left);
    }
    if (borders.right) {
      this.drawBorder(ctx, x + width, y, 0, height, borders.right);
    }

    ctx.restore();
  }

  /**
   * 绘制边框
   */
  private drawBorder(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, border: any) {
    ctx.strokeStyle = border.color || '#000000';
    ctx.lineWidth = border.size || 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
}

/**
 * 表格行元素
 */
class TableRowElement {
  private data: TableRow;
  private index: number;
  private cells: TableCellElement[];
  private height: number = 0;

  constructor(data: TableRow, index: number) {
    this.data = data;
    this.index = index;
    this.cells = data.cells.map((cell, cellIndex) => new TableCellElement(cell, cellIndex));
  }

  /**
   * 布局计算
   */
  layout(context: RenderContext, columnWidths: number[]): number {
    let maxCellHeight = 0;

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      const cellWidth = columnWidths[i] || 0;
      const cellHeight = cell.layout(context, cellWidth);
      maxCellHeight = Math.max(maxCellHeight, cellHeight);
    }

    // 应用行高设置
    const rowHeight = this.data.properties?.height || maxCellHeight;
    this.height = rowHeight;
    return rowHeight;
  }

  /**
   * 渲染行
   */
  render(context: RenderContext, x: number, y: number, columnWidths: number[]): number {
    let currentX = x;

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      const cellWidth = columnWidths[i] || 0;
      cell.render(context, currentX, y, cellWidth, this.height);
      currentX += cellWidth;
    }

    return y + this.height;
  }

  /**
   * 获取单元格数量
   */
  getCellCount(): number {
    return this.cells.length;
  }

  /**
   * 获取行高
   */
  getHeight(): number {
    return this.height;
  }
}

/**
 * 表格单元格元素
 */
class TableCellElement {
  private data: TableCell;
  private index: number;
  private child: DocumentElement | null;
  private height: number = 0;

  constructor(data: TableCell, index: number) {
    this.data = data;
    this.index = index;
    // 只取第一个子元素
    const firstChild = data.children[0];
    if (firstChild) {
      if ('rows' in firstChild) {
        // 处理表格类型的子元素
        this.child = new TableElement(firstChild as Table);
      } else if ('properties' in firstChild) {
        // 处理段落类型的子元素
        this.child = new ParagraphElement(firstChild as Paragraph);
      } else {
        this.child = null;
      }
    } else {
      this.child = null;
    }
  }

  /**
   * 布局计算
   */
  layout(context: RenderContext, width: number): number {
    let totalHeight = 0;

    // 应用单元格边距
    const margin = this.data.properties?.margin || {};
    const contentWidth = width - (margin.left || 0) - (margin.right || 0);

    // 布局子元素
    if (this.child) {
      const childHeight = this.child.layout({ ...context, maxWidth: contentWidth });
      totalHeight = childHeight;
    }

    this.height = totalHeight;
    return totalHeight;
  }

  /**
   * 渲染单元格
   */
  render(context: RenderContext, x: number, y: number, width: number, height: number) {
    const { ctx } = context;

    // 应用单元格边距
    const margin = this.data.properties?.margin || {};
    const contentX = x + (margin.left || 0);
    const contentY = y + (margin.top || 0);
    const contentWidth = width - (margin.left || 0) - (margin.right || 0);

    // 绘制单元格背景
    if (this.data.properties?.shading) {
      ctx.save();
      ctx.fillStyle = this.data.properties.shading;
      ctx.fillRect(x, y, width, height);
      ctx.restore();
    }

    // 绘制单元格边框
    this.drawCellBorders(ctx, x, y, width, height);

    // 渲染子元素
    if (this.child) {
      // 应用单元格文本属性
      const cellContext = {
        ...context,
        maxWidth: contentWidth,
        // 添加单元格特定的渲染选项
        cellOptions: {
          noWrap: this.data.properties?.noWrap,
          fitText: this.data.properties?.fitText
        }
      };
      this.child.render(cellContext, contentX, contentY);
    }
  }

  /**
   * 绘制单元格边框
   */
  private drawCellBorders(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const { borders } = this.data.properties || {};
    if (!borders) return;

    ctx.save();

    // 绘制单元格边框
    if (borders.top) {
      this.drawBorder(ctx, x, y, width, 0, borders.top);
    }
    if (borders.bottom) {
      this.drawBorder(ctx, x, y + height, width, 0, borders.bottom);
    }
    if (borders.left) {
      this.drawBorder(ctx, x, y, 0, height, borders.left);
    }
    if (borders.right) {
      this.drawBorder(ctx, x + width, y, 0, height, borders.right);
    }

    ctx.restore();
  }

  /**
   * 绘制边框
   */
  private drawBorder(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, border: any) {
    ctx.strokeStyle = border.color || '#000000';
    ctx.lineWidth = border.size || 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();
  }
}