import { render as homeRenderFn } from '../../pages/home/Home.server';
import { render as errorRenderFn } from '../../pages/error/Error.server';
import { RenderFile } from '../../pages/render';

export enum Page {
    HOME,
    ERROR
}

export const pageToRenderFn = Object.freeze<Record<Page, RenderFile<unknown>['render']>>({
    [Page.HOME]: homeRenderFn,
    [Page.ERROR]: errorRenderFn,
});

export const pageToClientFileName = Object.freeze<Record<Page, string>>({
    [Page.HOME]: 'src/pages/home/Home.client.tsx',
    [Page.ERROR]: 'src/pages/error/Error.client.tsx',
});
