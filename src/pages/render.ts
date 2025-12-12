import type { QueryClient } from '@tanstack/react-query';

import type { LayoutProps } from '../template/Layout';

export interface RenderState<T> extends Omit<LayoutProps, 'queryClient'> {
    data: T;
}

export interface RenderProps<T> {
    queryClient: QueryClient;
    state: RenderState<T>;
}

export interface RenderFile<T> {
    render: (RenderProps: RenderProps<T>) => string;
}
