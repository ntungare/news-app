import fs from 'fs';
import htmlescape from 'htmlescape';
import path from 'path';

import { Page, pageToClientFileName, pageToRenderFilePath } from './fileMappings';

import type { QueryClient } from '@tanstack/react-query';

import type { RenderFile, RenderState } from '../../pages/render';

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

export const getManifests = async (): Promise<Manifest> => {
    const clientAssetPath = getClientAssetPath();
    let manifest: Manifest;
    let tryCount = 0;
    while (!manifest) {
        if (!fs.existsSync(path.join(clientAssetPath, '.vite', 'manifest.json'))) {
            console.log('Waiting for manifest to be generated...');
            tryCount++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (tryCount > 10) {
                throw new Error('Manifest not found');
            }
        } else {
            manifest = JSON.parse(
                fs.readFileSync(path.join(clientAssetPath, '.vite', 'manifest.json')).toString()
            );
        }
    }

    return manifest;
};

export const collectCssFiles = (fileName: string, manifest: Manifest): Array<string> => {
    const cssFiles = new Set<string>();

    const currentFileData = manifest[fileName];
    if (currentFileData && currentFileData.css) {
        currentFileData.css.forEach((cssFile) => cssFiles.add(cssFile));
    }
    if (currentFileData && currentFileData.imports) {
        const subFiles = currentFileData.imports.flatMap((importedFile) =>
            collectCssFiles(importedFile, manifest)
        );
        subFiles.forEach((cssFile) => cssFiles.add(cssFile));
    }

    return Array.from(cssFiles);
};

export const getHtml = <T>(
    renderedContent: {
        rootHtml: string;
        state: RenderState<T>;
    },
    clientAsset: {
        page: Page;
        manifest: Manifest;
    }
): string => {
    const { rootHtml, state } = renderedContent;
    const { page, manifest } = clientAsset;

    const clientFileName = pageToClientFileName[page];
    const commonFileData = manifest['src/pages/common.ts'];
    const cssFiles = collectCssFiles(clientFileName, manifest);
    const clientFileData = manifest[clientFileName];

    return `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DailyNews</title>
    <link rel="icon" type="image/svg" sizes="any" href="/assets/images/favicon.svg" fetchpriority="high" />
    <script src="/assets/${commonFileData.file}" type="module"></script>
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
    page: Page,
    queryClient: QueryClient,
    state: RenderState<T>
): Promise<string> => {
    const serverAssetPath = getServerAssetPath();
    const renderFilePath = path.join(serverAssetPath, pageToRenderFilePath[page]);
    const file: RenderFile<T> = await import(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderFilePath
    );

    let rootHtml = '';
    try {
        rootHtml = file.render({ queryClient, state });
    } catch (err) {
        console.error('Render failed', err);
    }

    return rootHtml;
};
