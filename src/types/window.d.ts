import type { RenderState } from '../pages/render';

export {};

declare global {
    interface Window {
        __initialState: RenderState<unknown>;
    }
}
