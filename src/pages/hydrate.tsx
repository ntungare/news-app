import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { Layout } from '../template/Layout';
import type { RenderState } from './render';
import './main.css';

export const hydrateComponent = <T,>(MainComponent: React.FC<T>): void => {
    const domNode = document.getElementById('root');

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    });

    const initialState = window.__initialState as RenderState<T>;

    hydrateRoot(
        domNode,
        <Layout queryClient={queryClient} {...initialState}>
            <MainComponent {...initialState.data} />
        </Layout>
    );
};
