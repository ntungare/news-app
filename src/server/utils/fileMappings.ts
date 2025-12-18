import path from 'path';

export enum Page {
    HOME,
    ERROR,
    SEARCH,
}

export const pageToRenderFilePath = Object.freeze<Record<Page, string>>({
    [Page.HOME]: path.join('home', 'Home.server.mjs'),
    [Page.ERROR]: path.join('error', 'Error.server.mjs'),
    [Page.SEARCH]: path.join('search', 'Search.server.mjs'),
});

export const pageToClientFileName = Object.freeze<Record<Page, string>>({
    [Page.HOME]: path.join('src', 'pages', 'home', 'Home.client.tsx'),
    [Page.ERROR]: path.join('src', 'pages', 'error', 'Error.client.tsx'),
    [Page.SEARCH]: path.join('src', 'pages', 'search', 'Search.client.tsx'),
});
