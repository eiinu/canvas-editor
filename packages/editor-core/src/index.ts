import type { 
  OperationEnvelope, 
  Paragraph, 
  Run, 
  TextContent,
  ParagraphProperties,
  RunProperties 
} from '@eiinu/editor-protocol';

export * from './renderer.js';

export interface EditorCoreBootstrapResult {
  initialized: true;
  acceptedOperationTypes: string[];
}

export const bootstrapEditorCore = (
  _operations: OperationEnvelope[] = []
): EditorCoreBootstrapResult => {
  // 暂时不处理 operations
  void _operations;
  return {
    initialized: true,
    acceptedOperationTypes: ['insert_text', 'delete_range', 'set_mark']
  };
};

/**
 * 文档模型工厂函数
 */
export const ModelFactory = {
  /**
   * 创建一个新的运行块 (Run)
   */
  createRun(text: string, properties: RunProperties = {}): Run {
    return {
      properties,
      content: {
        type: 'text',
        text,
      } as TextContent,
    };
  },

  /**
   * 创建一个空的段落 (Paragraph)
   */
  createParagraph(id: string, properties: ParagraphProperties = {}): Paragraph {
    return {
      id,
      properties,
      children: [],
    };
  },

  /**
   * 创建一个包含初始文本的段落
   */
  createParagraphWithText(id: string, text: string, pPr: ParagraphProperties = {}, rPr: RunProperties = {}): Paragraph {
    const p = this.createParagraph(id, pPr);
    if (text) {
      p.children.push(this.createRun(text, rPr));
    }
    return p;
  }
};
