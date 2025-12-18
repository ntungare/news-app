import React from 'react';
import { renderToString } from 'react-dom/server';

import { Layout } from '../../template/Layout';
import { Search, SearchProps } from './Search';

import type { RenderFile, RenderState } from '../render';

export type SearchRenderState = RenderState<SearchProps>;

export const render: RenderFile<SearchProps>['render'] = ({ queryClient, state }) => {
    return renderToString(
        <Layout queryClient={queryClient} {...state}>
            <Search {...state.data} />
        </Layout>
    );
};
