import { XMLParser, XMLBuilder } from "fast-xml-parser";
import type {
  Document,
  Paragraph,
  Run,
  RunProperties,
  ParagraphProperties,
  TextContent,
  MathContent,
  Table,
  TableRow,
  TableCell,
} from "@eiinu/editor-protocol";
import type { XmlConverter } from "./index.js";

/**
 * 实现基础的 XML 转换器
 */
export class BasicXmlConverter implements XmlConverter {
  private parser: XMLParser;
  private builder: XMLBuilder;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      allowBooleanAttributes: true,
      removeNSPrefix: false,
    });
    this.builder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      format: true,
      suppressEmptyNode: true,
    });
  }

  /**
   * 将 Document 模型转换为标准 OpenXML 字符串
   */
  toXml(doc: Document): string {
    const body: any = {};
    const elements: any[] = [];

    doc.sections.forEach((section) => {
      section.children.forEach((element) => {
        if ("children" in element && !("rows" in element)) {
          // 处理段落
          const p = element as Paragraph;
          const pPr: any = {};
          if (p.properties.alignment) {
            pPr["w:jc"] = { "w:val": p.properties.alignment };
          }
          if (p.properties.indentation) {
            const ind: any = {};
            if (p.properties.indentation.left !== undefined)
              ind["w:left"] = p.properties.indentation.left;
            if (p.properties.indentation.right !== undefined)
              ind["w:right"] = p.properties.indentation.right;
            if (p.properties.indentation.firstLine !== undefined)
              ind["w:firstLine"] = p.properties.indentation.firstLine;
            if (p.properties.indentation.hanging !== undefined)
              ind["w:hanging"] = p.properties.indentation.hanging;
            pPr["w:ind"] = ind;
          }
          if (p.properties.spacing) {
            const spacing: any = {};
            if (p.properties.spacing.before !== undefined)
              spacing["w:before"] = p.properties.spacing.before;
            if (p.properties.spacing.after !== undefined)
              spacing["w:after"] = p.properties.spacing.after;
            if (p.properties.spacing.line !== undefined)
              spacing["w:line"] = p.properties.spacing.line;
            if (p.properties.spacing.lineRule)
              spacing["w:lineRule"] = p.properties.spacing.lineRule;
            pPr["w:spacing"] = spacing;
          }
          if (p.properties.borders) {
            pPr["w:pBdr"] = p.properties.borders;
          }
          if (p.properties.shading) {
            pPr["w:shd"] = {
              "w:val": "clear",
              "w:color": "auto",
              "w:fill": p.properties.shading.replace("#", ""),
            };
          }

          const textRuns: any[] = [];
          const mathRuns: any[] = [];

          p.children.forEach((r) => {
            const rPr: any = {};
            const props = r.properties;

            // 处理字体 (优先使用 fonts 集合)
            if (props.fonts) {
              const rFonts: any = {};
              if (props.fonts.ascii) rFonts["w:ascii"] = props.fonts.ascii;
              if (props.fonts.eastAsia) rFonts["w:eastAsia"] = props.fonts.eastAsia;
              if (props.fonts.hAnsi) rFonts["w:hAnsi"] = props.fonts.hAnsi;
              if (props.fonts.cs) rFonts["w:cs"] = props.fonts.cs;
              if (props.fonts.hint) rFonts["w:hint"] = props.fonts.hint;
              rPr["w:rFonts"] = rFonts;
            } else if (props.fontFamily) {
              rPr["w:rFonts"] = {
                "w:ascii": props.fontFamily,
                "w:hAnsi": props.fontFamily,
                "w:eastAsia": props.fontFamily,
              };
            }

            if (props.fontSize) rPr["w:sz"] = { "w:val": props.fontSize };
            if (props.bold) rPr["w:b"] = {};
            if (props.italic) rPr["w:i"] = {};
            if (props.underline) {
              const u: any = {
                "w:val":
                  props.underlineType ||
                  (typeof props.underline === "string" ? props.underline : "single"),
              };
              if (props.underlineColor) {
                u["w:color"] = props.underlineColor.replace("#", "");
              }
              rPr["w:u"] = u;
            }
            if (props.strike) rPr["w:strike"] = {};
            if (props.doubleStrike) rPr["w:dstrike"] = {};
            if (props.vertAlign && props.vertAlign !== "baseline") {
              rPr["w:vertAlign"] = { "w:val": props.vertAlign };
            }
            if (props.caps) rPr["w:caps"] = {};
            if (props.smallCaps) rPr["w:smallCaps"] = {};
            if (props.highlight) rPr["w:highlight"] = { "w:val": props.highlight };
            if (props.shading)
              rPr["w:shd"] = {
                "w:val": "clear",
                "w:color": "auto",
                "w:fill": props.shading.replace("#", ""),
              };
            if (props.shadow) rPr["w:shadow"] = {};
            if (props.outline) rPr["w:outline"] = {};
            if (props.emboss) rPr["w:emboss"] = {};
            if (props.imprint) rPr["w:imprint"] = {};
            if (props.letterSpacing) rPr["w:spacing"] = { "w:val": props.letterSpacing };
            if (props.vanish) rPr["w:vanish"] = {};
            if (props.color) rPr["w:color"] = { "w:val": props.color.replace("#", "") };

            if (r.content.type === "math") {
              const math = r.content as MathContent;
              mathRuns.push({
                "m:r": {
                  "m:t": math.text,
                },
              });
            } else {
              textRuns.push({
                "w:rPr": Object.keys(rPr).length > 0 ? rPr : undefined,
                "w:t": (r.content as TextContent).text,
              });
            }
          });

          elements.push({
            "w:p": {
              "w:pPr": Object.keys(pPr).length > 0 ? pPr : undefined,
              ...(textRuns.length > 0 ? { "w:r": textRuns } : {}),
              ...(mathRuns.length > 0 ? { "m:oMath": mathRuns } : {}),
            },
          });
        } else if ("rows" in element) {
          // 处理表格
          const table = element as Table;
          const tblPr: any = {};
          if (table.properties.width) {
            tblPr["w:tblW"] = { "w:val": table.properties.width, "w:type": "dxa" };
          }
          if (table.properties.alignment) {
            tblPr["w:jc"] = { "w:val": table.properties.alignment };
          }
          if (table.properties.borders) {
            tblPr["w:tblBorders"] = table.properties.borders;
          }
          if (table.properties.shading) {
            tblPr["w:shd"] = {
              "w:val": "clear",
              "w:color": "auto",
              "w:fill": table.properties.shading.replace("#", ""),
            };
          }
          if (table.properties.caption) {
            tblPr["w:tblCaption"] = { "w:val": table.properties.caption };
          }
          if (table.properties.description) {
            tblPr["w:tblDescription"] = { "w:val": table.properties.description };
          }
          if (table.properties.look) {
            tblPr["w:tblLook"] = { "w:val": table.properties.look };
          }
          if (table.properties.indent) {
            tblPr["w:tblInd"] = { "w:val": table.properties.indent, "w:type": "dxa" };
          }
          if (table.properties.rowBandSize) {
            tblPr["w:tblStyleRowBandSize"] = { "w:val": table.properties.rowBandSize };
          }
          if (table.properties.colBandSize) {
            tblPr["w:tblStyleColBandSize"] = { "w:val": table.properties.colBandSize };
          }

          const tblGrid = table.grid
            ? {
                "w:gridCol": table.grid.columns.map((col) => ({
                  "w:w": { "w:val": col.width },
                })),
              }
            : undefined;

          const rows = table.rows.map((row) => {
            const trPr: any = {};
            if (row.properties?.height) {
              trPr["w:trHeight"] = {
                "w:val": row.properties.height,
                "w:hRule": row.properties.heightRule || "auto",
              };
            }
            if (row.properties?.cantSplit) {
              trPr["w:cantSplit"] = {};
            }
            if (row.properties?.header) {
              trPr["w:tblHeader"] = {};
            }

            const cells = row.cells.map((cell) => {
              const tcPr: any = {};
              if (cell.properties?.width) {
                tcPr["w:tcW"] = {
                  "w:val": cell.properties.width,
                  "w:type": cell.properties.widthType || "dxa",
                };
              }
              if (cell.properties?.gridSpan) {
                tcPr["w:gridSpan"] = { "w:val": cell.properties.gridSpan };
              }
              if (cell.properties?.vMerge) {
                tcPr["w:vMerge"] = { "w:val": cell.properties.vMerge };
              }
              if (cell.properties?.verticalAlignment) {
                tcPr["w:vAlign"] = { "w:val": cell.properties.verticalAlignment };
              }
              if (cell.properties?.borders) {
                tcPr["w:tcBorders"] = cell.properties.borders;
              }
              if (cell.properties?.shading) {
                tcPr["w:shd"] = {
                  "w:val": "clear",
                  "w:color": "auto",
                  "w:fill": cell.properties.shading.replace("#", ""),
                };
              }
              if (cell.properties?.fitText) {
                tcPr["w:tcFitText"] = {};
              }
              if (cell.properties?.noWrap) {
                tcPr["w:noWrap"] = {};
              }
              if (cell.properties?.hideMark) {
                tcPr["w:hideMark"] = {};
              }

              const cellChildren: any[] = [];
              cell.children.forEach((child) => {
                if ("children" in child && !("rows" in child)) {
                  // 处理单元格内的段落
                  const p = child as Paragraph;
                  const pPr: any = {};
                  if (p.properties.alignment) {
                    pPr["w:jc"] = { "w:val": p.properties.alignment };
                  }
                  // 其他段落属性...

                  cellChildren.push({
                    "w:pPr": Object.keys(pPr).length > 0 ? pPr : undefined,
                    "w:r": p.children
                      .filter((r) => r.content.type !== "math")
                      .map((r) => ({
                        "w:rPr": {}, // 简化处理
                        "w:t": (r.content as TextContent).text,
                      })),
                    "m:oMath": p.children
                      .filter((r) => r.content.type === "math")
                      .map((r) => ({
                        "m:r": { "m:t": (r.content as MathContent).text },
                      })),
                  });
                }
              });

              return {
                "w:tcPr": Object.keys(tcPr).length > 0 ? tcPr : undefined,
                ...(cellChildren.length > 0 ? { "w:p": cellChildren } : {}),
              };
            });

            return {
              "w:trPr": Object.keys(trPr).length > 0 ? trPr : undefined,
              "w:tc": cells,
            };
          });

          elements.push({
            "w:tbl": {
              "w:tblPr": Object.keys(tblPr).length > 0 ? tblPr : undefined,
              "w:tblGrid": tblGrid,
              "w:tr": rows,
            },
          });
        }
      });
    });

    // 构建 body 对象
    elements.forEach((element) => {
      const key = Object.keys(element)[0];
      if (!body[key]) {
        body[key] = [];
      }
      body[key].push(element[key]);
    });

    const xmlObj = {
      "w:document": {
        "@xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        "@xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
        "w:body": body,
      },
    };

    return this.builder.build(xmlObj);
  }

  private extractTextFromMathNode(node: any): string {
    if (node == null) return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map((item) => this.extractTextFromMathNode(item)).join("");

    const directText = node["m:t"] || node.t || node["#text"];
    if (typeof directText === "string") return directText;

    return Object.values(node)
      .map((value) => this.extractTextFromMathNode(value))
      .join("");
  }

  fromXml(xml: string): Document {
    try {
      const jsonObj = this.parser.parse(xml);

      // 处理命名空间前缀 w: (常用在 OpenXML)
      const getVal = (obj: any, key: string) => {
        if (!obj) return undefined;
        return obj[key] || obj[`w:${key}`];
      };

      const root = jsonObj["w:document"] || jsonObj.document || jsonObj;
      const body = getVal(root, "body") || root;
      const sections = [];
      const elements: (Paragraph | Table)[] = [];

      // 处理段落
      const rawPs = Array.isArray(getVal(body, "p"))
        ? getVal(body, "p")
        : getVal(body, "p")
          ? [getVal(body, "p")]
          : [];

      rawPs.forEach((p: any, idx: number) => {
        const pPr = getVal(p, "pPr") || {};
        const jc = getVal(pPr, "jc");
        const ind = getVal(pPr, "ind");
        const spacing = getVal(pPr, "spacing");
        const pBdr = getVal(pPr, "pBdr");
        const shd = getVal(pPr, "shd");

        const pProps: ParagraphProperties = {
          alignment: jc?.val || jc?.["w:val"] || "left",
          indentation: ind
            ? {
                left: ind.left || ind["w:left"] ? parseInt(ind.left || ind["w:left"]) : undefined,
                right:
                  ind.right || ind["w:right"] ? parseInt(ind.right || ind["w:right"]) : undefined,
                firstLine:
                  ind.firstLine || ind["w:firstLine"]
                    ? parseInt(ind.firstLine || ind["w:firstLine"])
                    : undefined,
                hanging:
                  ind.hanging || ind["w:hanging"]
                    ? parseInt(ind.hanging || ind["w:hanging"])
                    : undefined,
              }
            : undefined,
          spacing: spacing
            ? {
                before:
                  spacing.before || spacing["w:before"]
                    ? parseInt(spacing.before || spacing["w:before"])
                    : undefined,
                after:
                  spacing.after || spacing["w:after"]
                    ? parseInt(spacing.after || spacing["w:after"])
                    : undefined,
                line:
                  spacing.line || spacing["w:line"]
                    ? parseInt(spacing.line || spacing["w:line"])
                    : undefined,
                lineRule: spacing.lineRule || spacing["w:lineRule"] || undefined,
              }
            : undefined,
          borders: pBdr || undefined,
          shading: shd ? `#${shd.fill || shd["w:fill"]}` : undefined,
        };

        const runs: Run[] = [];
        const rawRs = Array.isArray(getVal(p, "r"))
          ? getVal(p, "r")
          : getVal(p, "r")
            ? [getVal(p, "r")]
            : [];
        const rawMath = Array.isArray(p["m:oMath"] || p.oMath || getVal(p, "oMath"))
          ? p["m:oMath"] || p.oMath || getVal(p, "oMath")
          : p["m:oMath"] || p.oMath || getVal(p, "oMath")
            ? [p["m:oMath"] || p.oMath || getVal(p, "oMath")]
            : [];
        const rawMathPara = Array.isArray(p["m:oMathPara"] || p.oMathPara)
          ? p["m:oMathPara"] || p.oMathPara
          : p["m:oMathPara"] || p.oMathPara
            ? [p["m:oMathPara"] || p.oMathPara]
            : [];

        rawRs.forEach((r: any) => {
          const rPr = getVal(r, "rPr") || {};
          const rFonts = getVal(rPr, "rFonts");
          const sz = getVal(rPr, "sz");
          const b = getVal(rPr, "b");
          const i = getVal(rPr, "i");
          const u = getVal(rPr, "u");
          const strike = getVal(rPr, "strike");
          const dstrike = getVal(rPr, "dstrike");
          const vertAlign = getVal(rPr, "vertAlign");
          const caps = getVal(rPr, "caps");
          const smallCaps = getVal(rPr, "smallCaps");
          const highlight = getVal(rPr, "highlight");
          const shading = getVal(rPr, "shd");
          const shadow = getVal(rPr, "shadow");
          const outline = getVal(rPr, "outline");
          const emboss = getVal(rPr, "emboss");
          const imprint = getVal(rPr, "imprint");
          const spacing = getVal(rPr, "spacing");
          const vanish = getVal(rPr, "vanish");
          const color = getVal(rPr, "color");

          const rProps: RunProperties = {
            fonts: rFonts
              ? {
                  ascii: rFonts.ascii || rFonts["w:ascii"] || rFonts.val || rFonts["w:val"],
                  eastAsia: rFonts.eastAsia || rFonts["w:eastAsia"],
                  hAnsi: rFonts.hAnsi || rFonts["w:hAnsi"],
                  cs: rFonts.cs || rFonts["w:cs"],
                  hint: rFonts.hint || rFonts["w:hint"],
                }
              : undefined,
            fontFamily: rFonts
              ? rFonts.ascii ||
                rFonts["w:ascii"] ||
                rFonts.eastAsia ||
                rFonts["w:eastAsia"] ||
                rFonts.val ||
                rFonts["w:val"]
              : undefined,
            fontSize: sz ? parseInt(sz.val || sz["w:val"]) : 24, // 默认 12pt (24 half-points)
            bold: b !== undefined,
            italic: i !== undefined,
            underline: u !== undefined,
            underlineType: u ? u.val || u["w:val"] || "single" : undefined,
            underlineColor:
              u && (u.color || u["w:color"]) ? `#${u.color || u["w:color"]}` : undefined,
            strike: strike !== undefined,
            doubleStrike: dstrike !== undefined,
            vertAlign: vertAlign ? vertAlign.val || vertAlign["w:val"] : "baseline",
            caps: caps !== undefined,
            smallCaps: smallCaps !== undefined,
            highlight: highlight ? highlight.val || highlight["w:val"] : undefined,
            shading: shading ? `#${shading.fill || shading["w:fill"]}` : undefined,
            shadow: shadow !== undefined,
            outline: outline !== undefined,
            emboss: emboss !== undefined,
            imprint: imprint !== undefined,
            letterSpacing: spacing ? parseInt(spacing.val || spacing["w:val"]) : undefined,
            vanish: vanish !== undefined,
            color: color ? `#${color.val || color["w:val"]}` : undefined,
          };

          const t = getVal(r, "t");
          const oMath = r["m:oMath"] || r.oMath || getVal(r, "oMath");

          if (oMath) {
            const mathText = this.extractTextFromMathNode(oMath);
            runs.push({
              properties: rProps,
              content: {
                type: "math",
                text: String(mathText),
              } as MathContent,
            });
          } else {
            const text = typeof t === "string" ? t : t?.["#text"] || t?.["w:t"] || "";

            runs.push({
              properties: rProps,
              content: {
                type: "text",
                text: String(text),
              } as TextContent,
            });
          }
        });

        const appendMathRun = (mathNode: any) => {
          const mathText = this.extractTextFromMathNode(mathNode);
          runs.push({
            properties: { fontSize: 24 },
            content: {
              type: "math",
              text: String(mathText),
            } as MathContent,
          });
        };

        rawMath.forEach((mathNode: any) => appendMathRun(mathNode));
        rawMathPara.forEach((mathParaNode: any) => {
          const oMathNodes = Array.isArray(mathParaNode?.["m:oMath"] || mathParaNode?.oMath)
            ? mathParaNode["m:oMath"] || mathParaNode.oMath
            : mathParaNode?.["m:oMath"] || mathParaNode?.oMath
              ? [mathParaNode["m:oMath"] || mathParaNode.oMath]
              : [];
          oMathNodes.forEach((mathNode: any) => appendMathRun(mathNode));
        });

        elements.push({
          id: `p-${idx}`,
          properties: pProps,
          children: runs,
        });
      });

      // 处理表格
      const rawTbls = Array.isArray(getVal(body, "tbl"))
        ? getVal(body, "tbl")
        : getVal(body, "tbl")
          ? [getVal(body, "tbl")]
          : [];

      rawTbls.forEach((tbl: any, idx: number) => {
        const tblPr = getVal(tbl, "tblPr") || {};
        const tblW = getVal(tblPr, "tblW");
        const jc = getVal(tblPr, "jc");
        const tblBorders = getVal(tblPr, "tblBorders");
        const shd = getVal(tblPr, "shd");
        const tblCaption = getVal(tblPr, "tblCaption");
        const tblDescription = getVal(tblPr, "tblDescription");
        const tblLook = getVal(tblPr, "tblLook");
        const tblInd = getVal(tblPr, "tblInd");
        const tblStyleRowBandSize = getVal(tblPr, "tblStyleRowBandSize");
        const tblStyleColBandSize = getVal(tblPr, "tblStyleColBandSize");

        const tblProps = {
          width: tblW ? parseInt(tblW.val || tblW["w:val"]) : undefined,
          alignment: jc ? jc.val || jc["w:val"] : undefined,
          borders: tblBorders || undefined,
          shading: shd ? `#${shd.fill || shd["w:fill"]}` : undefined,
          caption: tblCaption ? tblCaption.val || tblCaption["w:val"] : undefined,
          description: tblDescription ? tblDescription.val || tblDescription["w:val"] : undefined,
          look: tblLook ? tblLook.val || tblLook["w:val"] : undefined,
          indent: tblInd ? parseInt(tblInd.val || tblInd["w:val"]) : undefined,
          rowBandSize: tblStyleRowBandSize
            ? parseInt(tblStyleRowBandSize.val || tblStyleRowBandSize["w:val"])
            : undefined,
          colBandSize: tblStyleColBandSize
            ? parseInt(tblStyleColBandSize.val || tblStyleColBandSize["w:val"])
            : undefined,
        };

        // 处理表格网格
        const tblGrid = getVal(tbl, "tblGrid");
        const gridColumns = tblGrid
          ? {
              columns: Array.isArray(getVal(tblGrid, "gridCol"))
                ? getVal(tblGrid, "gridCol").map((col: any) => {
                    const w = getVal(col, "w");
                    return {
                      width: w ? parseInt(w.val || w["w:val"]) : 0,
                    };
                  })
                : [],
            }
          : undefined;

        // 处理表格行
        const rawRows = Array.isArray(getVal(tbl, "tr"))
          ? getVal(tbl, "tr")
          : getVal(tbl, "tr")
            ? [getVal(tbl, "tr")]
            : [];
        const rows: TableRow[] = [];

        rawRows.forEach((tr: any) => {
          const trPr = getVal(tr, "trPr") || {};
          const trHeight = getVal(trPr, "trHeight");
          const cantSplit = getVal(trPr, "cantSplit");
          const tblHeader = getVal(trPr, "tblHeader");

          const rowProps = {
            height: trHeight ? parseInt(trHeight.val || trHeight["w:val"]) : undefined,
            heightRule: trHeight ? trHeight.hRule || trHeight["w:hRule"] : undefined,
            cantSplit: cantSplit !== undefined,
            header: tblHeader !== undefined,
          };

          // 处理表格单元格
          const rawCells = Array.isArray(getVal(tr, "tc"))
            ? getVal(tr, "tc")
            : getVal(tr, "tc")
              ? [getVal(tr, "tc")]
              : [];
          const cells: TableCell[] = [];

          rawCells.forEach((tc: any) => {
            const tcPr = getVal(tc, "tcPr") || {};
            const tcW = getVal(tcPr, "tcW");
            const gridSpan = getVal(tcPr, "gridSpan");
            const vMerge = getVal(tcPr, "vMerge");
            const vAlign = getVal(tcPr, "vAlign");
            const tcBorders = getVal(tcPr, "tcBorders");
            const tcShd = getVal(tcPr, "shd");
            const tcFitText = getVal(tcPr, "tcFitText");
            const noWrap = getVal(tcPr, "noWrap");
            const hideMark = getVal(tcPr, "hideMark");

            const cellProps = {
              width: tcW ? parseInt(tcW.val || tcW["w:val"]) : undefined,
              widthType: tcW ? tcW.type || tcW["w:type"] : undefined,
              gridSpan: gridSpan ? parseInt(gridSpan.val || gridSpan["w:val"]) : undefined,
              vMerge: vMerge ? vMerge.val || vMerge["w:val"] : undefined,
              verticalAlignment: vAlign ? vAlign.val || vAlign["w:val"] : undefined,
              borders: tcBorders || undefined,
              shading: tcShd ? `#${tcShd.fill || tcShd["w:fill"]}` : undefined,
              fitText: tcFitText !== undefined,
              noWrap: noWrap !== undefined,
              hideMark: hideMark !== undefined,
            };

            // 处理单元格内的段落
            const cellChildren: (Paragraph | Table)[] = [];
            const cellPs = Array.isArray(getVal(tc, "p"))
              ? getVal(tc, "p")
              : getVal(tc, "p")
                ? [getVal(tc, "p")]
                : [];

            cellPs.forEach((cellP: any, cellPIdx: number) => {
              const cellPPr = getVal(cellP, "pPr") || {};
              const cellPJc = getVal(cellPPr, "jc");

              const cellPProps: ParagraphProperties = {
                alignment: cellPJc ? cellPJc.val || cellPJc["w:val"] : "left",
              };

              const cellRuns: Run[] = [];
              const cellRawRs = Array.isArray(getVal(cellP, "r"))
                ? getVal(cellP, "r")
                : getVal(cellP, "r")
                  ? [getVal(cellP, "r")]
                  : [];

              cellRawRs.forEach((cellR: any) => {
                const cellRT = getVal(cellR, "t");
                const cellRText =
                  typeof cellRT === "string" ? cellRT : cellRT?.["#text"] || cellRT?.["w:t"] || "";

                cellRuns.push({
                  properties: {},
                  content: {
                    type: "text",
                    text: String(cellRText),
                  } as TextContent,
                });
              });

              cellChildren.push({
                id: `cell-p-${idx}-${cellPIdx}`,
                properties: cellPProps,
                children: cellRuns,
              });
            });

            cells.push({
              properties: cellProps,
              children: cellChildren,
            });
          });

          rows.push({
            properties: rowProps,
            cells: cells,
          });
        });

        elements.push({
          id: `tbl-${idx}`,
          properties: tblProps,
          grid: gridColumns,
          rows: rows,
        });
      });

      sections.push({
        properties: {},
        children: elements,
      });

      return {
        id: "doc-1",
        sections,
      };
    } catch (e) {
      console.error("XML Parse Error:", e);
      return { id: "error", sections: [] };
    }
  }
}
