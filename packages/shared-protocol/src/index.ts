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
export interface Section {
  /** 章节属性 - 对应 <w:sectPr> (页面大小、边距等) */
  properties: SectionProperties;
  /** 章节内的段落或表格 - 对应 <w:p> 或 <w:tbl> */
  children: (Paragraph | Table)[];
}

/**
 * 章节属性 - 对应 <w:sectPr>
 */
export interface SectionProperties {
  /** 纸张大小 - 对应 <w:pgSz> */
  pageSize?: {
    width: number;  // 单位: twips (1/1440 英寸) 或像素，建议内部统一为像素
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
  alignment?: 'left' | 'center' | 'right' | 'both' | 'distribute';
  /** 缩进 - 对应 <w:ind> */
  indentation?: {
    left?: number;      // 左缩进
    right?: number;     // 右缩进
    firstLine?: number; // 首行缩进
    hanging?: number;   // 悬挂缩进
  };
  /** 间距 - 对应 <w:spacing> */
  spacing?: {
    before?: number;    // 段前距
    after?: number;     // 段后距
    line?: number;      // 行间距
    lineRule?: 'auto' | 'exact' | 'atLeast'; // 行高规则
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
    /** 提示字体 - 对应 <w:hint> (eastAsia | default) */
    hint?: 'eastAsia' | 'default';
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
  /** 下划线颜色 - 对应 <w:u w:color="..."> */
  underlineColor?: string;
  /** 删除线 - 对应 <w:strike> */
  strike?: boolean;
  /** 文本颜色 - 对应 <w:color> */
  color?: string;
  /** 突出显示/高亮 - 对应 <w:highlight> */
  highlight?: string;
  /** 垂直对齐 - 对应 <w:vertAlign> (上标、下标) */
  vertAlign?: 'baseline' | 'superscript' | 'subscript';
  /** 字符间距 - 对应 <w:spacing> */
  letterSpacing?: number;
}

/**
 * 运行块内的内容类型
 */
export type RunContent = TextContent | ImageContent | FieldContent | DrawingContent;

export type ContentType = 'text' | 'image' | 'field' | 'drawing';

export interface BaseContent {
  type: ContentType;
}

/** 文本内容 - 对应 <w:t> */
export interface TextContent extends BaseContent {
  type: 'text';
  text: string;
  /** 是否保留空白字符 - 对应 xml:space="preserve" */
  preserveSpace?: boolean;
}

/** 图片内容 - 对应 <w:drawing> 中的内联图片 */
export interface ImageContent extends BaseContent {
  type: 'image';
  src: string;
  width: number;
  height: number;
}

/** 域/复杂指令 - 对应 <w:fldChar> (如页码、目录) */
export interface FieldContent extends BaseContent {
  type: 'field';
  fieldCode: string;
  result?: string;
}

/** 图形/形状 - 对应 <w:drawing> */
export interface DrawingContent extends BaseContent {
  type: 'drawing';
  data: any;
}

/**
 * 表格 - 对应 <w:tbl>
 * (预留接口，符合 Word 层级结构)
 */
export interface Table {
  id: string;
  properties: any; // <w:tblPr>
  rows: TableRow[];
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableCell {
  children: (Paragraph | Table)[];
}
