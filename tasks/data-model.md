# 数据模型开发进度 (OpenXML 风格)

本文件用于追踪编辑器核心数据元素及其属性的实现进度。

## 1. 核心容器元素

- [x] **Document** (`w:document`)
  - [x] `sections` 列表
- [x] **Section** (`w:sectPr`)
  - [x] `pageSize` (纸张大小)
  - [x] `margins` (页边距)
- [x] **Paragraph** (`w:p`)
  - [x] `pPr` (段落属性)
  - [x] `children` (Run 列表)
- [x] **Run** (`w:r`)
  - [x] `rPr` (运行块属性)
  - [x] `t` (文本内容)
- [ ] **Table** (`w:tbl`) - *规划中*
- [ ] **Hyperlink** (`w:hyperlink`) - *规划中*

---

## 2. 段落属性 (Paragraph Properties - `pPr`)

| 属性名 | OpenXML 标签 | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **alignment** | `w:jc` | 对齐方式 (left, center, right, justify) | ✅ 已实现 |
| **indentation** | `w:ind` | 缩进 (left, right, firstLine, hanging) | ⏳ 接口已定义 |
| **spacing** | `w:spacing` | 间距 (before, after, line, lineRule) | ✅ 已实现 |
| **styleId** | `w:pStyle` | 关联的段落样式 ID | ✅ 已实现 |
| **borders** | `w:pBdr` | 段落边框 | 📅 待处理 |
| **shading** | `w:shd` | 段落底纹/背景 | 📅 待处理 |
| **keepNext** | `w:keepNext` | 与下段同页 | 📅 待处理 |
| **pageBreakBefore**| `w:pageBreakBefore` | 段前分页 | 📅 待处理 |

---

## 3. 运行块属性 (Run Properties - `rPr`)

| 属性名 | OpenXML 标签 | 描述 | 状态 |
| :--- | :--- | :--- | :--- |
| **fontFamily** | `w:rFonts` | 字体名称 | ✅ 已实现 (支持 w:ascii, w:eastAsia, w:hAnsi, w:cs) |
| **fontSize** | `w:sz` | 字号 (half-points) | ✅ 已实现 |
| **bold** | `w:b` | 加粗 | ✅ 已实现 |
| **italic** | `w:i` | 斜体 | ✅ 已实现 |
| **underline** | `w:u` | 下划线 | ✅ 已实现 (支持 w:color) |
| **strike** | `w:strike` | 删除线 | ✅ 已实现 |
| **doubleStrike** | `w:dstrike` | 双删除线 | ✅ 已实现 |
| **color** | `w:color` | 文本颜色 (Hex) | ✅ 已实现 |
| **highlight** | `w:highlight` | 突出显示颜色 | ✅ 已实现 |
| **vertAlign** | `w:vertAlign` | 垂直对齐 (superscript, subscript) | ✅ 已实现 |
| **caps** | `w:caps` | 全部大写字母 | ✅ 已实现 |
| **smallCaps** | `w:smallCaps` | 小型大写字母 | ✅ 已实现 |
| **letterSpacing** | `w:spacing` | 字符间距 | ✅ 已实现 |
| **vanish** | `w:vanish` | 隐藏文字 | ✅ 已实现 |
| **shading** | `w:shd` | 文字底纹/背景 | ✅ 已实现 |
| **shadow** | `w:shadow` | 文字阴影 | ✅ 已实现 |
| **outline** | `w:outline` | 轮廓/空心 | ✅ 已实现 |
| **emboss** | `w:emboss` | 阳文/浮雕 | ✅ 已实现 |
| **imprint** | `w:imprint` | 阴文/雕刻 | ✅ 已实现 |

---

## 4. 转换器支持 (XML Converter)

- [x] **Namespace 支持** (`xmlns:w=...`)
- [x] **w:val 属性解析**
- [x] **嵌套标签解析** (`w:pPr -> w:jc`)
- [x] **反向序列化** (`Document -> XML`)
- [ ] **复杂字段解析** (`w:fldChar`)
