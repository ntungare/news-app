import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import type { UserConfig } from 'vite';

export const config: UserConfig = {
    build: {
        outDir: path.resolve('dist', 'assets'),
        assetsDir: '',
        manifest: true,
        cssMinify: true,
    },
    plugins: [tailwindcss({ optimize: true }), react({})],
};
