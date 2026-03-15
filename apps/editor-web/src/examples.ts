import { Document, Paragraph } from '@eiinu/editor-protocol';

/**
 * 辅助函数：创建功能模块标题
 */
const createSectionHeader = (title: string): Paragraph => ({
  id: `header-${title.replace(/\s+/g, '-').toLowerCase()}`,
  properties: { alignment: 'left', spacing: { before: 400, after: 200 } },
  children: [
    {
      properties: { fontSize: 32, bold: true, color: '#312E81', underline: 'single' },
      content: { type: 'text', text: `Section: ${title}` }
    }
  ]
} as Paragraph);

/**
 * OpenXML 示例数据集合
 * 使用标准的 Document 对象定义，不再使用字符串拼接
 */

/** 标题示例数据 */
export const TITLE_DOC: Document = {
  id: 'title-doc',
  sections: [{
    properties: {},
    children: [
      {
        id: 'p-title',
        properties: { alignment: 'center', spacing: { after: 600 } },
        children: [{
          properties: { fontSize: 60, bold: true, color: '#4F46E5' },
          content: { type: 'text', text: 'EIINU Editor (Elegant Objects)' }
        }]
      } as Paragraph
    ]
  }]
};

/** 基础样式示例数据 */
export const BASIC_STYLES_DOC: Document = {
  id: 'styles-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Basic Text Styles'),
      {
        id: 'p-styles',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: '基础样式：' } },
          { properties: { fontSize: 24, bold: true }, content: { type: 'text', text: '加粗 (Bold)' } },
          { properties: { fontSize: 24, italic: true }, content: { type: 'text', text: '，斜体 (Italic)' } },
          { properties: { fontSize: 24, underline: 'single' }, content: { type: 'text', text: '，下划线 (Underline)' } },
          { properties: { fontSize: 24, underline: 'single', underlineColor: '#FF0000' }, content: { type: 'text', text: '，红色下划线' } },
          { properties: { fontSize: 24, strike: true }, content: { type: 'text', text: '，删除线 (Strike)' } },
          { properties: { fontSize: 24, doubleStrike: true }, content: { type: 'text', text: '，双删除线 (Double Strike)' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: 'E=mc' } },
          { properties: { fontSize: 24, vertAlign: 'superscript' }, content: { type: 'text', text: '2' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '，H' } },
          { properties: { fontSize: 24, vertAlign: 'subscript' }, content: { type: 'text', text: '2' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: 'O' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 24, caps: true }, content: { type: 'text', text: 'all caps' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 24, smallCaps: true }, content: { type: 'text', text: 'Small Caps' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 24, vanish: true }, content: { type: 'text', text: '你看不到我' } }
        ]
      } as Paragraph,
      createSectionHeader('Highlight & Spacing'),
      {
        id: 'p-highlight-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, highlight: '#FFFF00' }, content: { type: 'text', text: '黄色高亮' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 24, highlight: '#00FF00' }, content: { type: 'text', text: '绿色高亮' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 24, highlight: '#00FFFF' }, content: { type: 'text', text: '青色高亮' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 24, highlight: '#FF00FF', color: '#FFFFFF' }, content: { type: 'text', text: '粉色高亮+白字' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 24, highlight: '#333333', color: '#FFFFFF' }, content: { type: 'text', text: '深灰高亮+白字' } },
        ]
      } as Paragraph,
      {
        id: 'p-spacing-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, letterSpacing: 40 }, content: { type: 'text', text: '紧凑间距 (40 twips)' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '\n' } },
          { properties: { fontSize: 24, letterSpacing: 100 }, content: { type: 'text', text: '标准宽间距 (100 twips)' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '\n' } },
          { properties: { fontSize: 24, letterSpacing: 300 }, content: { type: 'text', text: '超宽间距 (300 twips)' } },
        ]
      } as Paragraph,
      {
        id: 'p-mixed-highlight-spacing',
        properties: { alignment: 'left' },
        children: [
          { 
            properties: { 
              fontSize: 28, 
              bold: true, 
              highlight: '#FFD700', 
              letterSpacing: 150,
              color: '#000000'
            }, 
            content: { type: 'text', text: '金底+加粗+宽间距组合' } 
          },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '\n' } },
          { 
            properties: { 
              fontSize: 24, 
              smallCaps: true, 
              letterSpacing: 200,
              color: '#4B0082'
            }, 
            content: { type: 'text', text: 'Small Caps + Letter Spacing' } 
          }
        ]
      } as Paragraph,
      createSectionHeader('Text Effects (Shadow, Outline, etc.)'),
      {
        id: 'p-effects-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, shadow: true }, content: { type: 'text', text: '阴影文字 (Shadow)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, outline: true }, content: { type: 'text', text: '空心轮廓 (Outline)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, emboss: true }, content: { type: 'text', text: '阳文/浮雕 (Emboss)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, imprint: true }, content: { type: 'text', text: '阴文/雕刻 (Imprint)' } },
        ]
      } as Paragraph,
      {
        id: 'p-shading-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, shading: '#E0E7FF' }, content: { type: 'text', text: '文字底纹 (Shading: Indigo 100)' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 24, shading: '#FEE2E2' }, content: { type: 'text', text: '粉色底纹 (Shading: Red 100)' } },
        ]
      } as Paragraph,
      createSectionHeader('Mixed Styles Combinations'),
      {
        id: 'p-mixed-1',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28, bold: true, italic: true, color: '#FF4500' }, content: { type: 'text', text: '加粗+斜体+橙色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 28, bold: true, underline: 'single', underlineColor: '#008000' }, content: { type: 'text', text: '加粗+绿色下划线' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 28, italic: true, strike: true, color: '#808080' }, content: { type: 'text', text: '斜体+删除线+灰色' } },
        ]
      } as Paragraph,
      {
        id: 'p-mixed-2',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28, bold: true, doubleStrike: true, color: '#4B0082' }, content: { type: 'text', text: '加粗+靛蓝色双删除线' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 28, underline: 'single', underlineColor: '#FFD700', italic: true }, content: { type: 'text', text: '斜体+金色下划线' } },
        ]
      } as Paragraph,
      {
        id: 'p-mixed-complex',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: '复杂组合：' } },
          { properties: { fontSize: 36, bold: true, color: '#FF0000', underline: 'single', underlineColor: '#0000FF' }, content: { type: 'text', text: '红字蓝线下划线' } },
          { properties: { fontSize: 24, vertAlign: 'superscript', bold: true, italic: true, color: '#006400' }, content: { type: 'text', text: '上标加粗斜体' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: ' 正常 ' } },
          { properties: { fontSize: 24, vertAlign: 'subscript', doubleStrike: true, color: '#A52A2A' }, content: { type: 'text', text: '下标双删除线' } },
        ]
      } as Paragraph,
      {
        id: 'p-mixed-fonts-styles',
        properties: { alignment: 'left' },
        children: [
          { 
            properties: { 
              fontSize: 32, 
              fonts: { ascii: 'Courier New', eastAsia: 'KaiTi' },
              bold: true,
              underline: 'single',
              underlineColor: '#FF00FF'
            }, 
            content: { type: 'text', text: '混合字体+加粗+粉色下划线' } 
          }
        ]
      } as Paragraph,
      createSectionHeader('Color & Size'),
      {
        id: 'p-colors',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, color: '#FF0000' }, content: { type: 'text', text: '红色 16pt 文本' } },
          { properties: { fontSize: 20, color: '#0000FF' }, content: { type: 'text', text: '，蓝色 10pt 文本' } }
        ]
      } as Paragraph
    ]
  }]
};

/** 自动换行示例数据 */
export const WORD_WRAP_DOC: Document = {
  id: 'wrap-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Word Wrap & Layout'),
      {
        id: 'p-wrap',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 24, color: '#666666' },
          content: { type: 'text', text: '这是一段通过 Document 对象生成的长文本，用于测试自动换行。相比字符串拼接，这种方式更加结构化，易于通过代码动态控制属性，且能利用 TypeScript 的类型检查。' }
        }]
      } as Paragraph
    ]
  }]
};

/** 字体演示示例数据 */
export const FONTS_DOC: Document = {
  id: 'fonts-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Font Management (Mapping & Fallback)'),
      {
        id: 'p-fonts-en',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'Arial' }, content: { type: 'text', text: 'Arial: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Times New Roman' }, content: { type: 'text', text: 'Times New Roman: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Courier New' }, content: { type: 'text', text: 'Courier New: The quick brown fox jumps over the lazy dog.' } }
        ]
      } as Paragraph,
      {
        id: 'p-fonts-zh',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'Microsoft YaHei' }, content: { type: 'text', text: '微软雅黑：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'SimSun' }, content: { type: 'text', text: '宋体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'KaiTi' }, content: { type: 'text', text: '楷体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'SimHei' }, content: { type: 'text', text: '黑体：前端开发是一个充满挑战的领域。' } }
        ]
      } as Paragraph,
      createSectionHeader('Mixed Fonts (ASCII vs EastAsia)'),
      {
        id: 'p-mixed-fonts',
        properties: { alignment: 'left' },
        children: [
          {
            properties: {
              fontSize: 32,
              fonts: { ascii: 'Courier New', eastAsia: 'KaiTi' }
            },
            content: { type: 'text', text: '这是一段混合文本: English(Courier New) + 中文(楷体)。' }
          },
          {
            properties: {
              fontSize: 32,
              fonts: { ascii: 'Times New Roman', eastAsia: 'SimSun' }
            },
            content: { type: 'text', text: 'Another mixed sample: Numbers 123456 + 中文(宋体)。' }
          }
        ]
      } as Paragraph,
      {
        id: 'p-fallback-desc',
        properties: { alignment: 'left', spacing: { before: 200 } },
        children: [{ properties: { fontSize: 24, italic: true, color: '#666666' }, content: { type: 'text', text: '注：跨平台环境下，缺失字体将自动回退到系统相似字体（如 macOS 下微软雅黑回退至萍方）。' } }]
      } as Paragraph
    ]
  }]
};

/** Emoji 演示示例数据 */
export const EMOJI_DOC: Document = {
  id: 'emoji-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Emoji Support'),
      {
        id: 'p-emoji-basic',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: '基础 Emoji: ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-animals',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: '动物 Emoji: ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🐯 🦁 🐮' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-activities',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: '活动 Emoji: ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '⚽ 🏀 🏈 ⚾ 🎾 🏐 🏉 🎱 🏓 🏸 🥊 🥋' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-food',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: '食物 Emoji: ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '🍎 🍊 🍋 🍌 🍉 🍇 🍓 🍒 🍑 🥭 🍍 🥥' } },
        ]
      } as Paragraph,
      createSectionHeader('Emoji with Text Mix'),
      {
        id: 'p-emoji-mixed-1',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28 }, content: { type: 'text', text: '欢迎使用' } },
          { properties: { fontSize: 28, bold: true }, content: { type: 'text', text: 'Canvas Editor' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '! ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🎉' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' 这是一个功能强大的文字编辑器，支持' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '✨' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '丰富的文本样式。' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-mixed-2',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28 }, content: { type: 'text', text: '今天天气真好！' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '☀️' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' 我打算去' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🏖️' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '海滩玩' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🏄' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '冲浪' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🌊' } },
        ]
      } as Paragraph,
      createSectionHeader('Emoji with Styles'),
      {
        id: 'p-emoji-caps',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: 'Emoji 不受全部大写影响 (Caps): ' } },
          { properties: { fontSize: 28, caps: true }, content: { type: 'text', text: 'Hello World 😊 你好世界' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-smallcaps',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: 'Emoji 不受小型大写影响 (Small Caps): ' } },
          { properties: { fontSize: 28, smallCaps: true }, content: { type: 'text', text: 'hello world 🎉 你好世界' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-spacing',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: 'Emoji 不应用字符间距 (Letter Spacing): ' } },
          { properties: { fontSize: 28, letterSpacing: 100 }, content: { type: 'text', text: 'Hello😊World🎉你好' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-shadow',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, shadow: true }, content: { type: 'text', text: '带阴影的 Emoji: 🌟⭐💫' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-bold',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true }, content: { type: 'text', text: '加粗 Emoji: 🍎🍊🍋🍌🍉' } },
        ]
      } as Paragraph,
      createSectionHeader('Emoji in Different Sizes'),
      {
        id: 'p-emoji-sizes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 20 }, content: { type: 'text', text: '20pt: 😊 ' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '24pt: 😊 ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '32pt: 😊 ' } },
          { properties: { fontSize: 48 }, content: { type: 'text', text: '48pt: 😊 ' } },
          { properties: { fontSize: 64 }, content: { type: 'text', text: '64pt: 😊 ' } },
        ]
      } as Paragraph,
      createSectionHeader('Emoji by Byte Length'),
      {
        id: 'p-emoji-2bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#FF6B6B' }, content: { type: 'text', text: '2 字节 Emoji (Basic Unicode): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🎈 🎉 🎊 🎁 🎄 🎃 🎗️ 🎟️ 🎫 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-4bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#4ECDC4' }, content: { type: 'text', text: '4 字节 Emoji (With Skin Tone Modifiers): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👍🏻 👍🏼 👍🏽 👍🏾 👍🏿 ' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '(浅色-中等-中等深色-深色-极深色)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-4bytes-more',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#4ECDC4' }, content: { type: 'text', text: '更多 4 字节 Emoji (Fitzpatrick Modifiers): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👋🏻 👋🏼 👋🏽 👋🏾 👋🏿 ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👌🏻 👌🏼 👌🏽 👌🏾 👌🏿 ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🙌🏻 🙌🏼 🙌🏽 🙌🏾 🙌🏿' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-6bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#95E1D3' }, content: { type: 'text', text: '6 字节 Emoji (Zero Width Joiner Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍👩‍👦 👨‍👩‍👧‍👦 👨‍👨‍👦 👩‍👩‍👧 ' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '(家庭组合)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-6bytes-professions',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#95E1D3' }, content: { type: 'text', text: '更多 6 字节 Emoji (职业 + 性别): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍💻 👩‍💻 👨‍🎨 👩‍🎨 👨‍🚀 👩‍🚀 👨‍⚕️ 👩‍⚕️ ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍🏫 👩‍🏫 👨‍🌾 👩‍🌾 👨‍🔬 👩‍🔬' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-multi-bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#DDA0DD' }, content: { type: 'text', text: '多字节复杂 Emoji (Complex Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🏳️‍🌈 🏴‍☠️ 🏁‍☠️ ' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '(彩虹旗、海盗旗、带骷髅的旗)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-complex',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#DDA0DD' }, content: { type: 'text', text: '超复杂 Emoji 组合: ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍👩‍👧‍👦 🧑‍🤝‍🧑 🫂 👩‍❤️‍👨 👨‍❤️‍👨 ' } },
          { properties: { fontSize: 24 }, content: { type: 'text', text: '(完整家庭、手拉手、拥抱、情侣)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-hand-sequence',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#F39C12' }, content: { type: 'text', text: '手势组合 Emoji (Hand Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🙏 🙌 🤝 🤞 🤟 🤘 🤙 👌 👍 👎 ✊ ✋ 👊 🖐️ ✋' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-flags',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#3498DB' }, content: { type: 'text', text: '国旗 Emoji (Country Flags - 4 字节): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🇨🇳 🇺🇸 🇯🇵 🇰🇷 🇬🇧 🇫🇷 🇩🇪 🇮🇹 🇷🇺 🇨🇦 🇦🇺 🇧🇷 🇮🇳' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-zodiac',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24, bold: true, color: '#9B59B6' }, content: { type: 'text', text: '生肖 Emoji (Zodiac Signs): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🐭 🐮 🐯 🐰 🐲 🐍 🐴 🐑 🐵 🐔 🐶 🐷' } },
        ]
      } as Paragraph,
    ]
  }]
};

/** 段落样式示例数据 */
export const PARAGRAPH_STYLES_DOC: Document = {
  id: 'paragraph-styles-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Paragraph Indentation'),
      {
        id: 'p-indent-left',
        properties: { alignment: 'left', indentation: { left: 1000 } },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '左缩进 1000 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-first-line',
        properties: { alignment: 'left', indentation: { firstLine: 500 } },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '首行缩进 500 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-hanging',
        properties: { alignment: 'left', indentation: { hanging: 500 } },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '悬挂缩进 500 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-both',
        properties: { alignment: 'left', indentation: { left: 500, right: 500 } },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '左右各缩进 500 twips 的段落' }
        }]
      } as Paragraph,
      createSectionHeader('Paragraph Borders'),
      {
        id: 'p-border-all',
        properties: {
          alignment: 'left',
          borders: {
            'w:top': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' },
            'w:bottom': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' },
            'w:left': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' },
            'w:right': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' }
          }
        },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '带四边边框的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-border-top-bottom',
        properties: {
          alignment: 'left',
          borders: {
            'w:top': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' },
            'w:bottom': { 'w:val': 'single', 'w:size': 4, 'w:space': 0, 'w:color': 'auto' }
          }
        },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '只带上下边边框的段落' }
        }]
      } as Paragraph,
      createSectionHeader('Paragraph Shading'),
      {
        id: 'p-shading-light',
        properties: { alignment: 'left', shading: '#F0F0F0' },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '带浅灰色底纹的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-shading-colorful',
        properties: { alignment: 'left', shading: '#E0F7FA' },
        children: [{
          properties: { fontSize: 24, color: '#006064' },
          content: { type: 'text', text: '带青色底纹和深青色文字的段落' }
        }]
      } as Paragraph,
      createSectionHeader('Combined Paragraph Styles'),
      {
        id: 'p-combined',
        properties: {
          alignment: 'left',
          indentation: { left: 500, firstLine: 300 },
          borders: {
            'w:top': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' },
            'w:bottom': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' }
          },
          shading: '#FFF3E0'
        },
        children: [{
          properties: { fontSize: 24 },
          content: { type: 'text', text: '组合了缩进、边框和底纹的段落' }
        }]
      } as Paragraph
    ]
  }]
};

/** 全量示例数据 */
export const FULL_DOC: Document = {
  id: 'full-doc',
  sections: [{
    properties: {},
    children: [
      // 1. 标题
      ...TITLE_DOC.sections[0].children,

      // 2. 基础文本样式
      ...BASIC_STYLES_DOC.sections[0].children,

      // 3. 字体管理 (映射与回退)
      ...FONTS_DOC.sections[0].children,

      // 4. Emoji 支持
      ...EMOJI_DOC.sections[0].children,

      // 5. 自动换行
      ...WORD_WRAP_DOC.sections[0].children,

      // 6. 段落样式
      ...PARAGRAPH_STYLES_DOC.sections[0].children,
    ]
  }]
};
