import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { CanvasRenderer } from '@eiinu/editor-core';
import { BasicXmlConverter } from '@eiinu/editor-xml';
import './styles.css';

const DEFAULT_XML = `<document>
  <p alignment="center">
    <r fontSize="48" bold="true">EIINU Editor</r>
  </p>
  <p alignment="left">
    <r fontSize="24">这是一个基于 Canvas 的富文本编辑器。</r>
    <r fontSize="24" color="#ff0000" italic="true">支持实时 XML 预览！</r>
  </p>
  <p alignment="right">
    <r fontSize="20" underline="true" color="#0000ff">右对齐文本示例</r>
  </p>
</document>`;

function App() {
  const [xmlCode, setXmlCode] = useState(DEFAULT_XML);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const converterRef = useRef(new BasicXmlConverter());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    rendererRef.current = new CanvasRenderer(ctx);
    renderEditor();
  }, []);

  useEffect(() => {
    renderEditor();
  }, [xmlCode]);

  const renderEditor = () => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    // 解析 XML
    const doc = converterRef.current.fromXml(xmlCode);

    // 渲染
    renderer.clear(canvas.width, canvas.height);
    
    let currentY = 100;
    doc.sections.forEach(section => {
      section.children.forEach(child => {
        if ('children' in child) { // Paragraph
          renderer.renderParagraph(child, 50, currentY, canvas.width - 100);
          currentY += 60; // 简单行高
        }
      });
    });
  };

  return (
    <div className="editor-container">
      {/* 左侧：XML 编辑器 */}
      <div className="left-panel">
        <div className="panel-header">
          <span>XML Editor (OpenXML Style)</span>
          <span style={{ fontSize: '12px', opacity: 0.6 }}>Real-time Sync</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <CodeMirror
            value={xmlCode}
            height="100%"
            theme="light"
            extensions={[xml()]}
            onChange={(value) => setXmlCode(value)}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
            }}
          />
        </div>
      </div>

      {/* 右侧：Canvas 预览 */}
      <div className="right-panel">
        <div className="panel-header">
          <span>Canvas Preview</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={renderEditor} style={{ fontSize: '12px', padding: '2px 8px', cursor: 'pointer' }}>
              Force Refresh
            </button>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '40px' }}>
          <div className="canvas-wrapper">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={1000} 
              style={{ width: '600px', height: '750px', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
