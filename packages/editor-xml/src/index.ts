import { Document } from '@eiinu/editor-protocol';

/**
 * XML 转换器接口定义
 * 负责在编辑器的 OpenXML 风格数据模型与标准 XML 格式之间进行转换
 */
export interface XmlConverter {
  /**
   * 将编辑器文档模型转换为 XML 字符串
   * @param doc 编辑器文档模型
   * @returns 格式化后的 XML 字符串
   */
  toXml(doc: Document): string;

  /**
   * 将 XML 字符串解析为编辑器文档模型
   * @param xml XML 字符串内容
   * @returns 编辑器文档模型
   */
  fromXml(xml: string): Document;
}

/**
 * 默认转换配置项
 */
export interface XmlConvertOptions {
  /** 是否格式化输出 XML */
  pretty?: boolean;
  /** XML 声明头 */
  declaration?: boolean;
}

export * from './parser.js';
