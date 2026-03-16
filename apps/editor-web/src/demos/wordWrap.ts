import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** 自动换行示例数据 */
export const WORD_WRAP_DOC: Document = {
  id: "wrap-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Word Wrap & Layout"),
        {
          id: "p-wrap-zh",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段中文长段落，用于测试自动换行功能。中文文本的换行处理相对简单，因为每个汉字的宽度基本相同，系统可以根据容器宽度自动计算换行位置。这段文本包含了足够的内容，以确保它会在画布上自动换行显示，从而验证自动换行算法的正确性。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-en",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "This is a long English paragraph for testing word wrap functionality. English text wrap is more complex because words have different lengths, and the system needs to break lines at word boundaries to maintain readability. This paragraph contains enough content to ensure it will wrap automatically on the canvas, thus verifying the correctness of the word wrap algorithm.",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-mixed",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段中英混合的长段落，用于测试混合文本的自动换行功能。This paragraph contains both Chinese and English text, which presents unique challenges for word wrap algorithms. 系统需要同时处理汉字和英文单词的换行，确保在适当的位置进行断行，以保持文本的可读性。这种混合文本的换行处理是排版系统的重要功能之一。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-justified",
          properties: { alignment: "both" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段两端对齐的中文长段落，用于测试两端对齐时的自动换行功能。两端对齐会调整单词之间的间距，使每行文本都能在左右边界同时对齐，从而产生更加整洁的视觉效果。这种对齐方式在正式文档中非常常见，需要特殊的换行和间距调整算法。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-center",
          properties: { alignment: "center" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段居中对齐的中文长段落，用于测试居中对齐时的自动换行功能。居中对齐的文本会在每行的左右两侧留出相等的空白，使文本块在容器中居中显示。这种对齐方式常用于标题和强调性内容，需要特殊的换行计算。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-right",
          properties: { alignment: "right" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段右对齐的中文长段落，用于测试右对齐时的自动换行功能。右对齐的文本会从容器的右侧边界开始向左排列，每行的右侧对齐，左侧可能会有不规则的空白。这种对齐方式常用于文档的日期、签名等部分。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-with-indent",
          properties: { alignment: "left", indentation: { left: 200, firstLine: 100 } },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段带有缩进的中文长段落，用于测试缩进时的自动换行功能。缩进会影响文本的可用宽度，从而影响换行的位置。首行缩进和左缩进的组合使用可以创建更加结构化的文档布局，需要在换行计算中考虑这些因素。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-small-font",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 16, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段小字号的中文长段落，用于测试不同字号时的自动换行功能。字号的大小会影响每行能容纳的字符数量，从而影响换行的位置。系统需要根据当前使用的字体和字号来准确计算文本的宽度，以确保换行的正确性。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-large-font",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 40, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段大字号的中文长段落，用于测试大字号时的自动换行功能。大字号的文本每行能容纳的字符数量较少，换行会更加频繁。系统需要正确处理这种情况，确保文本能够在画布上完整显示。",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-wrap-special-chars",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, color: "#666666" },
              content: {
                type: "text",
                text: "这是一段包含特殊字符的长段落，用于测试特殊字符对自动换行的影响。特殊字符如标点符号、数字、符号等可能会影响换行的位置，系统需要正确处理这些情况，以确保文本的可读性。例如，标点符号通常不应该出现在行首，数字和符号的处理也需要特殊考虑。",
              },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
