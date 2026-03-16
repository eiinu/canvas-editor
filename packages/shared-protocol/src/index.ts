export interface OperationEnvelope {
  opId: string;
  docId: string;
  baseRevision: number;
  payload: unknown;
}

export interface PresenceState {
  userId: string;
  color: string;
  cursor: { x: number; y: number };
}

/**
 * OpenXML 风格的编辑器数据模型接口定义
 * 旨在尽可能还原 Microsoft Word (OOXML) 的数据结构与排版能力
 */

/**
 * 文档基础接口 - 所有包含子元素的容器元素的基础接口
 */
export interface DocumentBase {
  /** 子元素列表 - 可以是段落、表格等 */
  children: (Paragraph | Table)[];
}

/**
 * 文档根节点 - 对应 WordprocessingML 的 <w:document>
 */
export interface Document {
  id: string;
  /** 章节列表 - 对应 <w:body> 中的内容，按章节划分布局 */
  sections: Section[];
  /** 全局样式表 - 对应 styles.xml */
  styles?: any;
}

/**
 * 章节 - 包含页面布局定义
 */
export interface Section extends DocumentBase {
  /** 章节属性 - 对应 <w:sectPr> (页面大小、边距等) */
  properties: SectionProperties;
}

/**
 * 章节属性 - 对应 <w:sectPr>
 */
export interface SectionProperties {
  /** 纸张大小 - 对应 <w:pgSz> */
  pageSize?: {
    width: number; // 单位: twips (1/1440 英寸) 或像素，建议内部统一为像素
    height: number;
  };
  /** 页边距 - 对应 <w:pgMar> */
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    header?: number;
    footer?: number;
  };
  /** 栏数 - 对应 <w:cols> */
  columns?: number;
}

/**
 * 段落 - 对应 <w:p>
 * 文档流中的基本排版单位
 */
export interface Paragraph {
  id: string;
  /** 段落属性 - 对应 <w:pPr> */
  properties: ParagraphProperties;
  /** 段落内的运行块 - 对应 <w:r> */
  children: Run[];
}

/**
 * 段落属性 - 对应 <w:pPr>
 */
export interface ParagraphProperties {
  /** 对齐方式 - 对应 <w:jc> */
  alignment?: "left" | "center" | "right" | "both" | "distribute";
  /** 缩进 - 对应 <w:ind> */
  indentation?: {
    left?: number; // 左缩进
    right?: number; // 右缩进
    firstLine?: number; // 首行缩进
    hanging?: number; // 悬挂缩进
  };
  /** 间距 - 对应 <w:spacing> */
  spacing?: {
    before?: number; // 段前距
    after?: number; // 段后距
    line?: number; // 行间距
    lineRule?: "auto" | "exact" | "atLeast"; // 行高规则
  };
  /** 样式引用 - 对应 <w:pStyle> */
  styleId?: string;
  /** 边框 - 对应 <w:pBdr> */
  borders?: any;
  /** 背景填充 - 对应 <w:shd> */
  shading?: any;
}

/**
 * 文本运行块 - 对应 <w:r>
 * 共享相同格式的一组内容
 */
export interface Run {
  /** 运行块属性 - 对应 <w:rPr> (字体、字号、颜色等) */
  properties: RunProperties;
  /** 内容块 - 对应 <w:t>, <w:drawing>, <w:fldChar> 等 */
  content: RunContent;
}

/**
 * 运行块属性 - 对应 <w:rPr>
 */
export interface RunProperties {
  /** 字体名称集合 - 对应 <w:rFonts> */
  fonts?: {
    /** 西文字体 - 对应 <w:ascii> (0-127) */
    ascii?: string;
    /** 东亚字体 - 对应 <w:eastAsia> (CJK) */
    eastAsia?: string;
    /** 高位 ANSI 字体 - 对应 <w:hAnsi> (128-255) */
    hAnsi?: string;
    /** 复杂脚本字体 - 对应 <w:cs> (Arabic, etc.) */
    cs?: string;
    /** Emoji 字体 - 用于显示 emoji 字符 */
    emoji?: string;
    /** 提示字体 - 对应 <w:hint> (eastAsia | default) */
    hint?: "eastAsia" | "default";
  };
  /** 兼容性字段：字体名称 - 对应 <w:rFonts w:val="..."> */
  fontFamily?: string;
  /** 字号 - 对应 <w:sz> (单位: half-points) */
  fontSize?: number;
  /** 加粗 - 对应 <w:b> */
  bold?: boolean;
  /** 斜体 - 对应 <w:i> */
  italic?: boolean;
  /** 下划线 - 对应 <w:u> */
  underline?: string | boolean;
  /** 下划线类型 - 对应 <w:u w:val="..."> */
  underlineType?: string;
  /** 下划线颜色 - 对应 <w:u w:color="..."> */
  underlineColor?: string;
  /** 删除线 - 对应 <w:strike> */
  strike?: boolean;
  /** 双删除线 - 对应 <w:dstrike> */
  doubleStrike?: boolean;
  /** 文本颜色 - 对应 <w:color> */
  color?: string;
  /** 突出显示/高亮 - 对应 <w:highlight> */
  highlight?: string;
  /** 垂直对齐 - 对应 <w:vertAlign> (上标、下标) */
  vertAlign?: "baseline" | "superscript" | "subscript";
  /** 全部大写 - 对应 <w:caps> */
  caps?: boolean;
  /** 小型大写字母 - 对应 <w:smallCaps> */
  smallCaps?: boolean;
  /** 字符间距 - 对应 <w:spacing> */
  letterSpacing?: number;
  /** 隐藏文字 - 对应 <w:vanish> */
  vanish?: boolean;
  /** 文字底纹 - 对应 <w:shd> */
  shading?: string;
  /** 文字阴影 - 对应 <w:shadow> */
  shadow?: boolean;
  /** 轮廓 - 对应 <w:outline> */
  outline?: boolean;
  /** 阳文/浮雕 - 对应 <w:emboss> */
  emboss?: boolean;
  /** 阴文/雕刻 - 对应 <w:imprint> */
  imprint?: boolean;
}

/**
 * 运行块内的内容类型
 */
export type RunContent = TextContent | ImageContent | FieldContent | DrawingContent;

export type ContentType = "text" | "image" | "field" | "drawing";

export interface BaseContent {
  type: ContentType;
}

/** 文本内容 - 对应 <w:t> */
export interface TextContent extends BaseContent {
  type: "text";
  text: string;
  /** 是否保留空白字符 - 对应 xml:space="preserve" */
  preserveSpace?: boolean;
}

/** 图片内容 - 对应 <w:drawing> 中的内联图片 */
export interface ImageContent extends BaseContent {
  type: "image";
  src: string;
  width: number;
  height: number;
}

/** 域/复杂指令 - 对应 <w:fldChar> (如页码、目录) */
export interface FieldContent extends BaseContent {
  type: "field";
  fieldCode: string;
  result?: string;
}

/** 图形/形状 - 对应 <w:drawing> */
export interface DrawingContent extends BaseContent {
  type: "drawing";
  data: any;
}

/**
 * 表格 - 对应 <w:tbl>
 * (预留接口，符合 Word 层级结构)
 */
export interface Table {
  id: string;
  /** 表格属性 - 对应 <w:tblPr> */
  properties: TableProperties;
  /** 表格网格 - 对应 <w:tblGrid> */
  grid?: TableGrid;
  /** 表格行 - 对应 <w:tr> */
  rows: TableRow[];
}

/**
 * 表格属性 - 对应 <w:tblPr>
 */
export interface TableProperties {
  /** 边框 - 对应 <w:tblBorders> */
  borders?: TableBorders;
  /** 底纹 - 对应 <w:shd> */
  shading?: string;
  /** 表格宽度 - 对应 <w:tblW> */
  width?: number;
  /** 表格对齐 - 对应 <w:jc> */
  alignment?: "left" | "center" | "right";
  /** 单元格边距 - 对应 <w:tblCellMar> */
  cellMargin?: TableCellMargin;
  /** 表格布局 - 对应 <w:tblLayout> */
  layout?: "fixed" | "autofit";
  /** 表格样式 - 对应 <w:tblStyle> */
  styleId?: string;
  /** 表格标题 - 对应 <w:tblCaption> */
  caption?: string;
  /** 表格描述 - 对应 <w:tblDescription> */
  description?: string;
  /** 表格样式外观 - 对应 <w:tblLook> */
  look?: string;
  /** 表格缩进 - 对应 <w:tblInd> */
  indent?: number;
  /** 行带大小 - 对应 <w:tblStyleRowBandSize> */
  rowBandSize?: number;
  /** 列带大小 - 对应 <w:tblStyleColBandSize> */
  colBandSize?: number;
}

/**
 * 表格边框 - 对应 <w:tblBorders>
 */
export interface TableBorders {
  top?: Border;
  bottom?: Border;
  left?: Border;
  right?: Border;
  insideH?: Border;
  insideV?: Border;
}

/**
 * 边框 - 对应 <w:top>, <w:bottom>, etc.
 */
export interface Border {
  val: string; // 边框样式: single, double, dotted, etc.
  size: number; // 边框粗细
  space: number; // 边框间距
  color: string; // 边框颜色
}

/**
 * 表格网格 - 对应 <w:tblGrid>
 */
export interface TableGrid {
  /** 网格列 - 对应 <w:gridCol> */
  columns: TableGridColumn[];
}

/**
 * 表格网格列 - 对应 <w:gridCol>
 */
export interface TableGridColumn {
  /** 列宽 - 对应 <w:w> */
  width: number;
}

/**
 * 表格行 - 对应 <w:tr>
 */
export interface TableRow {
  /** 行属性 - 对应 <w:trPr> */
  properties?: TableRowProperties;
  /** 表格单元格 - 对应 <w:tc> */
  cells: TableCell[];
}

/**
 * 表格行属性 - 对应 <w:trPr>
 */
export interface TableRowProperties {
  /** 行高 - 对应 <w:trHeight> */
  height?: number;
  /** 行高规则 - 对应 <w:trHeight w:hRule="..."> */
  heightRule?: "auto" | "exact" | "atLeast";
  /** 边框 - 对应 <w:trBorders> */
  borders?: TableRowBorders;
  /** 禁止行拆分 - 对应 <w:cantSplit> */
  cantSplit?: boolean;
  /** 表头行 - 对应 <w:tblHeader> */
  header?: boolean;
}

/**
 * 表格行边框 - 对应 <w:trBorders>
 */
export interface TableRowBorders {
  top?: Border;
  bottom?: Border;
  left?: Border;
  right?: Border;
  insideH?: Border;
  insideV?: Border;
}

/**
 * 表格单元格 - 对应 <w:tc>
 */
export interface TableCell extends DocumentBase {
  /** 单元格属性 - 对应 <w:tcPr> */
  properties?: TableCellProperties;
}

/**
 * 表格单元格属性 - 对应 <w:tcPr>
 */
export interface TableCellProperties {
  /** 单元格宽度 - 对应 <w:tcW> */
  width?: number;
  /** 单元格宽度类型 - 对应 <w:tcW w:type> */
  widthType?: "dxa" | "pct" | "auto";
  /** 单元格边距 - 对应 <w:tcMar> */
  margin?: TableCellMargin;
  /** 单元格合并 - 对应 <w:gridSpan> */
  gridSpan?: number;
  /** 垂直合并 - 对应 <w:vMerge> */
  vMerge?: "restart" | "continue";
  /** 垂直对齐 - 对应 <w:vAlign> */
  verticalAlignment?: "top" | "center" | "bottom";
  /** 边框 - 对应 <w:tcBorders> */
  borders?: TableCellBorders;
  /** 底纹 - 对应 <w:shd> */
  shading?: string;
  /** 文本自适应单元格 - 对应 <w:tcFitText> */
  fitText?: boolean;
  /** 禁止文本换行 - 对应 <w:noWrap> */
  noWrap?: boolean;
  /** 隐藏标记 - 对应 <w:hideMark> */
  hideMark?: boolean;
}

/**
 * 表格单元格边距 - 对应 <w:tcMar> 或 <w:tblCellMar>
 */
export interface TableCellMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/**
 * 表格单元格边框 - 对应 <w:tcBorders>
 */
export interface TableCellBorders {
  top?: Border;
  bottom?: Border;
  left?: Border;
  right?: Border;
  insideH?: Border;
  insideV?: Border;
}
