import { XMLParser, XMLBuilder } from 'fast-xml-parser';
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
  private builder: XMLBuilder;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
      removeNSPrefix: false,
    });
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      format: true,
      suppressEmptyNode: true,
    });
  }

  /**
   * 将 Document 模型转换为标准 OpenXML 字符串
   */
  toXml(doc: Document): string {
    const body: any = {
      'w:p': doc.sections.flatMap(section => 
        section.children.map(p => {
          if (!('children' in p)) return null; // 暂时只支持 Paragraph

          const pPr: any = {};
          if (p.properties.alignment) {
            pPr['w:jc'] = { 'w:val': p.properties.alignment };
          }
          if (p.properties.spacing) {
            const spacing: any = {};
            if (p.properties.spacing.before !== undefined) spacing['w:before'] = p.properties.spacing.before;
            if (p.properties.spacing.after !== undefined) spacing['w:after'] = p.properties.spacing.after;
            if (p.properties.spacing.line !== undefined) spacing['w:line'] = p.properties.spacing.line;
            if (p.properties.spacing.lineRule) spacing['w:lineRule'] = p.properties.spacing.lineRule;
            pPr['w:spacing'] = spacing;
          }

          return {
            'w:pPr': Object.keys(pPr).length > 0 ? pPr : undefined,
            'w:r': p.children.map(r => {
              const rPr: any = {};
              const props = r.properties;
              
              // 处理字体 (优先使用 fonts 集合)
              if (props.fonts) {
                const rFonts: any = {};
                if (props.fonts.ascii) rFonts['w:ascii'] = props.fonts.ascii;
                if (props.fonts.eastAsia) rFonts['w:eastAsia'] = props.fonts.eastAsia;
                if (props.fonts.hAnsi) rFonts['w:hAnsi'] = props.fonts.hAnsi;
                if (props.fonts.cs) rFonts['w:cs'] = props.fonts.cs;
                if (props.fonts.hint) rFonts['w:hint'] = props.fonts.hint;
                rPr['w:rFonts'] = rFonts;
              } else if (props.fontFamily) {
                rPr['w:rFonts'] = { 
                  'w:ascii': props.fontFamily, 
                  'w:hAnsi': props.fontFamily, 
                  'w:eastAsia': props.fontFamily 
                };
              }

              if (props.fontSize) rPr['w:sz'] = { 'w:val': props.fontSize };
              if (props.bold) rPr['w:b'] = {};
              if (props.italic) rPr['w:i'] = {};
              if (props.underline) {
                const u: any = { 'w:val': typeof props.underline === 'string' ? props.underline : 'single' };
                if (props.underlineColor) {
                  u['w:color'] = props.underlineColor.replace('#', '');
                }
                rPr['w:u'] = u;
              }
              if (props.strike) rPr['w:strike'] = {};
              if (props.doubleStrike) rPr['w:dstrike'] = {};
              if (props.vertAlign && props.vertAlign !== 'baseline') {
                rPr['w:vertAlign'] = { 'w:val': props.vertAlign };
              }
              if (props.caps) rPr['w:caps'] = {};
              if (props.smallCaps) rPr['w:smallCaps'] = {};
              if (props.highlight) rPr['w:highlight'] = { 'w:val': props.highlight };
              if (props.shading) rPr['w:shd'] = { 'w:val': 'clear', 'w:color': 'auto', 'w:fill': props.shading.replace('#', '') };
              if (props.shadow) rPr['w:shadow'] = {};
              if (props.outline) rPr['w:outline'] = {};
              if (props.emboss) rPr['w:emboss'] = {};
              if (props.imprint) rPr['w:imprint'] = {};
              if (props.letterSpacing) rPr['w:spacing'] = { 'w:val': props.letterSpacing };
              if (props.vanish) rPr['w:vanish'] = {};
              if (props.color) rPr['w:color'] = { 'w:val': props.color.replace('#', '') };

              return {
                'w:rPr': Object.keys(rPr).length > 0 ? rPr : undefined,
                'w:t': (r.content as TextContent).text,
              };
            }),
          };
        }).filter(Boolean)
      ),
    };

    const xmlObj = {
      'w:document': {
        '@xmlns:w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'w:body': body,
      },
    };

    return this.builder.build(xmlObj);
  }

  fromXml(xml: string): Document {
    try {
      const jsonObj = this.parser.parse(xml);
      
      // 处理命名空间前缀 w: (常用在 OpenXML)
      const getVal = (obj: any, key: string) => {
        if (!obj) return undefined;
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
        const spacing = getVal(pPr, 'spacing');
        
        const pProps: ParagraphProperties = {
          alignment: jc?.val || jc?.['w:val'] || 'left',
          spacing: spacing ? {
            before: spacing.before || spacing['w:before'] ? parseInt(spacing.before || spacing['w:before']) : undefined,
            after: spacing.after || spacing['w:after'] ? parseInt(spacing.after || spacing['w:after']) : undefined,
            line: spacing.line || spacing['w:line'] ? parseInt(spacing.line || spacing['w:line']) : undefined,
            lineRule: spacing.lineRule || spacing['w:lineRule'] || undefined,
          } : undefined,
        };

        const runs: Run[] = [];
        const rawRs = Array.isArray(getVal(p, 'r')) ? getVal(p, 'r') : (getVal(p, 'r') ? [getVal(p, 'r')] : []);
        
        rawRs.forEach((r: any) => {
          const rPr = getVal(r, 'rPr') || {};
          const rFonts = getVal(rPr, 'rFonts');
          const sz = getVal(rPr, 'sz');
          const b = getVal(rPr, 'b');
          const i = getVal(rPr, 'i');
          const u = getVal(rPr, 'u');
          const strike = getVal(rPr, 'strike');
          const dstrike = getVal(rPr, 'dstrike');
          const vertAlign = getVal(rPr, 'vertAlign');
          const caps = getVal(rPr, 'caps');
          const smallCaps = getVal(rPr, 'smallCaps');
          const highlight = getVal(rPr, 'highlight');
          const shading = getVal(rPr, 'shd');
          const shadow = getVal(rPr, 'shadow');
          const outline = getVal(rPr, 'outline');
          const emboss = getVal(rPr, 'emboss');
          const imprint = getVal(rPr, 'imprint');
          const spacing = getVal(rPr, 'spacing');
          const vanish = getVal(rPr, 'vanish');
          const color = getVal(rPr, 'color');

          const rProps: RunProperties = {
            fonts: rFonts ? {
              ascii: rFonts.ascii || rFonts['w:ascii'] || rFonts.val || rFonts['w:val'],
              eastAsia: rFonts.eastAsia || rFonts['w:eastAsia'],
              hAnsi: rFonts.hAnsi || rFonts['w:hAnsi'],
              cs: rFonts.cs || rFonts['w:cs'],
              hint: rFonts.hint || rFonts['w:hint'],
            } : undefined,
            fontFamily: rFonts ? (rFonts.ascii || rFonts['w:ascii'] || rFonts.eastAsia || rFonts['w:eastAsia'] || rFonts.val || rFonts['w:val']) : undefined,
            fontSize: sz ? parseInt(sz.val || sz['w:val']) : 24, // 默认 12pt (24 half-points)
            bold: b !== undefined,
            italic: i !== undefined,
            underline: u !== undefined,
            underlineColor: u && (u.color || u['w:color']) ? `#${u.color || u['w:color']}` : undefined,
            strike: strike !== undefined,
              doubleStrike: dstrike !== undefined,
              vertAlign: vertAlign ? (vertAlign.val || vertAlign['w:val']) : 'baseline',
              caps: caps !== undefined,
              smallCaps: smallCaps !== undefined,
              highlight: highlight ? (highlight.val || highlight['w:val']) : undefined,
              shading: shading ? `#${shading.fill || shading['w:fill']}` : undefined,
              shadow: shadow !== undefined,
              outline: outline !== undefined,
              emboss: emboss !== undefined,
              imprint: imprint !== undefined,
              letterSpacing: spacing ? parseInt(spacing.val || spacing['w:val']) : undefined,
              vanish: vanish !== undefined,
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
