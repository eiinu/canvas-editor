import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { CanvasRenderer, ModelFactory } from '@eiinu/editor-core';
import { BasicXmlConverter } from '@eiinu/editor-xml';
import './styles.css';

const DEFAULT_XML = `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="48"/>
          <w:b/>
          <w:color w:val="4F46E5"/>
        </w:rPr>
        <w:t>EIINU Editor (Real OpenXML)</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
        </w:rPr>
        <w:t>这是一个完全兼容 OOXML 标签格式的实时预览。</w:t>
      </w:r>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
          <w:color w:val="FF0000"/>
          <w:i/>
        </w:rPr>
        <w:t>支持 w:p, w:r, w:t, w:pPr, w:rPr 等标准标签！</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
          <w:color w:val="666666"/>
        </w:rPr>
        <w:t>这是一段非常长的文本，用来测试自动换行功能。在 Canvas 渲染器中，我们需要根据指定的 maxWidth 自动计算文本的宽度，并在合适的字符位置进行截断，将文本流分配到多个行（Line）中进行绘制。只有实现了自动换行，编辑器才能处理长篇大论的文档内容。</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:pPr>
        <w:jc w:val="right"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:sz w:val="24"/>
          <w:u w:val="single"/>
          <w:color w:val="0000FF"/>
        </w:rPr>
        <w:t>右对齐且带有下划线</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>`;

function App() {
  const [xmlCode, setXmlCode] = useState(DEFAULT_XML);
  const [debouncedXml, setDebouncedXml] = useState(DEFAULT_XML);
  const [zoom, setZoom] = useState(1);
  const [leftWidth, setLeftWidth] = useState(window.innerWidth * 0.3);
  const [isDragging, setIsDragging] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const converterRef = useRef(new BasicXmlConverter());

  // 实现防抖逻辑
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedXml(xmlCode);
    }, 500); // 停止编辑 500ms 后更新渲染内容

    return () => clearTimeout(timer);
  }, [xmlCode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < window.innerWidth - 200) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    rendererRef.current = new CanvasRenderer(ctx, { 
      dpr: window.devicePixelRatio,
      zoom: zoom 
    });
    renderEditor();
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.updateScale({ zoom });
    }
    renderEditor();
  }, [debouncedXml, zoom]);

  const renderEditor = () => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    // 解析防抖后的 XML
    const doc = converterRef.current.fromXml(debouncedXml);

    // 设置画布尺寸 (逻辑尺寸 800x1000)
    const logicalWidth = 800;
    const logicalHeight = 1000;
    renderer.setDimensions(logicalWidth, logicalHeight);

    // 渲染
    renderer.clear(logicalWidth, logicalHeight);
    
    let currentY = 100;
    doc.sections.forEach(section => {
      section.children.forEach(child => {
        if ('children' in child) { // Paragraph
          const el = ModelFactory.createElement(child);
          currentY = renderer.renderElement(el, 50, currentY, logicalWidth - 100);
          currentY += 20; // 段落间距
        }
      });
    });
  };

  return (
    <div className="editor-container">
      {/* 左侧：XML 编辑器 */}
      <div className="left-panel" style={{ width: `${leftWidth}px` }}>
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

      {/* 中间拖拽条 */}
      <div 
        className={`resizer ${isDragging ? 'dragging' : ''}`} 
        onMouseDown={handleMouseDown}
      />

      {/* 右侧：Canvas 预览 */}
      <div className="right-panel">
        <div className="panel-header">
          <span>Canvas Preview</span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              Zoom: 
              <select 
                value={zoom.toString()} 
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                style={{ marginLeft: '4px', padding: '2px 4px' }}
              >
                <option value="0.5">50%</option>
                <option value="0.8">80%</option>
                <option value="1">100%</option>
                <option value="1.2">120%</option>
                <option value="1.5">150%</option>
                <option value="2">200%</option>
              </select>
            </div>
            <button onClick={renderEditor} style={{ fontSize: '12px', padding: '2px 8px', cursor: 'pointer' }}>
              Refresh
            </button>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '40px', overflow: 'auto' }}>
          <div className="canvas-wrapper">
            <canvas 
              ref={canvasRef} 
              style={{ display: 'block' }}
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
