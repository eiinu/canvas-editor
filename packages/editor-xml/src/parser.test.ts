import { describe, expect, it } from "vite-plus/test";
import { BasicXmlConverter } from "./parser";

describe("BasicXmlConverter math support", () => {
  it("serializes math run into m:oMath", () => {
    const converter = new BasicXmlConverter();

    const xml = converter.toXml({
      id: "math-doc",
      sections: [
        {
          properties: {},
          children: [
            {
              id: "p-1",
              properties: {},
              children: [
                {
                  properties: { fontSize: 24 },
                  content: { type: "math", text: "x^2+y^2=z^2" },
                },
              ],
            },
          ],
        },
      ],
    });

    expect(xml).toContain("m:oMath");
    expect(xml).toContain("x^2+y^2=z^2");
    expect(xml).not.toContain("<w:r><m:oMath>");
  });

  it("serializes structured OMML when provided", () => {
    const converter = new BasicXmlConverter();
    const xml = converter.toXml({
      id: "math-doc-omml",
      sections: [
        {
          properties: {},
          children: [
            {
              id: "p-1",
              properties: {},
              children: [
                {
                  properties: { fontSize: 24 },
                  content: {
                    type: "math",
                    text: "x^(2)",
                    omml: {
                      "m:sSup": {
                        "m:e": { "m:r": { "m:t": "x" } },
                        "m:sup": { "m:r": { "m:t": "2" } },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    expect(xml).toContain("m:sSup");
    expect(xml).toContain("<m:t>x</m:t>");
    expect(xml).toContain("<m:t>2</m:t>");
  });

  it("parses m:oMath into math run", () => {
    const converter = new BasicXmlConverter();
    const xml = `<?xml version="1.0"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
  <w:body>
    <w:p>
      <m:oMath>
        <m:r>
          <m:t>e^{iπ}+1=0</m:t>
        </m:r>
      </m:oMath>
    </w:p>
  </w:body>
</w:document>`;

    const doc = converter.fromXml(xml);
    const paragraph = doc.sections[0].children[0];

    expect("children" in paragraph).toBe(true);
    if (!("children" in paragraph)) return;

    expect(paragraph.children[0].content.type).toBe("math");
    expect(paragraph.children[0].content).toMatchObject({
      type: "math",
      text: "e^{iπ}+1=0",
    });
  });

  it("parses superscript and fraction into readable linear form", () => {
    const converter = new BasicXmlConverter();
    const xml = `<?xml version="1.0"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
  <w:body>
    <w:p>
      <m:oMath>
        <m:sSup>
          <m:e><m:r><m:t>x</m:t></m:r></m:e>
          <m:sup><m:r><m:t>2</m:t></m:r></m:sup>
        </m:sSup>
      </m:oMath>
      <m:oMath>
        <m:f>
          <m:num><m:r><m:t>a+b</m:t></m:r></m:num>
          <m:den><m:r><m:t>c+d</m:t></m:r></m:den>
        </m:f>
      </m:oMath>
    </w:p>
  </w:body>
</w:document>`;

    const doc = converter.fromXml(xml);
    const paragraph = doc.sections[0].children[0];
    if (!("children" in paragraph)) return;

    expect(paragraph.children[0].content).toMatchObject({
      type: "math",
      text: "x^(2)",
    });
    expect(paragraph.children[1].content).toMatchObject({
      type: "math",
      text: "(a+b)/(c+d)",
    });
  });
});
