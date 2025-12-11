import path from 'path';

export enum Page {
    HOME,
    ERROR,
}

export const pageToRenderFilePath = Object.freeze<Record<Page, string>>({
    [Page.HOME]: path.join('home', 'Home.server.mjs'),
    [Page.ERROR]: path.join('error', 'Error.server.mjs'),
});

export const pageToClientFileName = Object.freeze<Record<Page, string>>({
    [Page.HOME]: path.join('src', 'pages', 'home', 'Home.client.tsx'),
    [Page.ERROR]: path.join('src', 'pages', 'error', 'Error.client.tsx'),
});
