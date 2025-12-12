import React from 'react';
import { renderToString } from 'react-dom/server';

import { Layout } from '../../template/Layout';
import { Home, HomeProps } from './Home';

import type { RenderFile, RenderState } from '../render';

export type HomeRenderState = RenderState<HomeProps>;

export const render: RenderFile<HomeProps>['render'] = ({ queryClient, state }) => {
    return renderToString(
        <Layout queryClient={queryClient} {...state}>
            <Home {...state.data} />
        </Layout>
    );
};
