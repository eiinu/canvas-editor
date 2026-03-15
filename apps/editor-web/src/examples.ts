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
          { properties: { fontSize: 32 }, content: { type: 'text', text: '基础样式：' } },
          { properties: { fontSize: 32, bold: true }, content: { type: 'text', text: '加粗 (Bold)' } },
          { properties: { fontSize: 32, italic: true }, content: { type: 'text', text: '，斜体 (Italic)' } },
          { properties: { fontSize: 32, underline: 'single' }, content: { type: 'text', text: '，下划线 (Underline)' } },
          { properties: { fontSize: 32, underline: 'single', underlineColor: '#FF0000' }, content: { type: 'text', text: '，红色下划线' } },
          { properties: { fontSize: 32, strike: true }, content: { type: 'text', text: '，删除线 (Strike)' } },
          { properties: { fontSize: 32, doubleStrike: true }, content: { type: 'text', text: '，双删除线 (Double Strike)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: 'E=mc' } },
          { properties: { fontSize: 32, vertAlign: 'superscript' }, content: { type: 'text', text: '2' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '，H' } },
          { properties: { fontSize: 32, vertAlign: 'subscript' }, content: { type: 'text', text: '2' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: 'O' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 32, caps: true }, content: { type: 'text', text: 'all caps' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 32, smallCaps: true }, content: { type: 'text', text: 'Small Caps' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '，' } },
          { properties: { fontSize: 32, vanish: true }, content: { type: 'text', text: '你看不到我' } }
        ]
      } as Paragraph,
      createSectionHeader('Highlight & Spacing'),
      {
        id: 'p-highlight-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, highlight: '#FFFF00' }, content: { type: 'text', text: '黄色高亮' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, highlight: '#00FF00' }, content: { type: 'text', text: '绿色高亮' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, highlight: '#00FFFF' }, content: { type: 'text', text: '青色高亮' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, highlight: '#FF00FF', color: '#FFFFFF' }, content: { type: 'text', text: '粉色高亮+白字' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, highlight: '#333333', color: '#FFFFFF' }, content: { type: 'text', text: '深灰高亮+白字' } },
        ]
      } as Paragraph,
      {
        id: 'p-spacing-demo',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, letterSpacing: 40 }, content: { type: 'text', text: '紧凑间距 (40 twips)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '\n' } },
          { properties: { fontSize: 32, letterSpacing: 100 }, content: { type: 'text', text: '标准宽间距 (100 twips)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '\n' } },
          { properties: { fontSize: 32, letterSpacing: 300 }, content: { type: 'text', text: '超宽间距 (300 twips)' } },
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
              fontSize: 32, 
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
          { properties: { fontSize: 32, shading: '#E0E7FF' }, content: { type: 'text', text: '文字底纹 (Shading: Indigo 100)' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 32, shading: '#FEE2E2' }, content: { type: 'text', text: '粉色底纹 (Shading: Red 100)' } },
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
          { properties: { fontSize: 32 }, content: { type: 'text', text: '复杂组合：' } },
          { properties: { fontSize: 36, bold: true, color: '#FF0000', underline: 'single', underlineColor: '#0000FF' }, content: { type: 'text', text: '红字蓝线下划线' } },
          { properties: { fontSize: 32, vertAlign: 'superscript', bold: true, italic: true, color: '#006400' }, content: { type: 'text', text: '上标加粗斜体' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: ' 正常 ' } },
          { properties: { fontSize: 32, vertAlign: 'subscript', doubleStrike: true, color: '#A52A2A' }, content: { type: 'text', text: '下标双删除线' } },
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
        id: 'p-wrap-zh',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段中文长段落，用于测试自动换行功能。中文文本的换行处理相对简单，因为每个汉字的宽度基本相同，系统可以根据容器宽度自动计算换行位置。这段文本包含了足够的内容，以确保它会在画布上自动换行显示，从而验证自动换行算法的正确性。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-en',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'This is a long English paragraph for testing word wrap functionality. English text wrap is more complex because words have different lengths, and the system needs to break lines at word boundaries to maintain readability. This paragraph contains enough content to ensure it will wrap automatically on the canvas, thus verifying the correctness of the word wrap algorithm.' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-mixed',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段中英混合的长段落，用于测试混合文本的自动换行功能。This paragraph contains both Chinese and English text, which presents unique challenges for word wrap algorithms. 系统需要同时处理汉字和英文单词的换行，确保在适当的位置进行断行，以保持文本的可读性。这种混合文本的换行处理是排版系统的重要功能之一。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-justified',
        properties: { alignment: 'justify' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段两端对齐的中文长段落，用于测试两端对齐时的自动换行功能。两端对齐会调整单词之间的间距，使每行文本都能在左右边界同时对齐，从而产生更加整洁的视觉效果。这种对齐方式在正式文档中非常常见，需要特殊的换行和间距调整算法。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-center',
        properties: { alignment: 'center' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段居中对齐的中文长段落，用于测试居中对齐时的自动换行功能。居中对齐的文本会在每行的左右两侧留出相等的空白，使文本块在容器中居中显示。这种对齐方式常用于标题和强调性内容，需要特殊的换行计算。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-right',
        properties: { alignment: 'right' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段右对齐的中文长段落，用于测试右对齐时的自动换行功能。右对齐的文本会从容器的右侧边界开始向左排列，每行的右侧对齐，左侧可能会有不规则的空白。这种对齐方式常用于文档的日期、签名等部分。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-with-indent',
        properties: { alignment: 'left', indentation: { left: 200, firstLine: 100 } },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段带有缩进的中文长段落，用于测试缩进时的自动换行功能。缩进会影响文本的可用宽度，从而影响换行的位置。首行缩进和左缩进的组合使用可以创建更加结构化的文档布局，需要在换行计算中考虑这些因素。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-small-font',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 16, color: '#666666' },
          content: { type: 'text', text: '这是一段小字号的中文长段落，用于测试不同字号时的自动换行功能。字号的大小会影响每行能容纳的字符数量，从而影响换行的位置。系统需要根据当前使用的字体和字号来准确计算文本的宽度，以确保换行的正确性。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-large-font',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 40, color: '#666666' },
          content: { type: 'text', text: '这是一段大字号的中文长段落，用于测试大字号时的自动换行功能。大字号的文本每行能容纳的字符数量较少，换行会更加频繁。系统需要正确处理这种情况，确保文本能够在画布上完整显示。' }
        }]
      } as Paragraph,
      {
        id: 'p-wrap-special-chars',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '这是一段包含特殊字符的长段落，用于测试特殊字符对自动换行的影响。特殊字符如标点符号、数字、符号等可能会影响换行的位置，系统需要正确处理这些情况，以确保文本的可读性。例如，标点符号通常不应该出现在行首，数字和符号的处理也需要特殊考虑。' }
        }]
      } as Paragraph
    ]
  }]
};

/** 国际化多语言示例数据 */
export const INTERNATIONAL_DOC: Document = {
  id: 'international-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('International Languages'),
      {
        id: 'p-lang-zh',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '中文：这是一段中文文本，用于测试国际化多语言支持。中文是世界上使用人数最多的语言之一，拥有悠久的历史和丰富的文化。' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-en',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'English: This is an English text for testing international language support. English is a widely used language around the world, serving as a global lingua franca in many fields.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-es',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Español: Este es un texto en español para probar el soporte de idiomas internacionales. El español es hablado por más de 500 millones de personas en todo el mundo.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-ar',
        properties: { alignment: 'right' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'العربية: هذا نص بالعربية لاختبار دعم اللغات الدولية. العربية لغة رسمية في العديد من البلدان والمنظمات الدولية.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-hi',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'हिन्दी: यह अंतरराष्ट्रीय भाषा समर्थन का परीक्षण करने के लिए एक हिन्दी पाठ है। हिन्दी भारत की एक प्रमुख भाषा है और विश्व की सबसे अधिक बोली जाने वाली भाषाओं में से एक है।' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-bn',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'বাংলা: এটি আন্তর্জাতিক ভাষা সমর্থন পরীক্ষা করার জন্য একটি বাংলা পাঠ্য। বাংলা বাংলাদেশ এবং ভারতের পশ্চিম বাংলার মূল ভাষা হিসেবে ব্যবহৃত হয়।' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-pt',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Português: Este é um texto em português para testar o suporte a idiomas internacionais. O português é falado em vários países, incluindo Portugal, Brasil e Angola.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-ru',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Русский: Это русский текст для тестирования поддержки международных языков. Русский язык является одним из самых распространенных языков в мире.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-ja',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '日本語: これは国際言語サポートをテストするための日本語のテキストです。日本語は日本の公用語であり、世界中の多くの人々によって話されています。' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-de',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Deutsch: Dies ist ein deutscher Text zum Testen der internationalen Sprachunterstützung. Deutsch wird in Deutschland, Österreich, der Schweiz und anderen Ländern gesprochen.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-fr',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Français: Ceci est un texte français pour tester la prise en charge des langues internationales. Le français est une langue officielle dans de nombreux pays et organisations internationales.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-ko',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: '한국어: 이것은 국제 언어 지원을 테스트하기 위한 한국어 텍스트입니다. 한국어는 한국과 북한의 공용 언어이며, 전 세계적으로 많은 사람들이 사용하고 있습니다.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-it',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Italiano: Questo è un testo italiano per testare il supporto per le lingue internazionali. Litaliano è parlato in Italia, Svizzera e altre regioni dEuropa.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-tr',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Türkçe: Bu uluslararası dil desteğini test etmek için bir Türkçe metindir. Türkçe Türkiyenin resmi dili olup, başka ülkelerde de konuşulmaktadır.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-vi',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Tiếng Việt: Đây là một văn bản tiếng Việt để kiểm tra hỗ trợ đa ngôn ngữ quốc tế. Tiếng Việt là ngôn ngữ chính thức của Việt Nam.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-th',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'ไทย: นี่คือข้อความภาษาไทยเพื่อทดสอบการสนับสนุนภาษาสากล ไทยเป็นภาษาอังกฤษหลักของประเทศไทย' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-id',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Bahasa Indonesia: Ini adalah teks bahasa Indonesia untuk menguji dukungan bahasa internasional. Bahasa Indonesia adalah bahasa resmi Indonesia.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-ms',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Bahasa Melayu: Ini adalah teks Bahasa Melayu untuk menguji sokongan bahasa antarabangsa. Bahasa Melayu adalah bahasa rasmi Malaysia dan Brunei.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-fa',
        properties: { alignment: 'right' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'فارسی: این یک متن فارسی برای تست پشتیبانی زبان‌های بین‌المللی است. فارسی زبان رسمی ایران و بعضی از کشورهای دیگر است.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-he',
        properties: { alignment: 'right' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'עברית: זהו טקסט בעברית לבדיקת תמיכה בשפות בינלאומיות. עברית היא השפה הרשמית של ישראל.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-el',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Ελληνικά: Αυτό είναι ένα ελληνικό κείμενο για τη δοκιμή της υποστήριξης διεθνών γλωσσών. Τα ελληνικά είναι η επίσημη γλώσσα της Ελλάδας.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-nl',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Nederlands: Dit is een Nederlandse tekst om de ondersteuning van internationale talen te testen. Nederlands wordt gesproken in Nederland en België.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-sv',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Svenska: Detta är en svensk text för att testa stöd för internationella språk. Svenska är det officiella språket i Sverige.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-pl',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Polski: To jest tekst po polsku do testowania obsługi języków międzynarodowych. Polski jest oficjalnym językiem Polski.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-uk',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Українська: Це український текст для тестування підтримки міжнародних мов. Українська є офіційною мовою України.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-hu',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Magyar: Ez egy magyar szöveg a nemzetközi nyelvek támogatásának tesztelésére. A magyar Magyarország hivatalos nyelve.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-cs',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Čeština: Toto je český text pro testování podpory mezinárodních jazyků. Čeština je oficiálním jazykem České republiky.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-da',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Dansk: Dette er en dansk tekst til test af understøttelse af internationale sprog. Dansk er det officielle sprog i Danmark.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-fi',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Suomi: Tämä on suomalainen teksti testataakseen kansainvälisten kielten tukea. Suomi on Suomen virallinen kieli.' }
        }]
      } as Paragraph,
      {
        id: 'p-lang-no',
        properties: { alignment: 'left' },
        children: [{
          properties: { fontSize: 32, color: '#666666' },
          content: { type: 'text', text: 'Norsk: Dette er en norsk tekst for å teste støtte for internasjonale språk. Norsk er det offisielle språket i Norge.' }
        }]
      } as Paragraph
    ]
  }]
};

/** 段落对齐示例数据 */
export const ALIGNMENT_DOC: Document = {
  id: 'alignment-doc',
  sections: [{
    properties: {},
    children: [
      createSectionHeader('Paragraph Alignment'),
      {
        id: 'p-align-left',
        properties: { alignment: 'left', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' } } },
        children: [{
          properties: { fontSize: 32, color: '#FF6B6B' },
          content: { type: 'text', text: '左对齐 (Left Alignment): 这是一段左对齐的文本，默认情况下文本会从左边界开始排列。适用于大多数正常文档内容。' }
        }]
      } as Paragraph,
      {
        id: 'p-align-center',
        properties: { alignment: 'center', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' } } },
        children: [{
          properties: { fontSize: 32, color: '#4ECDC4' },
          content: { type: 'text', text: '居中对齐 (Center Alignment): 这是一段居中对齐的文本，文本会在容器中央显示。适用于标题、署名等需要突出显示的内容。' }
        }]
      } as Paragraph,
      {
        id: 'p-align-right',
        properties: { alignment: 'right', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' } } },
        children: [{
          properties: { fontSize: 32, color: '#95E1D3' },
          content: { type: 'text', text: '右对齐 (Right Alignment): 这是一段右对齐的文本，文本会从右边界开始排列。适用于签名、地址等需要右对齐的内容。' }
        }]
      } as Paragraph,
      {
        id: 'p-align-justify',
        properties: { alignment: 'justify', borders: { 'w:bottom': { 'w:val': 'single', 'w:size': 2, 'w:space': 0, 'w:color': 'auto' } } },
        children: [{
          properties: { fontSize: 32, color: '#DDA0DD' },
          content: { type: 'text', text: '两端对齐 (Justify Alignment): 这是一段两端对齐的文本，文本会在左右边界同时对齐，每行的宽度会自动调整以填满整个宽度。适用于正文段落，让页面看起来更加整洁和统一。' }
        }]
      } as Paragraph,
      createSectionHeader('Alignment with Indentation'),
      {
        id: 'p-align-left-indent',
        properties: { alignment: 'left', indentation: { left: 500 } },
        children: [{
          properties: { fontSize: 22 },
          content: { type: 'text', text: '左对齐 + 左缩进 500 twips：这是一段带缩进的左对齐文本。' }
        }]
      } as Paragraph,
      {
        id: 'p-align-center-indent',
        properties: { alignment: 'center', indentation: { left: 500, right: 500 } },
        children: [{
          properties: { fontSize: 22 },
          content: { type: 'text', text: '居中对齐 + 左右各缩进 500 twips：这是一段带缩进的居中对齐文本。' }
        }]
      } as Paragraph,
      createSectionHeader('Mixed Alignment'),
      {
        id: 'p-mixed-align-1',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 26, bold: true, color: '#FF6B6B' }, content: { type: 'text', text: '左' } },
          { properties: { fontSize: 20 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 26, bold: true, color: '#4ECDC4' }, content: { type: 'text', text: '居' } },
          { properties: { fontSize: 20 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 26, bold: true, color: '#95E1D3' }, content: { type: 'text', text: '右' } },
          { properties: { fontSize: 20 }, content: { type: 'text', text: ' ' } },
          { properties: { fontSize: 26, bold: true, color: '#DDA0DD' }, content: { type: 'text', text: '两' } },
        ]
      } as Paragraph,
      createSectionHeader('Practical Examples'),
      {
        id: 'p-title-example',
        properties: { alignment: 'center', spacing: { after: 300 } },
        children: [{
          properties: { fontSize: 48, bold: true, color: '#4F46E5' },
          content: { type: 'text', text: '标题示例' }
        }]
      } as Paragraph,
      {
        id: 'p-author-example',
        properties: { alignment: 'right', spacing: { after: 400 } },
        children: [{
          properties: { fontSize: 32, italic: true, color: '#666666' },
          content: { type: 'text', text: '作者：AI Assistant' }
        }]
      } as Paragraph,
      {
        id: 'p-content-example',
        properties: { alignment: 'justify', spacing: { after: 200 } },
        children: [{
          properties: { fontSize: 22 },
          content: { type: 'text', text: '这是一段正文内容，使用两端对齐方式。两端对齐会让文本在左右边界同时对齐，每行的宽度会自动调整。这种对齐方式在正式文档、书籍、报纸等排版中非常常见，因为它可以让页面看起来更加整齐、统一和专业。' }
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
          { properties: { fontSize: 32, fontFamily: 'Courier New' }, content: { type: 'text', text: 'Courier New: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Georgia' }, content: { type: 'text', text: 'Georgia: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Verdana' }, content: { type: 'text', text: 'Verdana: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Tahoma' }, content: { type: 'text', text: 'Tahoma: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Helvetica' }, content: { type: 'text', text: 'Helvetica: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Impact' }, content: { type: 'text', text: 'Impact: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Comic Sans MS' }, content: { type: 'text', text: 'Comic Sans MS: The quick brown fox jumps over the lazy dog.' } },
          { properties: { fontSize: 32, fontFamily: 'Arial Black' }, content: { type: 'text', text: 'Arial Black: The quick brown fox jumps over the lazy dog.' } }
        ]
      } as Paragraph,
      {
        id: 'p-fonts-zh',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, fontFamily: 'Microsoft YaHei' }, content: { type: 'text', text: '微软雅黑：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'SimSun' }, content: { type: 'text', text: '宋体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'KaiTi' }, content: { type: 'text', text: '楷体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'SimHei' }, content: { type: 'text', text: '黑体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'FangSong' }, content: { type: 'text', text: '仿宋：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'STSong' }, content: { type: 'text', text: '华文宋体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'STHeiti' }, content: { type: 'text', text: '华文黑体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'STKaiti' }, content: { type: 'text', text: '华文楷体：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'STFangsong' }, content: { type: 'text', text: '华文仿宋：前端开发是一个充满挑战的领域。' } },
          { properties: { fontSize: 32, fontFamily: 'PingFang SC' }, content: { type: 'text', text: '萍方：前端开发是一个充满挑战的领域。' } }
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
        children: [{ properties: { fontSize: 32, italic: true, color: '#666666' }, content: { type: 'text', text: '注：跨平台环境下，缺失字体将自动回退到系统相似字体（如 macOS 下微软雅黑回退至萍方）。' } }]
      } as Paragraph
    ]
  }]
};

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
          { properties: { fontSize: 32 }, content: { type: 'text', text: 'Emoji 不受全部大写影响 (Caps): ' } },
          { properties: { fontSize: 28, caps: true }, content: { type: 'text', text: 'Hello World 😊 你好世界' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-smallcaps',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: 'Emoji 不受小型大写影响 (Small Caps): ' } },
          { properties: { fontSize: 28, smallCaps: true }, content: { type: 'text', text: 'hello world 🎉 你好世界' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-spacing',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32 }, content: { type: 'text', text: 'Emoji 不应用字符间距 (Letter Spacing): ' } },
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
          { properties: { fontSize: 32 }, content: { type: 'text', text: '24pt: 😊 ' } },
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
          { properties: { fontSize: 32, bold: true, color: '#FF6B6B' }, content: { type: 'text', text: '2 字节 Emoji (Basic Unicode): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🎈 🎉 🎊 🎁 🎄 🎃 🎗️ 🎟️ 🎫 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-4bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#4ECDC4' }, content: { type: 'text', text: '4 字节 Emoji (With Skin Tone Modifiers): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👍🏻 👍🏼 👍🏽 👍🏾 👍🏿 ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '(浅色-中等-中等深色-深色-极深色)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-4bytes-more',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#4ECDC4' }, content: { type: 'text', text: '更多 4 字节 Emoji (Fitzpatrick Modifiers): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👋🏻 👋🏼 👋🏽 👋🏾 👋🏿 ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👌🏻 👌🏼 👌🏽 👌🏾 👌🏿 ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🙌🏻 🙌🏼 🙌🏽 🙌🏾 🙌🏿' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-6bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#95E1D3' }, content: { type: 'text', text: '6 字节 Emoji (Zero Width Joiner Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍👩‍👦 👨‍👩‍👧‍👦 👨‍👨‍👦 👩‍👩‍👧 ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '(家庭组合)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-6bytes-professions',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#95E1D3' }, content: { type: 'text', text: '更多 6 字节 Emoji (职业 + 性别): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍💻 👩‍💻 👨‍🎨 👩‍🎨 👨‍🚀 👩‍🚀 👨‍⚕️ 👩‍⚕️ ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍🏫 👩‍🏫 👨‍🌾 👩‍🌾 👨‍🔬 👩‍🔬' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-multi-bytes',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#DDA0DD' }, content: { type: 'text', text: '多字节复杂 Emoji (Complex Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🏳️‍🌈 🏴‍☠️ 🏁‍☠️ ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '(彩虹旗、海盗旗、带骷髅的旗)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-complex',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#DDA0DD' }, content: { type: 'text', text: '超复杂 Emoji 组合: ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '👨‍👩‍👧‍👦 🧑‍🤝‍🧑 🫂 👩‍❤️‍👨 👨‍❤️‍👨 ' } },
          { properties: { fontSize: 32 }, content: { type: 'text', text: '(完整家庭、手拉手、拥抱、情侣)' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-hand-sequence',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#F39C12' }, content: { type: 'text', text: '手势组合 Emoji (Hand Sequences): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🙏 🙌 🤝 🤞 🤟 🤘 🤙 👌 👍 👎 ✊ ✋ 👊 🖐️ ✋' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-flags',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#3498DB' }, content: { type: 'text', text: '国旗 Emoji (Country Flags - 4 字节): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🇨🇳 🇺🇸 🇯🇵 🇰🇷 🇬🇧 🇫🇷 🇩🇪 🇮🇹 🇷🇺 🇨🇦 🇦🇺 🇧🇷 🇮🇳' } },
        ]
      } as Paragraph,
      {
        id: 'p-emoji-zodiac',
        properties: { alignment: 'left' },
        children: [
          { properties: { fontSize: 32, bold: true, color: '#9B59B6' }, content: { type: 'text', text: '生肖 Emoji (Zodiac Signs): ' } },
          { properties: { fontSize: 28 }, content: { type: 'text', text: '🐭 🐮 🐯 🐰 🐲 🐍 🐴 🐑 🐵 🐔 🐶 🐷' } },
        ]
      } as Paragraph,
    ]
  }]
};



/** 全量示例数据 */
export const FULL_DOC: Document = {
  id: 'full-doc',
  sections: [{
    properties: {},
    children: [
      // 1. 段落
      ...PARAGRAPH_DOC.sections[0].children,

      // 2. 段落对齐
      ...ALIGNMENT_DOC.sections[0].children,

      // 3. 文本颜色渐变
      ...COLOR_GRADIENT_DOC.sections[0].children,

      // 4. 基础文本样式
      ...BASIC_STYLES_DOC.sections[0].children,

      // 5. 字体管理 (映射与回退)
      ...FONTS_DOC.sections[0].children,

      // 6. Emoji 支持
      ...EMOJI_DOC.sections[0].children,

      // 7. 自动换行
      ...WORD_WRAP_DOC.sections[0].children,

      // 8. 国际化多语言
      ...INTERNATIONAL_DOC.sections[0].children,
    ]
  }]
};
