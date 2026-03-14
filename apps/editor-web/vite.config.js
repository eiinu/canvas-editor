import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@eiinu/editor-core': path.resolve(__dirname, '../../packages/editor-core/src/index.ts'),
            '@eiinu/editor-utils': path.resolve(__dirname, '../../packages/editor-utils/src/index.ts'),
            '@eiinu/editor-xml': path.resolve(__dirname, '../../packages/editor-xml/src/index.ts'),
            '@eiinu/editor-protocol': path.resolve(__dirname, '../../packages/shared-protocol/src/index.ts'),
        }
    },
    server: {
        host: '0.0.0.0',
        port: 5173
    }
});
//# sourceMappingURL=vite.config.js.map