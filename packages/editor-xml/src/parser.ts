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
    });
  }

  toXml(_doc: Document): string {
    // 暂时不做反向转换
    return 'Not implemented';
  }

  fromXml(xml: string): Document {
    try {
      const jsonObj = this.parser.parse(xml);
      const root = jsonObj.document || jsonObj.w_document || jsonObj;
      
      const sections = [];
      
      // 处理 body 或直接处理内容
      const body = root.body || root;
      const paragraphs: Paragraph[] = [];
      
      const rawPs = Array.isArray(body.p) ? body.p : (body.p ? [body.p] : []);
      
      rawPs.forEach((p: any, idx: number) => {
        const pProps: ParagraphProperties = {
          alignment: p.alignment || (p.pPr?.jc) || 'left',
        };

        const runs: Run[] = [];
        const rawRs = Array.isArray(p.r) ? p.r : (p.r ? [p.r] : []);
        
        rawRs.forEach((r: any) => {
          const rProps: RunProperties = {
            fontSize: r.fontSize ? parseInt(r.fontSize) : (r.rPr?.sz ? parseInt(r.rPr.sz) : 24),
            bold: r.bold === 'true' || r.bold === true || !!r.rPr?.b,
            italic: r.italic === 'true' || r.italic === true || !!r.rPr?.i,
            underline: r.underline === 'true' || r.underline === true || !!r.rPr?.u,
            color: r.color || r.rPr?.color,
          };

          const text = typeof r === 'string' ? r : (r['#text'] || r.t || '');
          
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
