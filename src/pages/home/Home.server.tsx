import React from 'react';
import { renderToString } from 'react-dom/server';
import { Layout } from '../../template/Layout';
import { Home, HomeProps } from './Home';
import type { RenderFile } from '../render';

export const render: RenderFile<HomeProps>['render'] = ({ queryClient, state }) => {
    const { activeCountry, navBarProps, categoryTagsProps, data } = state;

    return renderToString(
        <Layout
            queryClient={queryClient}
            activeCountry={activeCountry}
            navBarProps={navBarProps}
            categoryTagsProps={categoryTagsProps}
        >
            <Home {...data} />
        </Layout>
    );
};
