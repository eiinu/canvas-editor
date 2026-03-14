# 字体管理模块开发进度 (Font Management)

本文件用于追踪编辑器字体管理、映射及兼容性处理的开发进度。

## 核心任务清单

- [x] **基础架构**
  - [x] `FontManager` 类定义
  - [x] 字体族 (Font Family) 解析逻辑
- [x] **字体映射 (Font Mapping)**
  - [x] OpenXML 到 Web 字体名称映射
  - [x] 操作系统级字体回退 (Fallback) 逻辑
  - [x] 中文字体兼容性处理 (如：微软雅黑 -> PingFang SC/Hiragino Sans GB)
- [x] **性能优化**
  - [x] 字体加载状态监测
  - [x] 字体宽度测量缓存集成
- [x] **集成与演示**
  - [x] 集成至 `CanvasRenderer`
  - [x] 在 `editor-web` 中演示自动回退效果

## 映射规则规划 (Draft)

| OpenXML 字体 | Windows (Web) | macOS Fallback | Linux Fallback | 通用回退 |
| :--- | :--- | :--- | :--- | :--- |
| **Microsoft YaHei** | "Microsoft YaHei" | "PingFang SC" | "Droid Sans Fallback" | sans-serif |
| **SimSun** | "SimSun" | "STSong" | "AR PL UMing CN" | serif |
| **SimHei** | "SimHei" | "STHeiti" | "WenQuanYi Zen Hei" | sans-serif |
| **KaiTi** | "KaiTi" | "STKaiti" | "AR PL UKai CN" | cursive |
| **FangSong** | "FangSong" | "STFangsong" | - | serif |
