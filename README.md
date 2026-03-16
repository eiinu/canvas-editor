# Canvas Editor

本项目旨在探索并挑战 **Coding Agent** 在处理超大规模、高复杂度工程任务（如：自研 Canvas 富文本编辑器引擎）时的极限能力。

Canvas 富文本编辑器工程化基础仓库（pnpm workspace）。

## Workspace 结构

```text
.
├─ apps/
│  └─ editor-web/           # @eiinu/editor-web
├─ packages/
│  ├─ editor-core/          # @eiinu/editor-core
│  ├─ editor-xml/           # @eiinu/editor-xml (XML 转换器)
│  └─ shared-protocol/      # @eiinu/editor-protocol
├─ services/
│  └─ collab-service/       # @eiinu/editor-collab
├─ configs/
│  └─ tsconfig/             # 统一 TS 配置
└─ docs/
   └─ canvas-richtext-architecture.md
```

## 快速开始

```bash
pnpm install --no-frozen-lockfile --prefer-offline
pnpm dev
```

## 常用命令

```bash
pnpm build       # 全量构建
pnpm typecheck   # 全量类型检查
pnpm lint        # 全量 lint
pnpm test        # 全量测试
pnpm clean       # 清理产物
```

## 当前状态

### 完成度概览

| 模块       | 完成度 | 状态      |
| ---------- | ------ | --------- |
| 数据模型   | 50%    | 🟢 进行中 |
| 渲染引擎   | 65%    | 🟢 进行中 |
| 字体管理   | 100%   | ✅ 已完成 |
| 交互逻辑   | 0%     | ⚪️ 未开始 |
| XML 转换   | 35%    | 🟡 进行中 |
| 协同系统   | 0%     | ⚪️ 未开始 |
| 文档导出   | 0%     | ⚪️ 未开始 |
| 测试计划   | 0%     | ⚪️ 未开始 |
| 性能优化   | 0%     | ⚪️ 未开始 |
| 兼容性测试 | 0%     | ⚪️ 未开始 |

### 已完成的核心功能

- ✅ 建立 Monorepo 工程化基础设施
- ✅ 实现基础的 `Paragraph` 与 `Run` 的 OOP 类继承架构
- ✅ 实现 Canvas 高清渲染逻辑（支持 DPR 与 Zoom）
- ✅ 完成 XML 实时预览 Demo (CodeMirror 集成)
- ✅ 实现跨平台字体映射与回退机制 (FontManager)
- ✅ 实现 OpenXML 标准的段落间距 (`w:spacing`) 读写与渲染
- ✅ 实现 OpenXML 标准的多字体分流渲染 (w:ascii vs w:eastAsia)
- ✅ 实现段落缩进（左缩进、右缩进、首行缩进、悬挂缩进）的测量与渲染
- ✅ 实现段落边框（上、下、左、右）的测量与渲染
- ✅ 实现段落底纹（背景色）的测量与渲染
- ✅ 为 editor-web 添加横向滚动支持，允许查看完整 canvas 内容
- ✅ 实现移动端响应式设计，在移动端隐藏 XML 编辑器，优化渲染体验

## 核心架构原则 (Architecture Principles)

### 总体设计

- **单一事实源 (SSOT)**：所有状态以结构化文档模型为准，而非 DOM。
- **输入与渲染解耦**：输入事件 -> 产生命令 -> 变更模型 -> 触发重排版与 Canvas 渲染。
- **协同优先 (Collab-first)**：所有编辑操作均可序列化为原子 Operation，天然支持 OT/CRDT。
- **高性能 Canvas 渲染**：基于脏矩形 (Dirty Rect) 的增量更新与多层画布管理。

### 数据模型设计

- **类 OpenXML 架构**：数据模型采用类似 Word 的 `Document -> Section -> Paragraph -> Run -> Text` 分层结构，以实现像素级的排版还原度。详见 [data-model-spec.md](docs/data-model-spec.md)。

## 路线图 (Roadmap) / TODO

### 第一阶段：核心功能完善（高优先级）

1. **实现交互逻辑系统**
   - 规划并实现 Canvas 选区（Selection）与光标（Cursor）逻辑
   - 实现隐藏输入框（Hidden Input）拦截 IME 输入法和键盘事件
   - 开发命令调度器，将用户交互映射为 Operation
   - 添加快捷键支持

2. **完善表格渲染**
   - 实现表格单元格合并的完整支持
   - 优化表格布局算法
   - 完善表格样式渲染

3. **增强 XML 转换能力**
   - 实现复杂字段解析（w:fldChar）
   - 支持图片、超链接的解析与序列化
   - 完善样式表解析与序列化

### 第二阶段：功能扩展（中优先级）

4. **实现图片渲染**
   - 图片布局与定位
   - 图片加载和缓存
   - 图片效果（边框、阴影、旋转）

5. **开发协同系统基础架构**
   - 定义 OT 或 CRDT 冲突解决算法
   - 实现简单的房间管理和消息转发
   - 支持多人光标同步

6. **添加超链接支持**
   - 超链接样式和交互
   - 链接点击处理
   - 链接状态管理

### 第三阶段：质量保障与优化（低优先级）

7. **建立测试体系**
   - 编写单元测试
   - 实现端到端测试
   - 建立性能基准测试

8. **实施性能优化**
   - 渲染缓存优化
   - 批量绘制
   - 内存管理
   - 计算优化

9. **进行跨浏览器兼容性测试**
   - 在主流浏览器中测试
   - 解决兼容性问题
   - 优化移动端体验

10. **完善文档导出功能**
    - 实现 PDF 导出
    - 支持图片导出
    - 添加其他格式导出
