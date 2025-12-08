import path from 'path';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import type { UserConfig } from 'vite';

export const config: UserConfig = {
    build: {
        outDir: path.resolve('dist', 'assets'),
        assetsDir: '',
        manifest: true,
        cssMinify: true,
    },
    plugins: [tailwindcss(), react()],
};
