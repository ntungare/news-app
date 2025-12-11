import React from 'react';
import { renderToString } from 'react-dom/server';
import { Layout } from '../../template/Layout';
import { Error, ErrorProps } from './Error';
import type { RenderFile, RenderState } from '../render';

export type ErrorRenderState = RenderState<ErrorProps>;

export const render: RenderFile<ErrorProps>['render'] = ({ queryClient, state }) => {
    return renderToString(
        <Layout queryClient={queryClient} {...state}>
            <Error {...state.data} />
        </Layout>
    );
};
