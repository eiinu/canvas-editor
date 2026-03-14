import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeMirror from '@uiw/react-codemirror';
import { xml } from '@codemirror/lang-xml';
import { CanvasRenderer, ModelFactory } from '@eiinu/editor-core';
import { BasicXmlConverter } from '@eiinu/editor-xml';
import { 
  FULL_DOC, 
  TITLE_DOC, 
  BASIC_STYLES_DOC, 
  COLOR_AND_SIZE_DOC, 
  WORD_WRAP_DOC,
  FONTS_DOC,
  FONT_FALLBACK_DOC
} from './examples.js';
import './styles.css';

const converter = new BasicXmlConverter();
const DEFAULT_XML = converter.toXml(FULL_DOC);

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
          // 移除硬编码的段落间距，改由 ParagraphElement 的 spacing 属性或默认行高控制
          // 为了保持基础文档的可读性，给一个极小的默认间隔
          currentY += 8; 
        }
      });
    });
  };

  return (
    <div className="editor-container">
      {/* 左侧：XML 编辑器 */}
      <div className="left-panel" style={{ width: `${leftWidth}px` }}>
        <div className="panel-header">
          <span>XML Editor</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => setXmlCode(converter.toXml(FULL_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Full Example"
            >
              Full
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(TITLE_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Title Only"
            >
              Title
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(BASIC_STYLES_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Styles Only"
            >
              Styles
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(COLOR_AND_SIZE_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Colors Only"
            >
              Colors
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(WORD_WRAP_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Wrap Only"
            >
              Wrap
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(FONTS_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Fonts Only"
            >
              Fonts
            </button>
            <button 
              onClick={() => setXmlCode(converter.toXml(FONT_FALLBACK_DOC))} 
              style={{ fontSize: '10px', padding: '2px 4px', cursor: 'pointer' }}
              title="Fallback Demo"
            >
              Fallback
            </button>
          </div>
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
