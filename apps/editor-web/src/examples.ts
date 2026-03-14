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

      // 3. 颜色与字号
      ...COLOR_AND_SIZE_DOC.sections[0].children,

      // 4. 字体管理 (映射与回退)
      ...FONTS_DOC.sections[0].children,

      // 5. 自动换行
      ...WORD_WRAP_DOC.sections[0].children,
    ]
  }]
};
