import { Document, Paragraph } from '@eiinu/editor-protocol';
import { createSectionHeader } from './paragraph';

/** 文本颜色渐变示例数据 */
export const COLOR_GRADIENT_DOC: Document = {
  id: 'color-gradient-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Text Color Gradient'),
      createSectionHeader('Warm Colors (暖色系)'),
      {
        id: 'p-warm-gradient',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28, color: '#FF0000' }, content: { type: 'text', text: '红色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#FF4500' }, content: { type: 'text', text: '橙红色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#FF8C00' }, content: { type: 'text', text: '深橙色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#FFA500' }, content: { type: 'text', text: '橙色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#FFD700' }, content: { type: 'text', text: '金色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#FFFF00' }, content: { type: 'text', text: '黄色' } },
        ]
      } as Paragraph,
      createSectionHeader('Cool Colors (冷色系)'),
      {
        id: 'p-cool-gradient',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 28, color: '#00FF00' }, content: { type: 'text', text: '绿色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#00FFFF' }, content: { type: 'text', text: '青色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#00BFFF' }, content: { type: 'text', text: '天蓝色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#0000FF' }, content: { type: 'text', text: '蓝色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#800080' }, content: { type: 'text', text: '紫色' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: ' → ' } },
          { properties: { fontSize: 28, color: '#4B0082' }, content: { type: 'text', text: '靛蓝色' } },
        ]
      } as Paragraph,
      createSectionHeader('Rainbow Gradient (彩虹渐变)'),
      {
        id: 'p-rainbow-gradient',
        properties: { alignment: 'center' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#FF0000' }, content: { type: 'text', text: 'R' } },
          { properties: { fontSize: 32, bold: true, color: '#FF7F00' }, content: { type: 'text', text: 'A' } },
          { properties: { fontSize: 32, bold: true, color: '#FFFF00' }, content: { type: 'text', text: 'I' } },
          { properties: { fontSize: 32, bold: true, color: '#00FF00' }, content: { type: 'text', text: 'N' } },
          { properties: { fontSize: 32, bold: true, color: '#00BFFF' }, content: { type: 'text', text: 'B' } },
          { properties: { fontSize: 32, bold: true, color: '#4B0082' }, content: { type: 'text', text: 'O' } },
          { properties: { fontSize: 32, bold: true, color: '#9400D3' }, content: { type: 'text', text: 'W' } },
        ]
      } as Paragraph,
      createSectionHeader('Chinese Rainbow (中文彩虹)'),
      {
        id: 'p-chinese-rainbow',
        properties: { alignment: 'center' },
        children: [
          { properties: { fontSize: 36, bold: true, color: '#FF0000' }, content: { type: 'text', text: '彩' } },
          { properties: { fontSize: 36, bold: true, color: '#FF7F00' }, content: { type: 'text', text: '虹' } },
          { properties: { fontSize: 36, bold: true, color: '#FFFF00' }, content: { type: 'text', text: '文' } },
          { properties: { fontSize: 36, bold: true, color: '#00FF00' }, content: { type: 'text', text: '本' } },
          { properties: { fontSize: 36, bold: true, color: '#00BFFF' }, content: { type: 'text', text: '渐' } },
          { properties: { fontSize: 36, bold: true, color: '#4B0082' }, content: { type: 'text', text: '变' } },
        ]
      } as Paragraph,
      createSectionHeader('Monochromatic Gradients (单色渐变)'),
      {
        id: 'p-red-gradient',
        properties: { alignment: 'left', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 1, 'w:space': 0, 'w:color': 'auto' } } },
        children: [
          { properties: { fontSize: 32, color: '#FF0000' }, content: { type: 'text', text: '红色渐变：' } },
          { properties: { fontSize: 32, color: '#FF4040' }, content: { type: 'text', text: '深红' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, color: '#FF6B6B' }, content: { type: 'text', text: '中红' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, color: '#FF9999' }, content: { type: 'text', text: '浅红' } },
        ]
      } as Paragraph,
      {
        id: 'p-blue-gradient',
        properties: { alignment: 'left', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 1, 'w:space': 0, 'w:color': 'auto' } } },
        children: [
          { properties: { fontSize: 32, color: '#0000FF' }, content: { type: 'text', text: '蓝色渐变：' } },
          { properties: { fontSize: 32, color: '#1E90FF' }, content: { type: 'text', text: '深蓝' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, color: '#4169E1' }, content: { type: 'text', text: '中蓝' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, color: '#87CEEB' }, content: { type: 'text', text: '浅蓝' } },
        ]
      } as Paragraph,
      createSectionHeader('Color Temperature (色彩温度)'),
      {
        id: 'p-temperature-gradient',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 22, color: '#000080' }, content: { type: 'text', text: '冷色调' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' 🌊 ' } },
          { properties: { fontSize: 22, color: '#0000FF' }, content: { type: 'text', text: '蓝' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' 💧 ' } },
          { properties: { fontSize: 22, color: '#00FF00' }, content: { type: 'text', text: '绿' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' 🌿 ' } },
          { properties: { fontSize: 22, color: '#FFFF00' }, content: { type: 'text', text: '黄' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' ☀️ ' } },
          { properties: { fontSize: 22, color: '#FF8C00' }, content: { type: 'text', text: '橙' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' 🍂 ' } },
          { properties: { fontSize: 22, color: '#FF0000' }, content: { type: 'text', text: '红' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: ' 🔥 ' } },
          { properties: { fontSize: 22, color: '#8B0000' }, content: { type: 'text', text: '暖色调' } },
        ]
      } as Paragraph,
      createSectionHeader('Practical Color Combinations'),
      {
        id: 'p-title-colors',
        properties: { alignment: 'center', spacing: { after: 300 } },
        children: [{
          properties: { fontSize: 48, bold: true, color: '#4F46E5' },
          content: { type: 'text', text: '色彩在标题中的应用' }
        }]
      } as Paragraph,
      {
        id: 'p-subtitle-colors',
        properties: { alignment: 'center', spacing: { after: 400 } },
        children: [{
          properties: { fontSize: 28, italic: true, color: '#6B7280' },
          content: { type: 'text', text: '副标题通常使用较浅的颜色' }
        }]
      } as Paragraph,
      {
        id: 'p-emphasis-colors',
        properties: { alignment: 'left', spacing: { after: 200 } },
        children: [
          { properties: { fontSize: 22 }, content: { type: 'text', text: '普通的文本使用' } },
          { properties: { fontSize: 22, bold: true, color: '#DC2626' }, content: { type: 'text', text: '红色' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: '来强调重要内容，使用' } },
          { properties: { fontSize: 22, bold: true, color: '#059669' }, content: { type: 'text', text: '绿色' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: '表示成功，使用' } },
          { properties: { fontSize: 22, bold: true, color: '#2563EB' }, content: { type: 'text', text: '蓝色' } },
          { properties: { fontSize: 22 }, content: { type: 'text', text: '表示链接或信息。' } },
        ]
      } as Paragraph
    ]
  }]
};
