import type {
  OperationEnvelope,
  Paragraph,
  Run,
  TextContent,
  ParagraphProperties,
  RunProperties,
  Table,
  TableRow,
  TableCell,
  TableProperties,
  TableRowProperties,
  TableCellProperties,
} from "@eiinu/editor-protocol";

export * from "./renderer.js";
export * from "./model/base.js";
export * from "./model/paragraph.js";
export * from "./model/run.js";
export * from "./model/table.js";
export * from "./fonts/font-manager.js";

export interface EditorCoreBootstrapResult {
  initialized: true;
  acceptedOperationTypes: string[];
}

export const bootstrapEditorCore = (
  _operations: OperationEnvelope[] = [],
): EditorCoreBootstrapResult => {
  // 暂时不处理 operations
  void _operations;
  return {
    initialized: true,
    acceptedOperationTypes: ["insert_text", "delete_range", "set_mark"],
  };
};

import { ParagraphElement } from "./model/paragraph.js";
import { TableElement } from "./model/table.js";

/**
 * 文档模型工厂函数
 */
export const ModelFactory = {
  /**
   * 创建一个新的运行块 (Run)
   */
  createRun(text: string, properties: RunProperties = {}): Run {
    return {
      properties,
      content: {
        type: "text",
        text,
      } as TextContent,
    };
  },

  /**
   * 创建一个空的段落 (Paragraph)
   */
  createParagraph(id: string, properties: ParagraphProperties = {}): Paragraph {
    return {
      id,
      properties,
      children: [],
    };
  },

  /**
   * 创建一个包含初始文本的段落
   */
  createParagraphWithText(
    id: string,
    text: string,
    pPr: ParagraphProperties = {},
    rPr: RunProperties = {},
  ): Paragraph {
    const p = this.createParagraph(id, pPr);
    if (text) {
      p.children.push(this.createRun(text, rPr));
    }
    return p;
  },

  /**
   * 创建一个表格单元格 (TableCell)
   */
  createTableCell(
    children: (Paragraph | Table)[] = [],
    properties: TableCellProperties = {},
  ): TableCell {
    return {
      properties,
      children,
    };
  },

  /**
   * 创建一个表格行 (TableRow)
   */
  createTableRow(cells: TableCell[], properties: TableRowProperties = {}): TableRow {
    return {
      properties,
      cells,
    };
  },

  /**
   * 创建一个表格 (Table)
   */
  createTable(id: string, rows: TableRow[], properties: TableProperties = {}): Table {
    return {
      id,
      properties,
      rows,
    };
  },

  /**
   * 将普通数据转换为元素实例
   */
  createElement(data: Paragraph | Table): ParagraphElement | TableElement {
    if ("rows" in data) {
      return new TableElement(data as Table);
    }
    return new ParagraphElement(data as Paragraph);
  },
};
