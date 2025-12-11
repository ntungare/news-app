import path from 'path';
import { defineConfig } from 'vite';
import { config } from './vite.common.config';

const outDir = path.join(config.build?.outDir ?? '', 'server');

export default defineConfig({
    ...config,
    build: {
        ...config.build,
        outDir,
        ssr: true,
        ssrManifest: true,
        rollupOptions: {
            input: {
                'home/Home.server': './src/pages/home/Home.server.tsx',
                'error/Error.server': './src/pages/error/Error.server.tsx',
            },
        },
    },
});
