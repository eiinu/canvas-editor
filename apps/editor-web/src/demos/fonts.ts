import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** 字体演示示例数据 */
export const FONTS_DOC: Document = {
  id: "fonts-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Font Management (Mapping & Fallback)"),
        {
          id: "p-fonts-en",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, fontFamily: "Arial" },
              content: {
                type: "text",
                text: "Arial: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Times New Roman" },
              content: {
                type: "text",
                text: "Times New Roman: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Courier New" },
              content: {
                type: "text",
                text: "Courier New: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Georgia" },
              content: {
                type: "text",
                text: "Georgia: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Verdana" },
              content: {
                type: "text",
                text: "Verdana: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Tahoma" },
              content: {
                type: "text",
                text: "Tahoma: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Helvetica" },
              content: {
                type: "text",
                text: "Helvetica: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Impact" },
              content: {
                type: "text",
                text: "Impact: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Comic Sans MS" },
              content: {
                type: "text",
                text: "Comic Sans MS: The quick brown fox jumps over the lazy dog.",
              },
            },
            {
              properties: { fontSize: 32, fontFamily: "Arial Black" },
              content: {
                type: "text",
                text: "Arial Black: The quick brown fox jumps over the lazy dog.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-fonts-zh",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, fontFamily: "Microsoft YaHei" },
              content: { type: "text", text: "微软雅黑：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "SimSun" },
              content: { type: "text", text: "宋体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "KaiTi" },
              content: { type: "text", text: "楷体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "SimHei" },
              content: { type: "text", text: "黑体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "FangSong" },
              content: { type: "text", text: "仿宋：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "STSong" },
              content: { type: "text", text: "华文宋体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "STHeiti" },
              content: { type: "text", text: "华文黑体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "STKaiti" },
              content: { type: "text", text: "华文楷体：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "STFangsong" },
              content: { type: "text", text: "华文仿宋：前端开发是一个充满挑战的领域。" },
            },
            {
              properties: { fontSize: 32, fontFamily: "PingFang SC" },
              content: { type: "text", text: "萍方：前端开发是一个充满挑战的领域。" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Mixed Fonts (ASCII vs EastAsia)"),
        {
          id: "p-mixed-fonts",
          properties: { alignment: "left" },
          children: [
            {
              properties: {
                fontSize: 32,
                fonts: { ascii: "Courier New", eastAsia: "KaiTi" },
              },
              content: {
                type: "text",
                text: "这是一段混合文本: English(Courier New) + 中文(楷体)。",
              },
            },
            {
              properties: {
                fontSize: 32,
                fonts: { ascii: "Times New Roman", eastAsia: "SimSun" },
              },
              content: {
                type: "text",
                text: "Another mixed sample: Numbers 123456 + 中文(宋体)。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-fallback-desc",
          properties: { alignment: "left", spacing: { before: 200 } },
          children: [
            {
              properties: { fontSize: 32, italic: true, color: "#666666" },
              content: {
                type: "text",
                text: "注：跨平台环境下，缺失字体将自动回退到系统相似字体（如 macOS 下微软雅黑回退至萍方）。",
              },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
