# Canvas Editor

Canvas 富文本编辑器工程化基础仓库（pnpm workspace）。

## Workspace 结构

```text
.
├─ apps/
│  └─ editor-web/           # Web 宿主应用（Vite v8 + React）
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
pnpm build       # 全 workspace 构建
pnpm typecheck   # 全 workspace 类型检查
pnpm lint        # 全 workspace lint
pnpm test        # 全 workspace 测试
pnpm clean       # 清理产物
```

## 当前状态

- 已完成多包模块拆分与依赖关系搭建。
- 已升级为纯 pnpm workspace 工作流（无 Turborepo/Turbopack）。
- 子包（packages/services）优先使用 tsdown 进行打包。
- 暂未实现编辑器具体业务功能（按阶段计划后续实现）。
