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
pnpm install
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

- 已完成多包模块拆分与依赖关系搭建。
- 已完成统一 TypeScript / ESLint / Vitest / Prettier 工程配置。
- 已完成应用与服务脚手架、构建链路和开发命令。
- 暂未实现编辑器具体业务功能（按阶段计划后续实现）。
