import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

export const MATH_DOC: Document = {
  id: "math-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Math Formula"),
        {
          id: "p-math-1",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 30 }, content: { type: "text", text: "勾股定理：" } },
            {
              properties: { fontSize: 30, italic: true },
              content: { type: "math", text: "a² + b² = c²" },
            },
          ],
        } as Paragraph,
        {
          id: "p-math-2",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 30 }, content: { type: "text", text: "欧拉公式：" } },
            {
              properties: { fontSize: 30, italic: true },
              content: { type: "math", text: "e^{iπ} + 1 = 0" },
            },
          ],
        } as Paragraph,
        {
          id: "p-math-3",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 30 }, content: { type: "text", text: "上下标组合：" } },
            {
              properties: { fontSize: 30, italic: true },
              content: { type: "math", text: "x_(i)^(2)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-math-4",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 30 }, content: { type: "text", text: "分式：" } },
            {
              properties: { fontSize: 30, italic: true },
              content: { type: "math", text: "(a+b)/(c+d)" },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
