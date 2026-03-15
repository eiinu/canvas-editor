<script setup lang="ts">
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, computed } from 'vue';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { xml } from '@codemirror/lang-xml';
import { CanvasRenderer, ModelFactory } from '@eiinu/editor-core';
import { BasicXmlConverter } from '@eiinu/editor-xml';
import { getDevicePixelRatio, debounce } from '@eiinu/editor-utils';
import {
  FULL_DOC,
  PARAGRAPH_DOC,
  BASIC_STYLES_DOC,
  WORD_WRAP_DOC,
  FONTS_DOC,
  EMOJI_DOC,
  ALIGNMENT_DOC,
  COLOR_GRADIENT_DOC
} from './examples.js';
import './styles.css';

const converter = new BasicXmlConverter();
const xmlCode = ref(converter.toXml(FULL_DOC));
const debouncedXml = ref(xmlCode.value);
const zoom = ref(1);
const leftWidth = ref(window.innerWidth * 0.3);
const isDragging = ref(false);
const isMobile = ref(false);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const editorRef = ref<HTMLDivElement | null>(null);
const rendererRef = shallowRef<CanvasRenderer | null>(null);
const converterRef = shallowRef(new BasicXmlConverter());
const viewRef = shallowRef<EditorView | null>(null);
const canvasWrapperStyle = ref({});

// 检测是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// 防抖处理
const updateDebouncedXml = debounce((value: string) => {
  debouncedXml.value = value;
}, 500);

// 初始化 CodeMirror 6
const initEditor = () => {
  if (!editorRef.value || isMobile.value) return;

  const startState = EditorState.create({
    doc: xmlCode.value,
    extensions: [
      basicSetup,
      xml(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const newValue = update.state.doc.toString();
          xmlCode.value = newValue;
          updateDebouncedXml(newValue);
        }
      }),
      EditorView.theme({
        "&": { height: "100%" },
        ".cm-scroller": { overflow: "auto" }
      })
    ]
  });

  viewRef.value = new EditorView({
    state: startState,
    parent: editorRef.value
  });
};

watch(xmlCode, (newVal) => {
  // 外部修改（如点击切换示例）时同步编辑器内容
  if (viewRef.value && viewRef.value.state.doc.toString() !== newVal) {
    viewRef.value.dispatch({
      changes: { from: 0, to: viewRef.value.state.doc.length, insert: newVal }
    });
    updateDebouncedXml(newVal);
  }
});

// 渲染编辑器
const renderEditor = () => {
  const canvas = canvasRef.value;
  const renderer = rendererRef.value;
  if (!canvas || !renderer) return;

  const doc = converterRef.value.fromXml(debouncedXml.value);

  // 首先计算内容的实际高度
  let contentHeight = 0;
  let currentY = 100;
  
  // 遍历所有段落，计算总高度
  doc.sections.forEach(section => {
    section.children.forEach(child => {
      if ('children' in child) { // Paragraph
        const el = ModelFactory.createElement(child);
        // 计算段落的高度
        const context = { 
          ctx: renderer.ctx, 
          dpr: 1, 
          zoom: 1, 
          maxWidth: 700 
        };
        el.layout(context);
        // 估算段落高度（基于行数和行高）
        const lineHeight = 30; // 平均行高
        const lineCount = el.lines ? el.lines.length : 1;
        currentY += lineCount * lineHeight + 8; // 加上段落间距
      }
    });
  });
  
  // 计算最终高度
  contentHeight = currentY + 100; // 添加底部边距
  const logicalWidth = 800;
  const logicalHeight = Math.max(1000, contentHeight); // 至少 1000 像素高
  
  // 设置画布尺寸
  renderer.setDimensions(logicalWidth, logicalHeight);
  renderer.clear(logicalWidth, logicalHeight);

  // 重新渲染内容
  currentY = 100;
  doc.sections.forEach(section => {
    section.children.forEach(child => {
      if ('children' in child) { // Paragraph
        const el = ModelFactory.createElement(child);
        currentY = renderer.renderElement(el, 50, currentY, logicalWidth - 100);
        currentY += 8;
      }
    });
  });

  // 更新 canvas-wrapper 的宽度，确保它不会被压缩
  canvasWrapperStyle.value = {
    flexShrink: 0
  };
};

watch([debouncedXml, zoom], () => {
  if (rendererRef.value) {
    rendererRef.value.updateScale({ zoom: zoom.value });
  }
  renderEditor();
});

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  initEditor();

  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  rendererRef.value = new CanvasRenderer(ctx, { 
    dpr: getDevicePixelRatio(),
    zoom: zoom.value 
  });
  renderEditor();

  // 添加双指缩放支持（包括触控板和触摸屏幕）
  
  // 触摸屏幕双指缩放
  let lastDistance = 0;
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      lastDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (lastDistance > 0) {
        const scaleFactor = currentDistance / lastDistance;
        const newZoom = zoom.value * scaleFactor;
        // 限制缩放范围
        if (newZoom >= 0.1 && newZoom <= 5) {
          zoom.value = newZoom;
        }
      }

      lastDistance = currentDistance;
    }
  });

  canvas.addEventListener('touchend', () => {
    lastDistance = 0;
  });

  // MacOS 触控板双指缩放
  canvas.addEventListener('wheel', (e) => {
    // 检测是否是带有 Ctrl 键的滚轮事件（通常是触控板的双指缩放）
    if (e.ctrlKey) {
      e.preventDefault();
      // deltaY 为负表示放大，为正表示缩小
      const scaleFactor = 1 - e.deltaY * 0.01;
      const newZoom = zoom.value * scaleFactor;
      // 限制缩放范围
      if (newZoom >= 0.1 && newZoom <= 5) {
        zoom.value = newZoom;
      }
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  if (viewRef.value) {
    viewRef.value.destroy();
  }
});

// 拖拽逻辑
const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < window.innerWidth - 200) {
      leftWidth.value = newWidth;
    }
  };

  const handleMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
};

const setExample = (doc: any) => {
  xmlCode.value = converter.toXml(doc);
};
</script>

<template>
  <div class="editor-container">
    <!-- 左侧：XML 编辑器 -->
    <div v-if="!isMobile" class="left-panel" :style="{ width: `${leftWidth}px` }">
      <div class="panel-header">
        <span>XML Editor (CodeMirror 6)</span>
        <div style="display: flex; gap: 4px;">
          <button @click="setExample(FULL_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Full Example">Full</button>
          <button @click="setExample(PARAGRAPH_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Paragraph Only">Paragraph</button>
          <button @click="setExample(ALIGNMENT_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Alignment Only">Align</button>
          <button @click="setExample(COLOR_GRADIENT_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Colors Only">Colors</button>
          <button @click="setExample(BASIC_STYLES_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Styles Only">Styles</button>
          <button @click="setExample(FONTS_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Fonts Only">Fonts</button>
          <button @click="setExample(EMOJI_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Emoji Only">Emoji</button>
          <button @click="setExample(WORD_WRAP_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Wrap Only">Wrap</button>
        </div>
      </div>
      <div class="editor-wrapper" ref="editorRef"></div>
    </div>

    <!-- 中间拖拽条 -->
    <div
      v-if="!isMobile"
      class="resizer"
      :class="{ dragging: isDragging }"
      @mousedown="handleMouseDown"
    />

    <!-- 右侧：Canvas 预览 -->
    <div class="right-panel">
      <div class="panel-header">
        <span>Canvas Preview</span>
        <div :style="{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'center', flexWrap: 'wrap' }">
          <!-- 移动端显示的 demo 按钮 -->
          <div v-if="isMobile" style="display: flex; gap: 4px; margin-right: 8px;">
            <button @click="setExample(FULL_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Full Example">Full</button>
            <button @click="setExample(PARAGRAPH_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Paragraph Only">Paragraph</button>
            <button @click="setExample(ALIGNMENT_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Alignment Only">Align</button>
            <button @click="setExample(COLOR_GRADIENT_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Colors Only">Colors</button>
            <button @click="setExample(BASIC_STYLES_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Styles Only">Styles</button>
            <button @click="setExample(FONTS_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Fonts Only">Fonts</button>
            <button @click="setExample(EMOJI_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Emoji Only">Emoji</button>
            <button @click="setExample(WORD_WRAP_DOC)" style="font-size: 10px; padding: 2px 4px; cursor: pointer" title="Wrap Only">Wrap</button>
          </div>
          <div style="font-size: 12px; color: #64748b">
            Zoom: 
            <select v-model="zoom" style="margin-left: 4px; padding: 2px 4px">
              <option :value="0.5">50%</option>
              <option :value="0.8">80%</option>
              <option :value="1">100%</option>
              <option :value="1.2">120%</option>
              <option :value="1.5">150%</option>
              <option :value="2">200%</option>
            </select>
          </div>
          <button @click="renderEditor" style="font-size: 12px; padding: 2px 8px; cursor: pointer">Refresh</button>
        </div>
      </div>
      <div class="canvas-scroll-container">
        <div class="canvas-wrapper" :style="canvasWrapperStyle">
          <canvas ref="canvasRef" style="display: block" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 强制让 CM6 容器铺满 */
:deep(.cm-editor) {
  height: 100%;
}

/* 移动端优化 */
@media (max-width: 767px) {
  .editor-container {
    flex-direction: column;
  }

  .panel-header {
    padding: 8px 12px;
    font-size: 14px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .panel-header span {
    width: 100%;
    margin-bottom: 4px;
  }

  .panel-header button {
    font-size: 9px !important;
    padding: 2px 3px !important;
  }

  .panel-header select {
    font-size: 11px;
    padding: 2px 3px;
  }

  .canvas-scroll-container {
    padding: 20px;
  }
}
</style>
