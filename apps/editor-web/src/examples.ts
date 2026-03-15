import { Document } from '@eiinu/editor-protocol';
import { PARAGRAPH_DOC } from './demos/paragraph';
import { ALIGNMENT_DOC } from './demos/alignment';
import { BASIC_STYLES_DOC } from './demos/basicStyles';
import { COLOR_GRADIENT_DOC } from './demos/colorGradient';
import { EMOJI_DOC } from './demos/emoji';
import { FONTS_DOC } from './demos/fonts';
import { INTERNATIONAL_DOC } from './demos/international';
import { TABLE_DOC } from './demos/table';
import { WORD_WRAP_DOC } from './demos/wordWrap';

/**
 * OpenXML 示例数据集合
 * 使用标准的 Document 对象定义，不再使用字符串拼接
 */

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

      // 9. 表格
      ...TABLE_DOC.sections[0].children,
    ]
  }]
};

// 导出所有示例文档
export { PARAGRAPH_DOC, ALIGNMENT_DOC, BASIC_STYLES_DOC, COLOR_GRADIENT_DOC, EMOJI_DOC, FONTS_DOC, INTERNATIONAL_DOC, TABLE_DOC, WORD_WRAP_DOC };
