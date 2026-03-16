import type { Document, Paragraph } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** Emoji 演示示例数据 */
export const EMOJI_DOC: Document = {
  id: "emoji-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Emoji Support"),
        {
          id: "p-emoji-basic",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "基础 Emoji: " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-animals",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "动物 Emoji: " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-activities",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "活动 Emoji: " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓 🏸 🥊 🥋" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-food",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 32 }, content: { type: "text", text: "食物 Emoji: " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "🍎 🍊 🍋 🍌 🍉 🍇 🍓 🍒 🍑 🥭 🍍 🥥" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Emoji with Text Mix"),
        {
          id: "p-emoji-mixed-1",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 28 }, content: { type: "text", text: "欢迎使用" } },
            {
              properties: { fontSize: 28, bold: true },
              content: { type: "text", text: "Canvas Editor" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "! " } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🎉" } },
            {
              properties: { fontSize: 28 },
              content: { type: "text", text: " 这是一个功能强大的文字编辑器，支持" },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "✨" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "丰富的文本样式。" } },
          ],
        } as Paragraph,
        {
          id: "p-emoji-mixed-2",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 28 }, content: { type: "text", text: "今天天气真好！" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "☀️" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: " 我打算去" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🏖️" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "海滩玩" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🏄" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "冲浪" } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🌊" } },
          ],
        } as Paragraph,
        createSectionHeader("Emoji with Styles"),
        {
          id: "p-emoji-caps",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "Emoji 不受全部大写影响 (Caps): " },
            },
            {
              properties: { fontSize: 28, caps: true },
              content: { type: "text", text: "Hello World 😊 你好世界" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-smallcaps",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "Emoji 不受小型大写影响 (Small Caps): " },
            },
            {
              properties: { fontSize: 28, smallCaps: true },
              content: { type: "text", text: "hello world 🎉 你好世界" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-spacing",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "Emoji 不应用字符间距 (Letter Spacing): " },
            },
            {
              properties: { fontSize: 28, letterSpacing: 100 },
              content: { type: "text", text: "Hello😊World🎉你好" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-shadow",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, shadow: true },
              content: { type: "text", text: "带阴影的 Emoji: 🌟⭐💫" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-bold",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true },
              content: { type: "text", text: "加粗 Emoji: 🍎🍊🍋🍌🍉" },
            },
          ],
        } as Paragraph,
        createSectionHeader("Emoji in Different Sizes"),
        {
          id: "p-emoji-sizes",
          properties: { alignment: "left" },
          children: [
            { properties: { fontSize: 20 }, content: { type: "text", text: "20pt: 😊 " } },
            { properties: { fontSize: 32 }, content: { type: "text", text: "24pt: 😊 " } },
            { properties: { fontSize: 32 }, content: { type: "text", text: "32pt: 😊 " } },
            { properties: { fontSize: 48 }, content: { type: "text", text: "48pt: 😊 " } },
            { properties: { fontSize: 64 }, content: { type: "text", text: "64pt: 😊 " } },
          ],
        } as Paragraph,
        createSectionHeader("Emoji by Byte Length"),
        {
          id: "p-emoji-2bytes",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#FF6B6B" },
              content: { type: "text", text: "2 字节 Emoji (Basic Unicode): " },
            },
            {
              properties: { fontSize: 28 },
              content: {
                type: "text",
                text: "🎈 🎉 🎊 🎁 🎄 🎃 🎗️ 🎟️ 🎫 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸",
              },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-4bytes",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#4ECDC4" },
              content: { type: "text", text: "4 字节 Emoji (With Skin Tone Modifiers): " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👍🏻 👍🏼 👍🏽 👍🏾 👍🏿 " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "(浅色-中等-中等深色-深色-极深色)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-4bytes-more",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#4ECDC4" },
              content: { type: "text", text: "更多 4 字节 Emoji (Fitzpatrick Modifiers): " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👋🏻 👋🏼 👋🏽 👋🏾 👋🏿 " } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👌🏻 👌🏼 👌🏽 👌🏾 👌🏿 " } },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🙌🏻 🙌🏼 🙌🏽 🙌🏾 🙌🏿" } },
          ],
        } as Paragraph,
        {
          id: "p-emoji-6bytes",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#95E1D3" },
              content: { type: "text", text: "6 字节 Emoji (Zero Width Joiner Sequences): " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👨‍👩‍👦 👨‍👩‍👧‍👦 👨‍👨‍👦 👩‍👩‍👧 " } },
            { properties: { fontSize: 32 }, content: { type: "text", text: "(家庭组合)" } },
          ],
        } as Paragraph,
        {
          id: "p-emoji-6bytes-professions",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#95E1D3" },
              content: { type: "text", text: "更多 6 字节 Emoji (职业 + 性别): " },
            },
            {
              properties: { fontSize: 28 },
              content: { type: "text", text: "👨‍💻 👩‍💻 👨‍🎨 👩‍🎨 👨‍🚀 👩‍🚀 👨‍⚕️ 👩‍⚕️ " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👨‍🏫 👩‍🏫 👨‍🌾 👩‍🌾 👨‍🔬 👩‍🔬" } },
          ],
        } as Paragraph,
        {
          id: "p-emoji-multi-bytes",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#DDA0DD" },
              content: { type: "text", text: "多字节复杂 Emoji (Complex Sequences): " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "🏳️‍🌈 🏴‍☠️ 🏁‍☠️ " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "(彩虹旗、海盗旗、带骷髅的旗)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-complex",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#DDA0DD" },
              content: { type: "text", text: "超复杂 Emoji 组合: " },
            },
            { properties: { fontSize: 28 }, content: { type: "text", text: "👨‍👩‍👧‍👦 🧑‍🤝‍🧑 🫂 👩‍❤️‍👨 👨‍❤️‍👨 " } },
            {
              properties: { fontSize: 32 },
              content: { type: "text", text: "(完整家庭、手拉手、拥抱、情侣)" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-hand-sequence",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#F39C12" },
              content: { type: "text", text: "手势组合 Emoji (Hand Sequences): " },
            },
            {
              properties: { fontSize: 28 },
              content: { type: "text", text: "🙏 🙌 🤝 🤞 🤟 🤘 🤙 👌 👍 👎 ✊ ✋ 👊 🖐️ ✋" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-flags",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#3498DB" },
              content: { type: "text", text: "国旗 Emoji (Country Flags - 4 字节): " },
            },
            {
              properties: { fontSize: 28 },
              content: { type: "text", text: "🇨🇳 🇺🇸 🇯🇵 🇰🇷 🇬🇧 🇫🇷 🇩🇪 🇮🇹 🇷🇺 🇨🇦 🇦🇺 🇧🇷 🇮🇳" },
            },
          ],
        } as Paragraph,
        {
          id: "p-emoji-zodiac",
          properties: { alignment: "left" },
          children: [
            {
              properties: { fontSize: 32, bold: true, color: "#9B59B6" },
              content: { type: "text", text: "生肖 Emoji (Zodiac Signs): " },
            },
            {
              properties: { fontSize: 28 },
              content: { type: "text", text: "🐭 🐮 🐯 🐰 🐲 🐍 🐴 🐑 🐵 🐔 🐶 🐷" },
            },
          ],
        } as Paragraph,
      ],
    },
  ],
};
