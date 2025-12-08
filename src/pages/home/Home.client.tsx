import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';

import { Layout } from '../../template/Layout';

import { Home, HomeProps } from './Home';
import type { RenderState } from '../render';

const domNode = document.getElementById('root');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

export type HomeRenderState = RenderState<HomeProps>;

const initialState = window.__initialState as HomeRenderState;

hydrateRoot(
    domNode,
    <Layout queryClient={queryClient} {...initialState}>
        <Home {...initialState.data} />
    </Layout>
);
