# Canvas 富文本编辑器架构设计文档（V1）

## 1. 文档目标与范围

本文档用于指导从零到一构建一个基于 Canvas 的在线富文本编辑器，目标能力对齐 Google Docs、OnlyOffice、金山文档一类产品的核心体验：

- 高性能文档编辑与渲染（大文档、复杂样式、低延迟输入）。
- 实时协同（多人并发编辑、冲突自动收敛、光标与选区同步）。
- 工程可扩展（插件化、跨平台、可观测、可测试、可灰度）。
- 企业级能力（权限、版本历史、评论批注、导入导出、稳定性与安全性）。

本文档聚焦：

1. 整体系统架构（前端、后端、数据、协同、基础设施）。
2. 前端 Canvas 编辑引擎架构（模型层、排版层、渲染层、交互层）。
3. 关键技术选型建议与阶段性演进路径。
4. 可落地的模块边界、数据流、接口草案、性能与质量策略。

---

## 2. 产品能力分层（能力地图）

### 2.1 L0：基础编辑能力（MVP）

- 纯文本输入、删除、换行、段落合并/拆分。
- 基础行内样式（粗体/斜体/下划线/颜色/字号/字体）。
- 段落样式（对齐、缩进、行距、段前后距）。
- 选区、撤销/重做、复制粘贴（纯文本 + 基础富文本）。
- 文档保存与加载。

### 2.2 L1：文档化能力

- 标题层级、列表（有序/无序/任务列表）、引用、代码块。
- 表格（插入、删除行列、单元格合并拆分、边框样式）。
- 图片/附件嵌入、页面视图（分页、页边距、页眉页脚）。
- 查找替换、目录、脚注/尾注（基础）。

### 2.3 L2：协同与生产力能力

- 实时协同（presence、多人光标、冲突收敛）。
- 评论批注、建议模式（track changes）。
- 版本历史（快照 + 操作回放）、文档恢复。
- 权限模型（owner/editor/commenter/viewer）。

### 2.4 L3：企业级与生态能力

- 大规模团队共享与权限继承。
- 数据审计、合规策略（如操作审计、敏感词策略）。
- 插件市场/二次开发 SDK。
- 多格式导入导出（DOCX/PDF/Markdown/HTML）高保真。

---

## 3. 总体技术架构

## 3.1 逻辑架构总览

```text
┌────────────────────────────────────────────────────────────┐
│                      Client Web / Desktop                 │
│  ┌─────────────── Canvas Editor Runtime ────────────────┐ │
│  │  文档模型  排版引擎  渲染引擎  输入法桥接  命令系统      │ │
│  │  选区系统  协同适配器  插件系统  资源加载  本地缓存      │ │
│  └────────────────────────────────────────────────────────┘ │
│       │HTTP/WS                  │Upload/Download            │
└───────┼─────────────────────────┼────────────────────────────┘
        │                         │
┌───────▼────────┐      ┌─────────▼──────────┐
│ Document API    │      │ Realtime Gateway   │
│ 文档元数据/权限  │      │ 房间连接/Presence    │
└───────┬────────┘      └─────────┬──────────┘
        │                          │
┌───────▼─────────┐      ┌────────▼──────────────┐
│ Document Store   │◄────►│ Collaboration Engine │
│ Snapshot/Version │      │ OT/CRDT + Op Log     │
└───────┬─────────┘      └────────┬──────────────┘
        │                          │
┌───────▼──────────┐      ┌────────▼──────────────┐
│ Object Storage    │      │ Search/Index Service  │
│ 图片/附件/导出文件 │      │ 文档索引/检索          │
└──────────────────┘      └───────────────────────┘
```

## 3.2 架构原则

- **单一事实源（SSOT）**：文档状态以结构化文档模型为准，不以 DOM 为准。
- **输入与渲染解耦**：输入事件先转命令，再变更模型，最后增量排版/渲染。
- **协同优先**：所有本地编辑都可序列化为操作（Operation），天然支持多人合并。
- **增量更新**：局部脏区重排版、重绘，避免整文档重算。
- **可插件化**：块类型、命令、渲染器、导入导出器都可扩展。
- **可回放性**：所有编辑操作可回放用于历史版本、调试与审计。

---

## 4. 前端编辑器架构设计

## 4.1 分层设计

1. **Core Model Layer（文档模型层）**
   - 数据结构：`Document -> Block -> InlineSpan -> TextRun`。
   - 约束：结构合法性（例如列表项必须属于列表容器）。
   - 变更入口：仅允许通过 Command/Operation 修改。

2. **Layout Engine（排版层）**
   - 负责字形测量、断行、段落布局、分页、浮动对象布局。
   - 输出布局树 `LayoutTree`（包含每个可绘制节点的位置、尺寸、基线信息）。

3. **Render Engine（渲染层）**
   - 基于 Canvas2D（后续可扩展 WebGL）绘制文本、装饰线、背景、边框、控件。
   - 使用分层画布（主文档层、选区层、协同光标层、交互覆盖层）。

4. **Interaction/Input Layer（交互输入层）**
   - 处理键盘、鼠标、触控、IME、剪贴板、拖拽。
   - 负责命中测试（hit-test）、光标移动、选区变换。

5. **Collaboration Adapter（协同适配层）**
   - 将本地操作提交至协同引擎。
   - 接收远端操作并映射到本地模型。

6. **Plugin Runtime（插件层）**
   - 注册命令、节点类型、工具栏项、序列化器。
   - 提供受控生命周期（activate/deactivate/dispose）。

## 4.2 文档模型（建议）

### 4.2.1 基础实体

- `Doc`：文档根，含元信息（标题、作者、版本）。
- `BlockNode`：段落级节点（paragraph、heading、list、table、image...）。
- `InlineNode`：行内节点（text、link、mention、inline-code...）。
- `Mark`：附着于 InlineNode 的样式标记（bold、italic、color）。
- `Selection`：光标或范围选区，支持锚点/焦点。

### 4.2.2 索引与定位

双定位体系：

- **结构路径定位**：`[blockIndex, childIndex, offset]`，用于模型编辑。
- **视觉坐标定位**：`(x, y, page)`，用于 hit-test 与交互。

二者通过 LayoutTree 双向映射：

- `path -> rect(s)`：用于绘制选区。
- `point -> path`：用于鼠标定位光标。

## 4.3 Command 与 Operation 机制

- **Command（语义命令）**：如 `toggleBold`, `insertParagraph`, `deleteSelection`。
- **Operation（原子操作）**：如 `insert_text`, `split_block`, `set_mark`。

流程：

```text
Input Event -> Command -> Operation[] -> Apply(Model)
                                 -> Push Undo Stack
                                 -> Emit to Collaboration
                                 -> Trigger Incremental Layout/Render
```

这样可保证：

- 命令层便于产品语义扩展。
- 操作层便于协同与历史回放。
- Undo/Redo 与协同复用同一套基础原语。

## 4.4 撤销/重做系统

- 存储粒度：Operation Batch（一次用户意图形成一个批次）。
- 合并策略：连续输入字符按时间窗口合并（如 1~2 秒）。
- 协同场景：本地 undo 只回滚“本地意图”，通过 transform 保持因果一致。

## 4.5 输入法（IME）与复杂文本

重点支持中日韩输入与组合态文字：

- 维护 `compositionstart/update/end` 状态机。
- 组合态文本使用临时装饰层渲染，不立即提交最终 Operation。
- 在 composition 期间保证光标不跳动、候选框定位稳定。

## 4.6 剪贴板与数据互通

- Copy：同时写入 `text/plain`、`text/html`、自定义 `application/x-editor-slice`。
- Paste：优先解析自定义格式，再降级 html，再降级纯文本。
- 安全：粘贴 HTML 时白名单过滤标签与样式，防 XSS。

## 4.7 渲染性能策略

- 脏区追踪：按 Block 或行盒级别标记 dirty range。
- 分帧渲染：输入后优先渲染光标附近区域，延后低优先级区域。
- 缓存策略：
  - 字形测量缓存（font + text -> metrics）。
  - 段落布局缓存（content hash + width -> line breaks）。
- 大文档虚拟化：只渲染可视页 + 预加载页。

---

## 5. 协同编辑架构（OT vs CRDT）

## 5.1 方案选择建议

- **短期（MVP-L1）**：采用中心化 OT，工程复杂度较低，便于快速落地。
- **中长期（L2+）**：可演进为 JSON CRDT 或保留 OT + Snapshot 混合架构。

## 5.2 协同核心要素

- `siteId/userId/sessionId`：标识编辑来源。
- `opId/seq/vectorClock`：确保因果关系与幂等。
- Transform/Merge：解决并发插入删除冲突。
- Presence 通道：同步在线状态、光标、选区、用户名颜色。

## 5.3 一致性模型

- 文档内容：最终一致（通常亚秒级）。
- 本地输入：乐观本地提交（本地即时生效），服务端确认后对齐。
- 冲突处理：本地回放队列 + 远端操作 transform。

## 5.4 服务端协同流程（简化）

1. 客户端提交本地 op（带 baseRevision）。
2. 服务端校验权限、执行 transform、写入 op log。
3. 广播已确认 op 到房间内其他用户。
4. 定期生成快照（如每 N 条 op 或每 M 分钟）。

---

## 6. 后端与存储架构

## 6.1 服务拆分

- **API Gateway**：统一鉴权、限流、路由。
- **Document Service**：文档元数据、权限、文件夹结构。
- **Collaboration Service**：实时会话、操作转发、冲突处理。
- **Version Service**：快照、版本历史、回滚。
- **Comment Service**：评论、批注线程、@提及。
- **Import/Export Service**：DOCX/PDF/Markdown 转换。
- **Search Service**：全文索引。

## 6.2 数据存储建议

- **OLTP（MySQL/PostgreSQL）**：文档元数据、权限、关系型事务数据。
- **Op Log（Kafka/Pulsar + 持久化）**：高吞吐操作流。
- **Snapshot Store（对象存储 + 索引库）**：版本快照。
- **Cache（Redis）**：文档热点状态、在线用户 Presence。
- **Object Storage（S3/OSS）**：图片、附件、导出文件。

## 6.3 数据模型（简版）

- `documents(id, title, owner_id, latest_revision, created_at, ...)`
- `document_permissions(doc_id, principal_id, role, ...)`
- `document_ops(doc_id, revision, op_id, author_id, payload, ts, ...)`
- `document_snapshots(doc_id, revision, uri, created_at, ...)`
- `comments(id, doc_id, anchor, content, status, ...)`

---

## 7. 协议与接口草案

## 7.1 WebSocket 事件（示例）

- `join_room {docId, userToken}`
- `sync_state {serverRevision, snapshotRef}`
- `submit_ops {baseRevision, ops[]}`
- `ack_ops {newRevision, transformedOps[]}`
- `remote_ops {fromUser, revision, ops[]}`
- `presence_update {userId, cursor, selection, color}`

## 7.2 REST API（示例）

- `GET /docs/:id`：获取文档元信息。
- `GET /docs/:id/snapshot?rev=xxx`：获取指定快照。
- `GET /docs/:id/history`：版本列表。
- `POST /docs/:id/export`：导出任务。
- `POST /docs/:id/comments`：创建评论。

---

## 8. 安全与权限设计

- 鉴权：OAuth2/JWT + 短期访问令牌 + 刷新机制。
- 权限：RBAC + 文档级 ACL，支持组织/团队继承。
- 数据安全：
  - 传输加密（TLS）。
  - 存储加密（对象存储 SSE）。
  - 敏感操作审计日志。
- 内容安全：粘贴 HTML 清洗、上传文件类型校验、病毒扫描（可选）。

---

## 9. 可观测性与稳定性

## 9.1 指标体系

- 前端：
  - 输入到渲染延迟（Input-to-Paint P95）。
  - 首屏可编辑时间（Time-to-Editable）。
  - 大文档滚动帧率（FPS）。
- 后端：
  - WS 连接成功率、消息延迟、冲突 transform 耗时。
  - 快照生成耗时、导出成功率。

## 9.2 日志与追踪

- OpenTelemetry 全链路追踪（API -> 协同 -> 存储）。
- 前端关键事件埋点（命令耗时、异常堆栈、渲染退化路径）。
- 错误分级（P0/P1/P2）与自动告警。

## 9.3 稳定性策略

- 灰度发布 + 特性开关。
- 协同服务多副本 + 会话重连与断线恢复。
- 快照与操作日志双写校验，防数据丢失。

---

## 10. 测试策略

## 10.1 前端

- 单元测试：命令到 operation 转换、模型约束校验。
- 属性测试（property-based）：随机操作序列后模型仍合法。
- 视觉回归：关键排版场景截图比对。
- E2E：输入法、复制粘贴、撤销重做、表格编辑。

## 10.2 协同

- 双人/多人并发编辑冲突用例集。
- 网络抖动/乱序/重放/断线重连压测。
- 长文档高频编辑 soak test（持续数小时）。

## 10.3 后端

- 合约测试（协议兼容）。
- 压测：万人在线房间拆分策略验证。
- 容灾演练：节点重启、消息堆积、存储短暂不可用。

---

## 11. 技术选型建议

## 11.1 前端

- 语言：TypeScript。
- UI：React（壳层 UI），编辑核心保持框架无关。
- 渲染：Canvas2D（优先）+ OffscreenCanvas（可用时）。
- 状态：核心编辑状态使用自研 immutable model + patch。
- 构建：Vite + pnpm workspace monorepo。

## 11.2 后端

- 语言：Go 或 Node.js（根据团队经验二选一）。
- 协同网关：WebSocket。
- 存储：PostgreSQL + Redis + Kafka + S3。
- 部署：Kubernetes，配合 HPA 自动扩缩容。

---

## 12. 里程碑规划（从 0 到 1）

## Phase 0（2~4 周）：技术预研

- 完成最小文本模型、基础排版、Canvas 光标与选区。
- 验证输入法、撤销重做、复制粘贴可行性。
- 输出性能基线（1 万行文本可编辑）。

## Phase 1（4~8 周）：MVP 可用版

- 完成基础富文本能力与文档持久化。
- 单人编辑稳定可用。
- 提供基础导出（Markdown/HTML）。

## Phase 2（6~10 周）：协同 Beta

- 接入 OT 协同、presence、多人光标。
- 上线版本历史（快照 + 回放）。
- 建立核心监控告警。

## Phase 3（持续迭代）：企业与生态

- 评论批注、建议模式、权限体系完善。
- DOCX/PDF 高保真导出。
- 插件系统与开放 API。

---

## 13. 风险清单与应对

1. **复杂脚本排版风险（中日韩、混排）**
   - 应对：优先支持主流文本场景；引入 HarfBuzz/WASM 作为可选增强。

2. **协同算法复杂度高**
   - 应对：先 OT 后 CRDT，避免一步到位导致延期。

3. **大文档性能退化**
   - 应对：增量布局 + 虚拟化 + 分层渲染 + 性能预算门禁。

4. **导入导出保真度不足**
   - 应对：建立“格式兼容基线文档集”持续回归。

---

## 14. 交付物清单（架构阶段）

- 架构设计文档（本文）。
- 核心数据结构定义（TypeScript 类型草案）。
- 协同协议草案（WS 事件 + 错误码）。
- 性能基准与压测计划。
- Phase 0 任务拆解与排期。

---

## 15. 后续建议（下一步）

建议你接下来立刻推进三件事：

1. 建立 monorepo（`editor-core` / `editor-web` / `collab-service` / `shared-protocol`）。
2. 编写最小可运行原型：支持段落输入、光标、选区、撤销重做。
3. 定义 Operation Schema 与 WS 协议，先打通“单文档双人协同”链路。

