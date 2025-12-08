import type { RenderState } from '../pages/render';

declare global {
    interface Window {
        __initialState: RenderState<unknown>;
    }
}
