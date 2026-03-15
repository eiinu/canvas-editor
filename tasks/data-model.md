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
| **indentation** | `w:ind` | 缩进 (left, right, firstLine, hanging) | ✅ 已实现 |
| **spacing** | `w:spacing` | 间距 (before, after, line, lineRule) | ✅ 已实现 |
| **styleId** | `w:pStyle` | 关联的段落样式 ID | ✅ 已实现 |
| **borders** | `w:pBdr` | 段落边框 | ✅ 已实现 |
| **shading** | `w:shd` | 段落底纹/背景 | ✅ 已实现 |
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
