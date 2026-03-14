# Canvas Editor

Canvas 富文本编辑器工程化基础仓库（pnpm workspace）。

## Workspace 结构

```text
.
├─ apps/
│  └─ editor-web/           # Web 宿主应用（Vite + React）
├─ packages/
│  ├─ editor-core/          # 编辑器核心引擎（模型/命令/渲染层骨架）
│  └─ shared-protocol/      # 前后端共享协议类型
├─ services/
│  └─ collab-service/       # 协同服务骨架
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

- ✅ 已完成多包模块拆分与依赖关系搭建。
- ✅ 已完成统一 TypeScript / ESLint / Vitest / Prettier 工程配置。
- ✅ 已完成应用与服务脚手架、构建链路和开发命令。

## 路线图 (Roadmap) / TODO

### 阶段一：核心模型与数据结构 (Foundation)
- [ ] **文档模型定义**：在 `editor-core` 中实现 `Document -> Block -> InlineSpan -> TextRun` 数据结构。
- [ ] **不可变状态管理**：实现文档状态的快照机制，支持基于操作 (Operation) 的状态转换。
- [ ] **操作原语 (Operations)**：在 `shared-protocol` 中定义 `insert_text`, `delete_range`, `set_mark` 等原子操作。
- [ ] **撤销/重做系统**：基于 Operation 实现 Undo/Redo 栈管理。

### 阶段二：排版与渲染引擎 (Layout & Rendering)
- [ ] **文本测量模块**：封装 Canvas 文本测量，建立字符/字体宽度缓存池。
- [ ] **排版引擎实现**：实现基础的自动换行 (Word Wrap) 算法，生成排版树 (Layout Tree)。
- [ ] **渲染循环 (Render Loop)**：建立 Canvas 渲染管线，实现基于脏矩形 (Dirty Rect) 的增量更新。
- [ ] **多层画布管理**：拆分文本层、选区层、背景层、光标层以优化性能。

### 阶段三：交互与输入桥接 (Interaction)
- [ ] **隐藏输入框 (Hidden Input)**：实现透明 `textarea` 拦截 IME 输入法和键盘事件。
- [ ] **光标与选区系统**：实现点击定位 (Hit Testing)、拖拽选区、双击选中单词等逻辑。
- [ ] **命令调度器**：将用户交互映射为 Operation 并分发给模型层。
- [ ] **快捷键支持**：注册常用快捷键（如 `Ctrl+B`, `Ctrl+Z`）并绑定到相应命令。

### 阶段四：实时协同与状态同步 (Collaboration)
- [ ] **协同协议完善**：在 `shared-protocol` 中定义 OT (Operational Transformation) 或 CRDT 冲突解决算法。
- [ ] **协同服务接入**：在 `collab-service` 中实现简单的房间管理和消息转发。
- [ ] **多人光标同步**：支持在 Canvas 上实时绘制其他协作者的光标和选区位置。
- [ ] **文档快照同步**：实现初次进入房间时的文档全量加载逻辑。

### 阶段五：L1 级编辑能力增强 (Advanced Features)
- [ ] **复杂样式支持**：实现标题层级、列表、对齐方式、行间距等段落样式。
- [ ] **多媒体嵌入**：支持图片、超链接等非文本块的渲染与交互。
- [ ] **表格组件**：初步实现 Canvas 表格渲染及其基础编辑能力。
