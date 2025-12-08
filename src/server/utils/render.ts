import path from 'path';
import fs from 'fs';

import htmlescape from 'htmlescape';

import { RenderFile, RenderState } from '../../pages/render';

import type { QueryClient } from '@tanstack/react-query';

export const getClientAssetPath = (): string => {
    return path.resolve('dist', 'assets', 'client');
};

export const getServerAssetPath = (): string => {
    return path.resolve('dist', 'assets', 'server');
};

export interface Manifest {
    [name: string]: {
        file: string;
        name: string;
        src?: string;
        isEntry?: boolean;
        imports?: Array<string>;
        css?: Array<string>;
    };
}

export const getManifests = (): Manifest => {
    const clientAssetPath = getClientAssetPath();
    const manifest: Manifest = JSON.parse(
        fs.readFileSync(path.join(clientAssetPath, '.vite', 'manifest.json')).toString()
    );

    return manifest;
};

export const collectCssFiles = (fileName: string, manifest: Manifest): Array<string> => {
    const cssFiles = new Set<string>();

    const currentFileData = manifest[fileName];
    if (currentFileData && currentFileData.css) {
        currentFileData.css.forEach(cssFiles.add, cssFiles);
    }
    if (currentFileData && currentFileData.imports) {
        const subFiles = currentFileData.imports.flatMap((importedFile) =>
            collectCssFiles(importedFile, manifest)
        );
        subFiles.forEach(cssFiles.add, cssFiles);
    }

    return Array.from(cssFiles);
};

export const getHtml = <T>(
    renderedContent: {
        rootHtml: string;
        state: RenderState<T>;
    },
    clientAsset: {
        clientFileName: string;
        manifest: Manifest;
    }
): string => {
    const { rootHtml, state } = renderedContent;
    const { clientFileName, manifest } = clientAsset;

    const cssFiles = collectCssFiles(clientFileName, manifest);
    const clientFileData = manifest[clientFileName];

    return `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Webpage</title>
    ${cssFiles
        .map(
            (cssPath) =>
                `<link rel="stylesheet" crossorigin="anonymous" href="/assets/${cssPath}" />`
        )
        .join('\n')}
    <script>window.__initialState=${htmlescape(state)}</script>
    <script defer src="/assets/${clientFileData.file}" type="module"></script>
</head>
<body class="bg-gray-100 text-gray-900">
    <div id="root">${rootHtml}</div>
</body>
</html>
`;
};

export const renderFile = async <T>(
    fileName: string,
    queryClient: QueryClient,
    state: RenderState<T>
): Promise<string> => {
    const file: RenderFile<T> = await import(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileName
    );

    let rootHtml = '';
    try {
        rootHtml = file.render({ queryClient, state });
    } catch (err) {
        console.error('Render failed', err);
    }

    return rootHtml;
};
