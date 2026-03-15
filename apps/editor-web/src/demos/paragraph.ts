import { Document, Paragraph } from '@eiinu/editor-protocol';

/**
 * 辅助函数：创建功能模块标题
 */
export const createSectionHeader = (title: string): Paragraph => ({
  id: `header-${title.replace(/\s+/g, '-').toLowerCase()}`,
  properties: { alignment: 'left', spacing: { before: 400, after: 200 } },
  children: [
    {
      properties: { fontSize: 32, bold: true, color: '#312E81', underline: 'single' },
      content: { type: 'text', text: `Section: ${title}` }
    }
  ]
} as Paragraph);

/** 段落示例数据 */
export const PARAGRAPH_DOC: Document = {
  id: 'paragraph-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Paragraph Styles'),
      {
        id: 'p-title',
        properties: { alignment: 'center', spacing: { after: 600 } },
        children: [{
          properties: { fontSize: 60, bold: true, color: '#4F46E5' },
          content: { type: 'text', text: 'EIINU Editor (Elegant Objects)' }
        }]
      } as Paragraph,
      createSectionHeader('Paragraph Indentation'),
      {
        id: 'p-indent-left',
        properties: { alignment: 'left', indentation: { left: 1000 } },
        children: [{
          properties: { fontSize: 32 },
          content: { type: 'text', text: '左缩进 1000 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-first-line',
        properties: { alignment: 'left', indentation: { firstLine: 500 } },
        children: [{
          properties: { fontSize: 32 },
          content: { type: 'text', text: '首行缩进 500 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-hanging',
        properties: { alignment: 'left', indentation: { hanging: 500 } },
        children: [{
          properties: { fontSize: 32 },
          content: { type: 'text', text: '悬挂缩进 500 twips 的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-indent-both',
        properties: { alignment: 'left', indentation: { left: 500, right: 500 } },
        children: [{
          properties: { fontSize: 32 },
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
          properties: { fontSize: 32 },
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
          properties: { fontSize: 32 },
          content: { type: 'text', text: '只带上下边边框的段落' }
        }]
      } as Paragraph,
      createSectionHeader('Paragraph Shading'),
      {
        id: 'p-shading-light',
        properties: { alignment: 'left', shading: '#F0F0F0' },
        children: [{
          properties: { fontSize: 32 },
          content: { type: 'text', text: '带浅灰色底纹的段落' }
        }]
      } as Paragraph,
      {
        id: 'p-shading-colorful',
        properties: { alignment: 'left', shading: '#E0F7FA' },
        children: [{
          properties: { fontSize: 32, color: '#006064' },
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
          properties: { fontSize: 32 },
          content: { type: 'text', text: '组合了缩进、边框和底纹的段落' }
        }]
      } as Paragraph
    ]
  }]
};
