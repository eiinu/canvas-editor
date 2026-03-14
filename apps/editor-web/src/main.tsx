import React from 'react';
import ReactDOM from 'react-dom/client';
import { bootstrapEditorCore } from '@eiinu/editor-core';
import './styles.css';

const core = bootstrapEditorCore();

function App() {
  return (
    <main className="shell">
      <h1>Canvas Editor Workspace</h1>
      <p>开发环境已就绪，功能模块待实现。</p>
      <pre>{JSON.stringify(core, null, 2)}</pre>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
