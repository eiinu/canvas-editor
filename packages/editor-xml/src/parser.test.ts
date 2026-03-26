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
});
