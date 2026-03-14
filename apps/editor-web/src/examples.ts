import { Document, Paragraph } from '@eiinu/editor-protocol';

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
        properties: { alignment: 'center' },
        children: [{
          properties: { fontSize: 48, bold: true, color: '#4F46E5' },
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
      {
        id: 'p-styles',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 24 }, content: { type: 'text', text: '基础样式：' } },
          { properties: { fontSize: 24, bold: true }, content: { type: 'text', text: '加粗 (Bold)' } },
          { properties: { fontSize: 24, italic: true }, content: { type: 'text', text: '，斜体 (Italic)' } },
          { properties: { fontSize: 24, underline: 'single' }, content: { type: 'text', text: '，下划线 (Underline)' } },
          { properties: { fontSize: 24, strike: true }, content: { type: 'text', text: '，删除线 (Strike)' } }
        ]
      } as Paragraph
    ]
  }]
};

/** 颜色与字号示例数据 */
export const COLOR_AND_SIZE_DOC: Document = {
  id: 'color-doc',
  sections: [{
    properties: {},
    children: [
      {
        id: 'p-colors',
        properties: { alignment: 'right' },
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
      } as Paragraph
    ]
  }]
};

/** 字体回退演示示例数据 */
export const FONT_FALLBACK_DOC: Document = {
  id: 'font-fallback-doc',
  sections: [{
    properties: {},
    children: [
      {
        id: 'p-fallback-title',
        properties: { alignment: 'center' },
        children: [{ properties: { fontSize: 36, bold: true }, content: { type: 'text', text: '跨平台字体回退演示' } }]
      } as Paragraph,
      {
        id: 'p-fallback-desc',
        properties: { alignment: 'left' },
        children: [{ properties: { fontSize: 24 }, content: { type: 'text', text: '即便在没有安装对应字体的系统上，编辑器也会自动映射到相似的本地字体：' } }]
      } as Paragraph,
      {
        id: 'p-fallback-ms-yahei',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'Microsoft YaHei' }, content: { type: 'text', text: '1. 微软雅黑 (Microsoft YaHei) -> macOS 下映射为 萍方' } }
        ]
      } as Paragraph,
      {
        id: 'p-fallback-simsun',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'SimSun' }, content: { type: 'text', text: '2. 宋体 (SimSun) -> macOS 下映射为 华文宋体' } }
        ]
      } as Paragraph,
      {
        id: 'p-fallback-kaiti',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'KaiTi' }, content: { type: 'text', text: '3. 楷体 (KaiTi) -> macOS 下映射为 华文楷体' } }
        ]
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
      ...TITLE_DOC.sections[0].children,
      ...BASIC_STYLES_DOC.sections[0].children,
      ...COLOR_AND_SIZE_DOC.sections[0].children,
      ...FONTS_DOC.sections[0].children,
      ...FONT_FALLBACK_DOC.sections[0].children,
      ...WORD_WRAP_DOC.sections[0].children
    ]
  }]
};
