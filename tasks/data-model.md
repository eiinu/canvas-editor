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
- [x] **Table** (`w:tbl`) - _已实现_
  - [x] `tblPr` (表格属性)
  - [x] `tblGrid` (表格网格)
  - [x] `tr` (表格行)
  - [x] `tc` (表格单元格)
- [ ] **Hyperlink** (`w:hyperlink`) - _规划中_
- [ ] **Picture** (`w:drawing`) - _规划中_
  - [ ] `inline` (内联图片)
  - [ ] `anchor` (锚定图片)
- [ ] **Shape** (`w:drawing`) - _规划中_
  - [ ] `sp` (形状)
  - [ ] `nvSpPr` (形状非视觉属性)
  - [ ] `spPr` (形状属性)
- [ ] **Footnote** (`w:footnote`) - _规划中_
  - [ ] `id` (脚注 ID)
  - [ ] `p` (脚注内容)
- [ ] **Endnote** (`w:endnote`) - _规划中_
  - [ ] `id` (尾注 ID)
  - [ ] `p` (尾注内容)
- [ ] **Header** (`w:hdr`) - _规划中_
  - [ ] `id` (页眉 ID)
  - [ ] `p` (页眉内容)
- [ ] **Footer** (`w:ftr`) - _规划中_
  - [ ] `id` (页脚 ID)
  - [ ] `p` (页脚内容)
- [ ] **TableOfContents** (`w:toc`) - _规划中_
  - [ ] `tocPr` (目录属性)
  - [ ] `p` (目录项)
- [ ] **Field** (`w:fldChar`) - _规划中_
  - [ ] `fldCharType` (字段类型)
  - [ ] `instrText` (字段指令)
  - [ ] `result` (字段结果)
- [ ] **Bookmark** (`w:bookmarkStart`/`w:bookmarkEnd`) - _规划中_
  - [ ] `id` (书签 ID)
  - [ ] `name` (书签名称)
- [ ] **TextBox** (`w:txbxContent`) - _规划中_
  - [ ] `p` (文本框内容)
- [ ] **Comment** (`w:comment`) - _规划中_
  - [ ] `id` (评论 ID)
  - [ ] `author` (作者)
  - [ ] `date` (日期)
  - [ ] `p` (评论内容)

---

## 2. 段落属性 (Paragraph Properties - `pPr`)

| 属性名                  | OpenXML 标签            | 描述                                    | 状态      |
| :---------------------- | :---------------------- | :-------------------------------------- | :-------- |
| **alignment**           | `w:jc`                  | 对齐方式 (left, center, right, justify) | ✅ 已实现 |
| **indentation**         | `w:ind`                 | 缩进 (left, right, firstLine, hanging)  | ✅ 已实现 |
| **spacing**             | `w:spacing`             | 间距 (before, after, line, lineRule)    | ✅ 已实现 |
| **styleId**             | `w:pStyle`              | 关联的段落样式 ID                       | ✅ 已实现 |
| **borders**             | `w:pBdr`                | 段落边框                                | ✅ 已实现 |
| **shading**             | `w:shd`                 | 段落底纹/背景                           | ✅ 已实现 |
| **keepNext**            | `w:keepNext`            | 与下段同页                              | 📅 待处理 |
| **keepLines**           | `w:keepLines`           | 段落内文字保持在同一页                  | 📅 待处理 |
| **pageBreakBefore**     | `w:pageBreakBefore`     | 段前分页                                | 📅 待处理 |
| **widowControl**        | `w:widowControl`        | 孤行控制                                | 📅 待处理 |
| **contextualSpacing**   | `w:contextualSpacing`   | 上下文间距                              | 📅 待处理 |
| **textDirection**       | `w:textDirection`       | 文本方向                                | 📅 待处理 |
| **bidi**                | `w:bidi`                | 双向文本                                | 📅 待处理 |
| **numPr**               | `w:numPr`               | 编号属性                                | 📅 待处理 |
| **tabs**                | `w:tabs`                | 制表符设置                              | 📅 待处理 |
| **suppressLineNumbers** | `w:suppressLineNumbers` | 禁止行号                                | 📅 待处理 |
| **autoSpaceDE**         | `w:autoSpaceDE`         | 自动调整德语间距                        | 📅 待处理 |
| **autoSpaceDN**         | `w:autoSpaceDN`         | 自动调整日语间距                        | 📅 待处理 |
| **adjustRightInd**      | `w:adjustRightInd`      | 调整右缩进                              | 📅 待处理 |
| **snapToGrid**          | `w:snapToGrid`          | 对齐到网格                              | 📅 待处理 |
| **noHyphenation**       | `w:noHyphenation`       | 禁止断字                                | 📅 待处理 |
| **kinsoku**             | `w:kinsoku`             | 日文换行规则                            | 📅 待处理 |
| **wordWrap**            | `w:wordWrap`            | 单词换行                                | 📅 待处理 |
| **overflowPunct**       | `w:overflowPunct`       | 标点溢出                                | 📅 待处理 |
| **topLinePunct**        | `w:topLinePunct`        | 行首标点                                | 📅 待处理 |
| **autoHyphenation**     | `w:autoHyphenation`     | 自动断字                                | 📅 待处理 |
| **hyphenationZone**     | `w:hyphenationZone`     | 断字区域                                | 📅 待处理 |
| **suppressAutoHyphens** | `w:suppressAutoHyphens` | 禁止自动断字                            | 📅 待处理 |
| **outlineLvl**          | `w:outlineLvl`          | 大纲级别                                | 📅 待处理 |
| **divId**               | `w:divId`               | 分区 ID                                 | 📅 待处理 |
| **cnfStyle**            | `w:cnfStyle`            | 条件样式                                | 📅 待处理 |
| **rPr**                 | `w:rPr`                 | 段落级文本属性                          | 📅 待处理 |

---

## 3. 运行块属性 (Run Properties - `rPr`)

| 属性名            | OpenXML 标签   | 描述                              | 状态                                                |
| :---------------- | :------------- | :-------------------------------- | :-------------------------------------------------- |
| **fontFamily**    | `w:rFonts`     | 字体名称                          | ✅ 已实现 (支持 w:ascii, w:eastAsia, w:hAnsi, w:cs) |
| **fontSize**      | `w:sz`         | 字号 (half-points)                | ✅ 已实现                                           |
| **bold**          | `w:b`          | 加粗                              | ✅ 已实现                                           |
| **italic**        | `w:i`          | 斜体                              | ✅ 已实现                                           |
| **underline**     | `w:u`          | 下划线                            | ✅ 已实现 (支持 w:color)                            |
| **strike**        | `w:strike`     | 删除线                            | ✅ 已实现                                           |
| **doubleStrike**  | `w:dstrike`    | 双删除线                          | ✅ 已实现                                           |
| **color**         | `w:color`      | 文本颜色 (Hex)                    | ✅ 已实现                                           |
| **highlight**     | `w:highlight`  | 突出显示颜色                      | ✅ 已实现                                           |
| **vertAlign**     | `w:vertAlign`  | 垂直对齐 (superscript, subscript) | ✅ 已实现                                           |
| **caps**          | `w:caps`       | 全部大写字母                      | ✅ 已实现                                           |
| **smallCaps**     | `w:smallCaps`  | 小型大写字母                      | ✅ 已实现                                           |
| **letterSpacing** | `w:spacing`    | 字符间距                          | ✅ 已实现                                           |
| **vanish**        | `w:vanish`     | 隐藏文字                          | ✅ 已实现                                           |
| **shading**       | `w:shd`        | 文字底纹/背景                     | ✅ 已实现                                           |
| **shadow**        | `w:shadow`     | 文字阴影                          | ✅ 已实现                                           |
| **outline**       | `w:outline`    | 轮廓/空心                         | ✅ 已实现                                           |
| **emboss**        | `w:emboss`     | 阳文/浮雕                         | ✅ 已实现                                           |
| **imprint**       | `w:imprint`    | 阴文/雕刻                         | ✅ 已实现                                           |
| **rtl**           | `w:rtl`        | 从右到左文本                      | 📅 待处理                                           |
| **cs**            | `w:cs`         | 复杂脚本                          | 📅 待处理                                           |
| **em**            | `w:em`         | 强调标记                          | 📅 待处理                                           |
| **lang**          | `w:lang`       | 语言设置                          | 📅 待处理                                           |
| **noProof**       | `w:noProof`    | 不拼写检查                        | 📅 待处理                                           |
| **webHidden**     | `w:webHidden`  | Web 隐藏                          | 📅 待处理                                           |
| **specVanish**    | `w:specVanish` | 特殊隐藏                          | 📅 待处理                                           |
| **oMath**         | `w:oMath`      | 数学公式                          | 📅 待处理                                           |
| **szCs**          | `w:szCs`       | 复杂脚本字号                      | 📅 待处理                                           |
| **rtlGlyph**      | `w:rtlGlyph`   | 从右到左字形                      | 📅 待处理                                           |
| **kerning**       | `w:kern`       | 字间距调整                        | 📅 待处理                                           |
| **position**      | `w:position`   | 文本垂直位置调整                  | 📅 待处理                                           |
| **fonts**         | `w:rFonts`     | 字体设置                          | 📅 待处理                                           |
| **effect**        | `w:effect`     | 文本效果                          | 📅 待处理                                           |
| **bdr**           | `w:bdr`        | 文本边框                          | 📅 待处理                                           |
| **noProof**       | `w:noProof`    | 不进行拼写检查                    | 📅 待处理                                           |
| **webHidden**     | `w:webHidden`  | 在 Web 中隐藏                     | 📅 待处理                                           |

---

## 4. 转换器支持 (XML Converter)

- [x] **Namespace 支持** (`xmlns:w=...`)
- [x] **w:val 属性解析**
- [x] **嵌套标签解析** (`w:pPr -> w:jc`)
- [x] **反向序列化** (`Document -> XML`)
- [ ] **复杂字段解析** (`w:fldChar`)
- [x] **表格解析与序列化** (`w:tbl`)
- [ ] **图片解析与序列化** (`w:drawing`)
- [ ] **超链接解析与序列化** (`w:hyperlink`)
- [ ] **脚注和尾注解析与序列化** (`w:footnote`, `w:endnote`)
- [ ] **页眉和页脚解析与序列化** (`w:hdr`, `w:ftr`)
- [ ] **目录解析与序列化** (`w:toc`)
- [ ] **书签解析与序列化** (`w:bookmarkStart`, `w:bookmarkEnd`)
- [ ] **文本框解析与序列化** (`w:txbxContent`)
- [ ] **评论解析与序列化** (`w:comment`)
- [ ] **样式表解析与序列化** (`w:styles`)
- [ ] **编号列表解析与序列化** (`w:numPr`)
- [ ] **制表符解析与序列化** (`w:tabs`)
- [ ] **双向文本解析与序列化** (`w:bidi`, `w:rtl`)
- [ ] **数学公式解析与序列化** (`w:oMath`)

---

## 4. 表格属性 (Table Properties)

### 4.1 表格属性 (`w:tblPr`)

| 属性名                  | OpenXML 标签            | 描述                               | 状态      |
| :---------------------- | :---------------------- | :--------------------------------- | :-------- |
| **width**               | `w:tblW`                | 表格宽度                           | ✅ 已实现 |
| **alignment**           | `w:jc`                  | 表格对齐方式 (left, center, right) | ✅ 已实现 |
| **borders**             | `w:tblBorders`          | 表格边框                           | ✅ 已实现 |
| **shading**             | `w:shd`                 | 表格底纹/背景                      | ✅ 已实现 |
| **cellMargin**          | `w:tblCellMar`          | 单元格边距                         | ✅ 已实现 |
| **layout**              | `w:tblLayout`           | 表格布局 (fixed, autofit)          | ✅ 已实现 |
| **styleId**             | `w:tblStyle`            | 关联的表格样式 ID                  | ✅ 已实现 |
| **tblCaption**          | `w:tblCaption`          | 表格标题                           | 📅 待处理 |
| **tblDescription**      | `w:tblDescription`      | 表格描述                           | 📅 待处理 |
| **tblLook**             | `w:tblLook`             | 表格样式外观                       | 📅 待处理 |
| **tblInd**              | `w:tblInd`              | 表格缩进                           | 📅 待处理 |
| **tblStyleRowBandSize** | `w:tblStyleRowBandSize` | 行带大小                           | 📅 待处理 |
| **tblStyleColBandSize** | `w:tblStyleColBandSize` | 列带大小                           | 📅 待处理 |
| **tblW**                | `w:tblW`                | 表格宽度设置                       | 📅 待处理 |
| **jc**                  | `w:jc`                  | 表格对齐                           | 📅 待处理 |

### 4.2 表格行属性 (`w:trPr`)

| 属性名         | OpenXML 标签                 | 描述                            | 状态      |
| :------------- | :--------------------------- | :------------------------------ | :-------- |
| **height**     | `w:trHeight`                 | 行高                            | ✅ 已实现 |
| **heightRule** | `w:trHeight w:hRule`         | 行高规则 (auto, exact, atLeast) | ✅ 已实现 |
| **borders**    | `w:trBorders`                | 行边框                          | ✅ 已实现 |
| **cantSplit**  | `w:cantSplit`                | 禁止行拆分                      | 📅 待处理 |
| **tblHeader**  | `w:tblHeader`                | 表头行                          | 📅 待处理 |
| **trHeight**   | `w:trHeight w:hRule="exact"` | 精确行高                        | 📅 待处理 |

### 4.3 表格单元格属性 (`w:tcPr`)

| 属性名                | OpenXML 标签         | 描述                           | 状态      |
| :-------------------- | :------------------- | :----------------------------- | :-------- |
| **width**             | `w:tcW`              | 单元格宽度                     | ✅ 已实现 |
| **margin**            | `w:tcMar`            | 单元格边距                     | ✅ 已实现 |
| **gridSpan**          | `w:gridSpan`         | 单元格合并 (列跨度)            | ✅ 已实现 |
| **vMerge**            | `w:vMerge`           | 垂直合并 (行跨度)              | ✅ 已实现 |
| **verticalAlignment** | `w:vAlign`           | 垂直对齐 (top, center, bottom) | ✅ 已实现 |
| **borders**           | `w:tcBorders`        | 单元格边框                     | ✅ 已实现 |
| **shading**           | `w:shd`              | 单元格底纹/背景                | ✅ 已实现 |
| **tcFitText**         | `w:tcFitText`        | 文本自适应单元格               | 📅 待处理 |
| **noWrap**            | `w:noWrap`           | 禁止文本换行                   | 📅 待处理 |
| **hideMark**          | `w:hideMark`         | 隐藏标记                       | 📅 待处理 |
| **tcW**               | `w:tcW w:type="pct"` | 百分比宽度                     | 📅 待处理 |

---

## 5. 段落样式实现详情

### 5.1 缩进 (Indentation)

实现 OpenXML 标准的段落缩进属性 (`w:ind`)：

- `w:left` - 左缩进（单位：磅或半点）
- `w:right` - 右缩进
- `w:firstLine` - 首行缩进（正值表示缩进，负值表示悬挂缩进）
- `w:hanging` - 悬挂缩进（单位：磅或半点）

**实现要点**：

- 支持单位转换（twips → pixels）
- 自动计算文本区域的实际宽度
- 正确处理首行缩进与悬挂缩进的相互影响
- 缩进值参与段落总高度和宽度的计算

### 5.2 边框 (Borders)

实现 OpenXML 标准的段落边框属性 (`w:pBdr`)：

支持的边框位置：

- `w:top` - 上边框
- `w:bottom` - 下边框
- `w:left` - 左边框
- `w:right` - 右边框

每个边框支持的属性：

- `w:val` - 边框样式（single、double、dotted 等）
- `w:sz` - 边框粗细（单位：eighth-points）
- `w:color` - 边框颜色（Hex）

**实现要点**：

- 边框宽度参与段落高度计算
- 边框与文本之间保留适当的间距
- 支持不同边框的独立样式设置
- 正确处理边框与缩进的相互影响

### 5.3 底纹 (Shading)

实现 OpenXML 标准的段落底纹属性 (`w:shd`)：

支持的属性：

- `w:fill` - 背景填充色（Hex）
- `w:color` - 前景色（用于图案模式）
- `w:val` - 底纹模式（clear、solid 等）

**实现要点**：

- 背景色应用于整个段落区域
- 底纹与边框配合使用时的层次处理
- 文本可读性优化（根据背景色自动调整文本颜色）
- 底纹与其他段落属性的协同渲染

---

## 6. 编辑器用户体验优化

### 6.1 横向滚动支持

- Canvas 预览区域支持横向滚动
- 当 canvas 宽度超过容器宽度时自动显示滚动条
- 支持缩放比例动态调整
- 自定义滚动条样式优化

### 6.2 移动端响应式设计

- 自动检测移动端设备（屏幕宽度 < 768px）
- 移动端隐藏 XML 编辑器面板
- 将 demo 切换按钮移到右侧面板头部
- 优化移动端布局和间距
- Canvas 预览在移动端占据全屏宽度
- 保持缩放和刷新功能的可用性
