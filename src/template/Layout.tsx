import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NavBar, NavBarProps } from '../components/NavBar';
import { CategoryTags, CategoryTagsProps } from '../components/CategoryTags';
import { Footer } from '../components/Footer';
import './layout.css';

export interface LayoutProps {
    queryClient: QueryClient;
    navBarProps: NavBarProps;
    categoryTagsProps: CategoryTagsProps;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    queryClient,
    navBarProps,
    categoryTagsProps,
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <NavBar {...navBarProps} />
            <CategoryTags {...categoryTagsProps} />
            {children}
            <Footer />
        </QueryClientProvider>
    );
};
