# 任务进度概览 (Task Overview)

本目录用于详细追踪各模块的开发状态。

## 核心任务清单

| 任务模块 | 描述 | 状态文件 | 进度 |
| :--- | :--- | :--- | :--- |
| **数据模型** | OpenXML 风格的元素与属性定义 | [data-model.md](./data-model.md) | 🟢 35% |
| **渲染引擎** | Canvas 布局、测量、换行与高清绘制 | - | 🟢 50% |
| **字体管理** | 跨平台字体映射与回退逻辑处理 | [font-management.md](./font-management.md) | 🟢 100% |
| **交互逻辑** | 选区、光标、输入拦截、快捷键 | - | ⚪️ 0% |
| **XML 转换** | OOXML 与内部模型的高效转换 | - | 🟡 30% |
| **协同系统** | OT/CRDT 与服务端同步 | - | ⚪️ 0% |

## 最近完成 (Milestones)

- [x] 建立 Monorepo 工程化基础设施。
- [x] 实现基础的 `Paragraph` 与 `Run` 的 OOP 类继承架构。
- [x] 实现 Canvas 高清渲染逻辑（支持 DPR 与 Zoom）。
- [x] 完成 XML 实时预览 Demo (CodeMirror 集成)。
- [x] 修复库导出类型定义文件问题。
- [x] 创建项目级规则文件 `.cursorrules`。
- [x] 实现跨平台字体映射与回退机制 (FontManager)。
- [x] 实现 OpenXML 标准的段落间距 (`w:spacing`) 读写与渲染。
- [x] 重构 Demo 结构，采用模块化的“标题 + 内容”布局。

## 下一步计划

1. 完善 `tasks` 目录下的其他任务明细。
2. 在 `data-model.md` 中增加更多常用属性的支持。
3. 开始规划 Canvas 选区（Selection）与光标（Cursor）逻辑。
