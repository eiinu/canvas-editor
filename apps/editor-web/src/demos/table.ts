import type { Document, Table } from "@eiinu/editor-protocol";
import { createSectionHeader } from "./paragraph";

/** 表格示例数据 */
export const TABLE_DOC: Document = {
  id: "table-doc",
  sections: [
    {
      properties: {},
      children: [
        createSectionHeader("Table Examples"),

        // 表格宽度属性示例
        createSectionHeader("Table Width - Small"),
        {
          id: "table-width-small",
          properties: {
            width: 3000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 1000 }, { width: 1000 }, { width: 1000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-width-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Small Table" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-1-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Width: 3000" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-1-3",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Demo" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Width - Medium"),
        {
          id: "table-width-medium",
          properties: {
            width: 6000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-width-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Medium Table" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Width: 6000" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-2-3",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Demo" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Width - Large"),
        {
          id: "table-width-large",
          properties: {
            width: 9000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 3000 }, { width: 3000 }, { width: 3000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-width-3-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Large Table" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-3-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Width: 9000" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-width-3-3",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Demo" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 表格对齐属性示例
        createSectionHeader("Table Alignment - Left"),
        {
          id: "table-align-left",
          properties: {
            width: 4000,
            alignment: "left",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-align-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Left Aligned" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-align-1-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Table" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Alignment - Center"),
        {
          id: "table-align-center",
          properties: {
            width: 4000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-align-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Center Aligned" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-align-2-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Table" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Alignment - Right"),
        {
          id: "table-align-right",
          properties: {
            width: 4000,
            alignment: "right",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-align-3-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Right Aligned" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-align-3-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Table" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 表格边框属性示例
        createSectionHeader("Table Borders - Thin"),
        {
          id: "table-border-thin",
          properties: {
            width: 5000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 1, space: 0, color: "auto" },
              bottom: { val: "single", size: 1, space: 0, color: "auto" },
              left: { val: "single", size: 1, space: 0, color: "auto" },
              right: { val: "single", size: 1, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2500 }, { width: 2500 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-border-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Thin Border" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-border-1-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Size: 1" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Borders - Medium"),
        {
          id: "table-border-medium",
          properties: {
            width: 5000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 3, space: 0, color: "auto" },
              bottom: { val: "single", size: 3, space: 0, color: "auto" },
              left: { val: "single", size: 3, space: 0, color: "auto" },
              right: { val: "single", size: 3, space: 0, color: "auto" },
              insideH: { val: "single", size: 2, space: 0, color: "auto" },
              insideV: { val: "single", size: 2, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2500 }, { width: 2500 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-border-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Medium Border" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-border-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Size: 3" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        createSectionHeader("Table Borders - Thick"),
        {
          id: "table-border-thick",
          properties: {
            width: 5000,
            alignment: "center",
            borders: {
              top: { val: "double", size: 6, space: 0, color: "auto" },
              bottom: { val: "double", size: 6, space: 0, color: "auto" },
              left: { val: "double", size: 6, space: 0, color: "auto" },
              right: { val: "double", size: 6, space: 0, color: "auto" },
              insideH: { val: "single", size: 2, space: 0, color: "auto" },
              insideV: { val: "single", size: 2, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2500 }, { width: 2500 }],
          },
          rows: [
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-border-3-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Thick Border" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-border-3-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Double Size: 6" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 行高属性示例
        createSectionHeader("Row Height - Different Heights"),
        {
          id: "table-row-height",
          properties: {
            width: 6000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 3000 }, { width: 3000 }],
          },
          rows: [
            {
              properties: { height: 600 },
              cells: [
                {
                  children: [
                    {
                      id: "cell-row-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Row Height" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-row-1-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Value" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 400 },
              cells: [
                {
                  children: [
                    {
                      id: "cell-row-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Short Row" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-row-2-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "400" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 800 },
              cells: [
                {
                  children: [
                    {
                      id: "cell-row-3-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Tall Row" },
                        },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-row-3-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "800" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 单元格底纹属性示例
        createSectionHeader("Cell Shading - Colorful Cells"),
        {
          id: "table-cell-shading",
          properties: {
            width: 6000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  properties: { shading: "#E3F2FD" },
                  children: [
                    {
                      id: "cell-shading-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Blue" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#E8F5E8" },
                  children: [
                    {
                      id: "cell-shading-1-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Green" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#FFF3E0" },
                  children: [
                    {
                      id: "cell-shading-1-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Orange" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  properties: { shading: "#F3E5F5" },
                  children: [
                    {
                      id: "cell-shading-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Purple" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#E0F7FA" },
                  children: [
                    {
                      id: "cell-shading-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Cyan" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#FCE4EC" },
                  children: [
                    {
                      id: "cell-shading-2-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Light Pink" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 单元格边距属性示例
        createSectionHeader("Cell Margins - Small vs Large"),
        {
          id: "table-cell-margins",
          properties: {
            width: 6000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 3000 }, { width: 3000 }],
          },
          rows: [
            {
              cells: [
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-margin-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Small Margins" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 200, top: 100, right: 200, bottom: 100 } },
                  children: [
                    {
                      id: "cell-margin-1-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Large Margins" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-margin-2-1",
                      properties: { alignment: "left" },
                      children: [
                        {
                          properties: { fontSize: 16 },
                          content: {
                            type: "text",
                            text: "This cell has small margins. Content is close to the borders.",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 200, top: 100, right: 200, bottom: 100 } },
                  children: [
                    {
                      id: "cell-margin-2-2",
                      properties: { alignment: "left" },
                      children: [
                        {
                          properties: { fontSize: 16 },
                          content: {
                            type: "text",
                            text: "This cell has large margins. Content is spaced away from the borders.",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 单元格合并属性示例
        createSectionHeader("Cell Merging - GridSpan"),
        {
          id: "table-cell-merged",
          properties: {
            width: 6000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 2, space: 0, color: "auto" },
              bottom: { val: "single", size: 2, space: 0, color: "auto" },
              left: { val: "single", size: 2, space: 0, color: "auto" },
              right: { val: "single", size: 2, space: 0, color: "auto" },
              insideH: { val: "single", size: 1, space: 0, color: "auto" },
              insideV: { val: "single", size: 1, space: 0, color: "auto" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              cells: [
                {
                  properties: { gridSpan: 3, shading: "#E3F2FD" },
                  children: [
                    {
                      id: "cell-merged-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 24 },
                          content: { type: "text", text: "Merged Header Cell" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  properties: { shading: "#F5F5F5" },
                  children: [
                    {
                      id: "cell-merged-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Column 1" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { gridSpan: 2, shading: "#F5F5F5" },
                  children: [
                    {
                      id: "cell-merged-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Merged Columns 2-3" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              cells: [
                {
                  children: [
                    {
                      id: "cell-merged-3-1",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Row 1" } },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-merged-3-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Data 1" } },
                      ],
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: "cell-merged-3-3",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 20 }, content: { type: "text", text: "Data 2" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 混合使用多个属性的表格示例
        createSectionHeader("Mixed Table Properties"),
        {
          id: "table-mixed-1",
          properties: {
            width: 7000,
            alignment: "center",
            borders: {
              top: { val: "double", size: 4, space: 0, color: "#4CAF50" },
              bottom: { val: "double", size: 4, space: 0, color: "#4CAF50" },
              left: { val: "double", size: 4, space: 0, color: "#4CAF50" },
              right: { val: "double", size: 4, space: 0, color: "#4CAF50" },
              insideH: { val: "single", size: 2, space: 0, color: "#4CAF50" },
              insideV: { val: "single", size: 2, space: 0, color: "#4CAF50" },
            },
          },
          grid: {
            columns: [{ width: 2500 }, { width: 2500 }, { width: 2000 }],
          },
          rows: [
            {
              properties: { height: 800 },
              cells: [
                {
                  properties: { gridSpan: 3, shading: "#E8F5E8", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-mixed-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 28, color: "#2E7D32" },
                          content: { type: "text", text: "Employee Information" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 600 },
              cells: [
                {
                  properties: { shading: "#C8E6C9", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-mixed-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 22, color: "#2E7D32" },
                          content: { type: "text", text: "Name" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#C8E6C9", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-mixed-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 22, color: "#2E7D32" },
                          content: { type: "text", text: "Department" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#C8E6C9", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-mixed-2-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 22, color: "#2E7D32" },
                          content: { type: "text", text: "Salary" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 500 },
              cells: [
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-3-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "John Doe" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-3-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Engineering" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-3-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20, bold: true, color: "#1976D2" },
                          content: { type: "text", text: "$85,000" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 500 },
              cells: [
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-4-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Jane Smith" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-4-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20 },
                          content: { type: "text", text: "Marketing" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 100, top: 50, right: 100, bottom: 50 } },
                  children: [
                    {
                      id: "cell-mixed-4-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 20, bold: true, color: "#1976D2" },
                          content: { type: "text", text: "$75,000" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,

        // 复杂表格布局示例
        createSectionHeader("Complex Table Layout"),
        {
          id: "table-complex",
          properties: {
            width: 8000,
            alignment: "center",
            borders: {
              top: { val: "single", size: 3, space: 0, color: "#333333" },
              bottom: { val: "single", size: 3, space: 0, color: "#333333" },
              left: { val: "single", size: 3, space: 0, color: "#333333" },
              right: { val: "single", size: 3, space: 0, color: "#333333" },
              insideH: { val: "single", size: 1, space: 0, color: "#666666" },
              insideV: { val: "single", size: 1, space: 0, color: "#666666" },
            },
          },
          grid: {
            columns: [{ width: 2000 }, { width: 2000 }, { width: 2000 }, { width: 2000 }],
          },
          rows: [
            {
              properties: { height: 700 },
              cells: [
                {
                  properties: { gridSpan: 4, shading: "#F5F5F5", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-complex-1-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 28, color: "#333333" },
                          content: { type: "text", text: "Quarterly Sales Report" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 500 },
              cells: [
                {
                  properties: { gridSpan: 2, shading: "#E0E0E0", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-complex-2-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Product" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { gridSpan: 2, shading: "#E0E0E0", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-complex-2-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Sales Figures" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 400 },
              cells: [
                {
                  properties: { shading: "#FAFAFA" },
                  children: [
                    {
                      id: "cell-complex-3-1",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 18 }, content: { type: "text", text: "Q1" } },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#FAFAFA" },
                  children: [
                    {
                      id: "cell-complex-3-2",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 18 }, content: { type: "text", text: "Q2" } },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#FAFAFA" },
                  children: [
                    {
                      id: "cell-complex-3-3",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 18 }, content: { type: "text", text: "Q3" } },
                      ],
                    },
                  ],
                },
                {
                  properties: { shading: "#FAFAFA" },
                  children: [
                    {
                      id: "cell-complex-3-4",
                      properties: { alignment: "center" },
                      children: [
                        { properties: { fontSize: 18 }, content: { type: "text", text: "Q4" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 500 },
              cells: [
                {
                  properties: {
                    gridSpan: 2,
                    margin: { left: 100, top: 50, right: 100, bottom: 50 },
                  },
                  children: [
                    {
                      id: "cell-complex-4-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Product A" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-complex-4-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 18, color: "#4CAF50" },
                          content: { type: "text", text: "$120,000" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-complex-4-4",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 18, color: "#4CAF50" },
                          content: { type: "text", text: "$150,000" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 500 },
              cells: [
                {
                  properties: {
                    gridSpan: 2,
                    margin: { left: 100, top: 50, right: 100, bottom: 50 },
                  },
                  children: [
                    {
                      id: "cell-complex-5-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 20 },
                          content: { type: "text", text: "Product B" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-complex-5-3",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 18, color: "#2196F3" },
                          content: { type: "text", text: "$95,000" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { margin: { left: 50, top: 50, right: 50, bottom: 50 } },
                  children: [
                    {
                      id: "cell-complex-5-4",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { fontSize: 18, color: "#2196F3" },
                          content: { type: "text", text: "$110,000" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: { height: 600 },
              cells: [
                {
                  properties: { gridSpan: 2, shading: "#E3F2FD", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-complex-6-1",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 22 },
                          content: { type: "text", text: "Total" },
                        },
                      ],
                    },
                  ],
                },
                {
                  properties: { gridSpan: 2, shading: "#E3F2FD", verticalAlignment: "center" },
                  children: [
                    {
                      id: "cell-complex-6-2",
                      properties: { alignment: "center" },
                      children: [
                        {
                          properties: { bold: true, fontSize: 24, color: "#FF5722" },
                          content: { type: "text", text: "$475,000" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as Table,
      ],
    },
  ],
};
