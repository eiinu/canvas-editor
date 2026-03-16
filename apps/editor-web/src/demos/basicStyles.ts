import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** 基础样式示例数据 */
export const BASIC_STYLES_DOC: Document = {
  id: "styles-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Basic Text Styles"),
        {
          id: "p-styles",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "基础样式：" } },
            {
              properties: { fontSize: 32, bold: true },
              content: { type: "text", text: "加粗 (Bold)" },
            },
            {
              properties: { fontSize: 32, italic: true },
              content: { type: "text", text: "，斜体 (Italic)" },
            },
            {
              properties: { fontSize: 32, underline: "single" },
              content: { type: "text", text: "，下划线 (Underline)" },
            },
            {
              properties: { fontSize: 32, underline: "single", underlineColor: "#FF0000" },
              content: { type: "text", text: "，红色下划线" },
            },
            {
              properties: { fontSize: 32, strike: true },
              content: { type: "text", text: "，删除线 (Strike)" },
            },
            {
              properties: { fontSize: 32, doubleStrike: true },
              content: { type: "text", text: "，双删除线 (Double Strike)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "，" } },
            { properties: { fontSize: 32 }, content: { type: "text", text: "E=mc" } },
            {
              properties: { fontSize: 32, vertAlign: "superscript" },
              content: { type: "text", text: "2" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "，H" } },
            {
              properties: { fontSize: 32, vertAlign: "subscript" },
              content: { type: "text", text: "2" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "O" } },
            { properties: { fontSize: 32 }, content: { type: "text", text: "，" } },
            {
              properties: { fontSize: 32, caps: true },
              content: { type: "text", text: "all caps" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "，" } },
            {
              properties: { fontSize: 32, smallCaps: true },
              content: { type: "text", text: "Small Caps" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "，" } },
            {
              properties: { fontSize: 32, vanish: true },
              content: { type: "text", text: "你看不到我" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Highlight & Spacing"),
        {
          id: "p-highlight-demo",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, highlight: "#FFFF00" },
              content: { type: "text", text: "黄色高亮" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, highlight: "#00FF00" },
              content: { type: "text", text: "绿色高亮" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, highlight: "#00FFFF" },
              content: { type: "text", text: "青色高亮" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, highlight: "#FF00FF", color: "#FFFFFF" },
              content: { type: "text", text: "粉色高亮+白字" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, highlight: "#333333", color: "#FFFFFF" },
              content: { type: "text", text: "深灰高亮+白字" },
            },
          ],
        } as Paragraph,
        {
          id: "p-spacing-demo",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, letterSpacing: 40 },
              content: { type: "text", text: "紧凑间距 (40 twips)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "\n" } },
            {
              properties: { fontSize: 32, letterSpacing: 100 },
              content: { type: "text", text: "标准宽间距 (100 twips)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: "\n" } },
            {
              properties: { fontSize: 32, letterSpacing: 300 },
              content: { type: "text", text: "超宽间距 (300 twips)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-mixed-highlight-spacing",
          properties: { alignment: "left" },
          children: [
            {
              properties: {
                fontSize: 28,
                bold: true,
                highlight: "#FFD700",
                letterSpacing: 150,
                color: "#000000",
              },
              content: { type: "text", text: "金底+加粗+宽间距组合" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "\n" } },
            {
              properties: {
                fontSize: 32,
                smallCaps: true,
                letterSpacing: 200,
                color: "#4B0082",
              },
              content: { type: "text", text: "Small Caps + Letter Spacing" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Text Effects (Shadow, Outline, etc.)"),
        {
          id: "p-effects-demo",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, shadow: true },
              content: { type: "text", text: "阴影文字 (Shadow)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, outline: true },
              content: { type: "text", text: "空心轮廓 (Outline)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, emboss: true },
              content: { type: "text", text: "阳文/浮雕 (Emboss)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, imprint: true },
              content: { type: "text", text: "阴文/雕刻 (Imprint)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-shading-demo",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, shading: "#E0E7FF" },
              content: { type: "text", text: "文字底纹 (Shading: Indigo 100)" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 32, shading: "#FEE2E2" },
              content: { type: "text", text: "粉色底纹 (Shading: Red 100)" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Mixed Styles Combinations"),
        {
          id: "p-mixed-1",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 28, bold: true, italic: true, color: "#FF4500" },
              content: { type: "text", text: "加粗+斜体+橙色" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "，" } },
            {
              properties: {
                fontSize: 28,
                bold: true,
                underline: "single",
                underlineColor: "#008000",
              },
              content: { type: "text", text: "加粗+绿色下划线" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "，" } },
            {
              properties: { fontSize: 28, italic: true, strike: true, color: "#808080" },
              content: { type: "text", text: "斜体+删除线+灰色" },
            },
          ],
        } as Paragraph,
        {
          id: "p-mixed-2",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 28, bold: true, doubleStrike: true, color: "#4B0082" },
              content: { type: "text", text: "加粗+靛蓝色双删除线" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "，" } },
            {
              properties: {
                fontSize: 28,
                underline: "single",
                underlineColor: "#FFD700",
                italic: true,
              },
              content: { type: "text", text: "斜体+金色下划线" },
            },
          ],
        } as Paragraph,
        {
          id: "p-mixed-complex",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "复杂组合：" } },
            {
              properties: {
                fontSize: 36,
                bold: true,
                color: "#FF0000",
                underline: "single",
                underlineColor: "#0000FF",
              },
              content: { type: "text", text: "红字蓝线下划线" },
            },
            {
              properties: {
                fontSize: 32,
                vertAlign: "superscript",
                bold: true,
                italic: true,
                color: "#006400",
              },
              content: { type: "text", text: "上标加粗斜体" },
            },
            { properties: { fontSize: 32 }, content: { type: "text", text: " 正常 " } },
            {
              properties: {
                fontSize: 32,
                vertAlign: "subscript",
                doubleStrike: true,
                color: "#A52A2A",
              },
              content: { type: "text", text: "下标双删除线" },
            },
          ],
        } as Paragraph,
        {
          id: "p-mixed-fonts-styles",
          properties: { alignment: "left" },
          children: [
            {
              properties: {
                fontSize: 32,
                fonts: { ascii: "Courier New", eastAsia: "KaiTi" },
                bold: true,
                underline: "single",
                underlineColor: "#FF00FF",
              },
              content: { type: "text", text: "混合字体+加粗+粉色下划线" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Color & Size"),
        {
          id: "p-colors",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#FF0000" },
              content: { type: "text", text: "红色 16pt 文本" },
            },
            {
              properties: { fontSize: 20, color: "#0000FF" },
              content: { type: "text", text: "，蓝色 10pt 文本" },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
