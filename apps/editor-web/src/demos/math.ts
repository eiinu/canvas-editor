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
      ],
    },
  ],
};
