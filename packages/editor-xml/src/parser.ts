import { XMLParser } from 'fast-xml-parser';
import { 
  Document, 
  Paragraph, 
  Run, 
  RunProperties, 
  ParagraphProperties,
  TextContent 
} from '@eiinu/editor-protocol';
import { XmlConverter } from './index.js';

/**
 * 实现基础的 XML 转换器
 */
export class BasicXmlConverter implements XmlConverter {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
      removeNSPrefix: false, // 保留 w: 这种命名空间前缀，因为用户要求完全一致
    });
  }

  toXml(_doc: Document): string {
    return 'Not implemented';
  }

  fromXml(xml: string): Document {
    try {
      const jsonObj = this.parser.parse(xml);
      
      // 处理命名空间前缀 w: (常用在 OpenXML)
      const getVal = (obj: any, key: string) => {
        return obj[key] || obj[`w:${key}`];
      };

      const root = jsonObj['w:document'] || jsonObj.document || jsonObj;
      const body = getVal(root, 'body') || root;
      const sections = [];
      const paragraphs: Paragraph[] = [];
      
      const rawPs = Array.isArray(getVal(body, 'p')) ? getVal(body, 'p') : (getVal(body, 'p') ? [getVal(body, 'p')] : []);
      
      rawPs.forEach((p: any, idx: number) => {
        const pPr = getVal(p, 'pPr') || {};
        const jc = getVal(pPr, 'jc');
        
        const pProps: ParagraphProperties = {
          alignment: jc?.val || jc?.['w:val'] || 'left',
        };

        const runs: Run[] = [];
        const rawRs = Array.isArray(getVal(p, 'r')) ? getVal(p, 'r') : (getVal(p, 'r') ? [getVal(p, 'r')] : []);
        
        rawRs.forEach((r: any) => {
          const rPr = getVal(r, 'rPr') || {};
          const sz = getVal(rPr, 'sz');
          const b = getVal(rPr, 'b');
          const i = getVal(rPr, 'i');
          const u = getVal(rPr, 'u');
          const color = getVal(rPr, 'color');

          const rProps: RunProperties = {
            fontSize: sz ? parseInt(sz.val || sz['w:val']) : 24, // 默认 12pt (24 half-points)
            bold: b !== undefined,
            italic: i !== undefined,
            underline: u !== undefined,
            color: color ? `#${color.val || color['w:val']}` : undefined,
          };

          const t = getVal(r, 't');
          const text = typeof t === 'string' ? t : (t?.['#text'] || t?.['w:t'] || '');
          
          runs.push({
            properties: rProps,
            content: {
              type: 'text',
              text: String(text),
            } as TextContent,
          });
        });

        paragraphs.push({
          id: `p-${idx}`,
          properties: pProps,
          children: runs,
        });
      });

      sections.push({
        properties: {},
        children: paragraphs,
      });

      return {
        id: 'doc-1',
        sections,
      };
    } catch (e) {
      console.error('XML Parse Error:', e);
      return { id: 'error', sections: [] };
    }
  }
}
