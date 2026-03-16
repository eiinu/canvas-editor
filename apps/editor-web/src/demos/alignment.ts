import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** 段落对齐示例数据 */
export const ALIGNMENT_DOC: Document = {
  id: "alignment-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Paragraph Alignment"),
        {
          id: "p-align-left",
          properties: {
            alignment: "left",
            borders: {
              "w:bottom": { "w:val": "single", "w:size": 2, "w:space": 0, "w:color": "auto" },
            },
          },
          children: [
            {
              properties: { fontSize: 32, color: "#FF6B6B" },
              content: {
                type: "text",
                text: "左对齐 (Left Alignment): 这是一段左对齐的文本，默认情况下文本会从左边界开始排列。适用于大多数正常文档内容。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-align-center",
          properties: {
            alignment: "center",
            borders: {
              "w:bottom": { "w:val": "single", "w:size": 2, "w:space": 0, "w:color": "auto" },
            },
          },
          children: [
            {
              properties: { fontSize: 32, color: "#4ECDC4" },
              content: {
                type: "text",
                text: "居中对齐 (Center Alignment): 这是一段居中对齐的文本，文本会在容器中央显示。适用于标题、署名等需要突出显示的内容。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-align-right",
          properties: {
            alignment: "right",
            borders: {
              "w:bottom": { "w:val": "single", "w:size": 2, "w:space": 0, "w:color": "auto" },
            },
          },
          children: [
            {
              properties: { fontSize: 32, color: "#95E1D3" },
              content: {
                type: "text",
                text: "右对齐 (Right Alignment): 这是一段右对齐的文本，文本会从右边界开始排列。适用于签名、地址等需要右对齐的内容。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-align-justify",
          properties: {
            alignment: "both",
            borders: {
              "w:bottom": { "w:val": "single", "w:size": 2, "w:space": 0, "w:color": "auto" },
            },
          },
          children: [
            {
              properties: { fontSize: 32, color: "#DDA0DD" },
              content: {
                type: "text",
                text: "两端对齐 (Justify Alignment): 这是一段两端对齐的文本，文本会在左右边界同时对齐，每行的宽度会自动调整以填满整个宽度。适用于正文段落，让页面看起来更加整洁和统一。",
              },
            },
          ],
        } as Paragraph,
        createSectionHeader("Alignment with Indentation"),
        {
          id: "p-align-left-indent",
          properties: { alignment: "left", indentation: { left: 500 } },
          children: [
            {
              properties: { fontSize: 22 },
              content: {
                type: "text",
                text: "左对齐 + 左缩进 500 twips：这是一段带缩进的左对齐文本。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-align-center-indent",
          properties: { alignment: "center", indentation: { left: 500, right: 500 } },
          children: [
            {
              properties: { fontSize: 22 },
              content: {
                type: "text",
                text: "居中对齐 + 左右各缩进 500 twips：这是一段带缩进的居中对齐文本。",
              },
            },
          ],
        } as Paragraph,
        createSectionHeader("Mixed Alignment"),
        {
          id: "p-mixed-align-1",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 26, bold: true, color: "#FF6B6B" },
              content: { type: "text", text: "左" },
            },
            { properties: { fontSize: 20 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 26, bold: true, color: "#4ECDC4" },
              content: { type: "text", text: "居" },
            },
            { properties: { fontSize: 20 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 26, bold: true, color: "#95E1D3" },
              content: { type: "text", text: "右" },
            },
            { properties: { fontSize: 20 }, content: { type: "text", text: " " } },
            {
              properties: { fontSize: 26, bold: true, color: "#DDA0DD" },
              content: { type: "text", text: "两" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Practical Examples"),
        {
          id: "p-title-example",
          properties: { alignment: "center", spacing: { after: 300 } },
          children: [
            {
              properties: { fontSize: 48, bold: true, color: "#4F46E5" },
              content: { type: "text", text: "标题示例" },
            },
          ],
        } as Paragraph,
        {
          id: "p-author-example",
          properties: { alignment: "right", spacing: { after: 400 } },
          children: [
            {
              properties: { fontSize: 32, italic: true, color: "#666666" },
              content: { type: "text", text: "作者：AI Assistant" },
            },
          ],
        } as Paragraph,
        {
          id: "p-content-example",
          properties: { alignment: "both", spacing: { after: 200 } },
          children: [
            {
              properties: { fontSize: 22 },
              content: {
                type: "text",
                text: "这是一段正文内容，使用两端对齐方式。两端对齐会让文本在左右边界同时对齐，每行的宽度会自动调整。这种对齐方式在正式文档、书籍、报纸等排版中非常常见，因为它可以让页面看起来更加整齐、统一和专业。",
              },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
