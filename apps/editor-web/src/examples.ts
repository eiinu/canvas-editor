/**
 * OpenXML 示例片段集合
 * 按功能进行拆分，方便演示与测试
 */

export const XML_HEADER = `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>`;

export const XML_FOOTER = `  </w:body>
</w:document>`;

/** 标题片段 */
export const TITLE_EXAMPLE = `
    <!-- 标题：居中、大字号、加粗、紫色 -->
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="48"/>
          <w:b/>
          <w:color w:val="4F46E5"/>
        </w:rPr>
        <w:t>EIINU Editor (Standard OpenXML)</w:t>
      </w:r>
    </w:p>
`;

/** 基础文本样式片段 */
export const BASIC_STYLES_EXAMPLE = `
    <!-- 基础样式演示：左对齐 -->
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
      </w:pPr>
      <w:r>
        <w:rPr><w:sz w:val="24"/></w:rPr>
        <w:t>基础样式：</w:t>
      </w:r>
      <w:r>
        <w:rPr><w:sz w:val="24"/><w:b/></w:rPr>
        <w:t>加粗 (Bold)</w:t>
      </w:r>
      <w:r>
        <w:rPr><w:sz w:val="24"/><w:i/></w:rPr>
        <w:t>，斜体 (Italic)</w:t>
      </w:r>
      <w:r>
        <w:rPr><w:sz w:val="24"/><w:u/></w:rPr>
        <w:t>，下划线 (Underline)</w:t>
      </w:r>
      <w:r>
        <w:rPr><w:sz w:val="24"/><w:strike/></w:rPr>
        <w:t>，删除线 (Strike)</w:t>
      </w:r>
    </w:p>
`;

/** 颜色与字号演示片段 */
export const COLOR_AND_SIZE_EXAMPLE = `
    <!-- 颜色与字号：右对齐 -->
    <w:p>
      <w:pPr>
        <w:jc w:val="right"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="32"/>
          <w:color w:val="FF0000"/>
        </w:rPr>
        <w:t>红色 16pt 文本</w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:sz w:val="20"/>
          <w:color w:val="0000FF"/>
        </w:rPr>
        <w:t>，蓝色 10pt 文本</w:t>
      </w:r>
    </w:p>
`;

/** 自动换行演示片段 */
export const WORD_WRAP_EXAMPLE = `
    <!-- 自动换行演示 -->
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
          <w:color w:val="666666"/>
        </w:rPr>
        <w:t>这是一段测试长文本自动换行逻辑的内容。无论你输入的文字有多长，Canvas 渲染引擎都会根据右侧容器的宽度自动将其切分为多行显示，并保持正确的行间距和对齐方式。你可以尝试拖拽中间的分割线来观察排版的变化。</w:t>
      </w:r>
    </w:p>
`;

/** 默认拼接后的完整示例 */
export const DEFAULT_FULL_XML = [
  XML_HEADER,
  TITLE_EXAMPLE,
  BASIC_STYLES_EXAMPLE,
  COLOR_AND_SIZE_EXAMPLE,
  WORD_WRAP_EXAMPLE,
  XML_FOOTER
].join('\n');
