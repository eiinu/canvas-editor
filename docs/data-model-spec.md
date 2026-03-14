# Canvas Editor 数据模型规范 (OpenXML 风格)

## 1. 设计目标

为了在网页 Canvas 中实现高度还原 Microsoft Word 的排版效果，本项目采用类 **OpenXML (Office Open XML)** 的树形结构作为核心数据模型。

### 核心原则：
- **语义化分层**：严格区分段落属性 (Paragraph Properties) 与行内属性 (Run Properties)。
- **样式继承**：支持基于样式的属性继承模型。
- **可序列化**：模型必须能够无损地转换为 JSON，并支持 OT/CRDT 协作原语。
- **高性能排版**：数据结构应便于进行快速的增量排版计算。

---

## 2. 模型层级结构

模型遵循 `Document -> Section -> Paragraph -> Run -> Text` 的经典层级：

### 2.1 Document (文档根节点)
文档的顶级容器，包含元数据和章节列表。
```typescript
interface Document {
  id: string;
  sections: Section[];
  styles: StyleDefinitions; // 全局样式表
}
```

### 2.2 Section (章节)
定义页面布局属性（页边距、纸张大小、分栏等）。
```typescript
interface Section {
  properties: SectionProperties;
  children: Paragraph[]; // 章节由多个段落组成
}
```

### 2.3 Paragraph (段落 - `<w:p>`)
排版的基本单位，包含段落级别的样式（对齐、缩进、行间距）。
```typescript
interface Paragraph {
  id: string;
  properties: ParagraphProperties; // pPr
  children: Run[]; // 段落由多个 Run 组成
}
```

### 2.4 Run (文本运行块 - `<w:r>`)
具有相同样式的连续文本块。它是样式应用的基础粒度。
```typescript
interface Run {
  properties: RunProperties; // rPr (粗体、斜体、字号、颜色等)
  content: TextContent | ImageContent | FieldContent;
}
```

### 2.5 Text (文本 - `<w:t>`)
最底层的纯文本字符串。

---

## 3. 属性定义 (Properties)

### 3.1 段落属性 (ParagraphProperties)
对应 Word 中的段落设置：
- `alignment`: 左/中/右/两端对齐。
- `indentation`: 首行缩进、左/右缩进。
- `spacing`: 段前距、段后距、行间距 (Single, 1.5, Double, Fixed)。
- `styleId`: 引用的段落样式 ID。

### 3.2 行内属性 (RunProperties)
对应 Word 中的字体设置：
- `fontFamily`: 字体名称。
- `fontSize`: 字号（以半磅为单位，对齐 OpenXML）。
- `bold / italic / underline / strike`: 基础样式。
- `color / highlight`: 文字颜色与高亮。
- `vertAlign`: 上标/下标。

---

## 4. 协作与原子操作 (Operations)

为了支持高性能实时协同，所有对模型的修改必须拆解为原子操作：

1. **InsertText**: 在指定的 Paragraph -> Run 中插入字符。
2. **SplitParagraph**: 在指定位置拆分段落（处理 Enter 键）。
3. **MergeParagraph**: 合并两个相邻段落（处理 Backspace 键）。
4. **UpdateProperties**: 修改 pPr 或 rPr。
5. **MoveRun**: 移动或拆分 Run。

---

## 5. 与排版引擎的关联

排版引擎 (Layout Engine) 将输入该数据模型，并输出 **Layout Tree**：
- **Line Box**: 每一行在 Canvas 上的物理坐标。
- **Glyph Box**: 每个字符的物理宽度与位置。
- **Fragment**: 一个 Run 跨行时产生的物理片段。

---

## 6. 后续演进

- **Table 支持**: 引入 `Table -> Row -> Cell` 结构，兼容 OpenXML 的表格模型。
- **Field 支持**: 实现页码、总页数、日期等动态字段。
- **Comment/Track Changes**: 引入修订模型。
