import path from 'path';
import { defineConfig } from 'vite';

import { config } from './vite.common.config';

const outDir = path.join(config.build?.outDir ?? '', 'client');

export default defineConfig({
    ...config,
    build: {
        ...config.build,
        outDir,
        sourcemap: true,
        rollupOptions: {
            input: {
                'home/Home.client': './src/pages/home/Home.client.tsx',
                'error/Error.client': './src/pages/error/Error.client.tsx',
                'search/Search.client': './src/pages/search/Search.client.tsx',
            },
            output: {
                entryFileNames: '[hash]/[name].js',
                chunkFileNames: '[hash]/[name].js',
                assetFileNames: '[hash]/[name].[ext]',
            },
        },
    },
});
