import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UrlContextProvider } from '../context/url';
import { CountryContextProvider } from '../context/country';
import { TagContextProvider } from '../context/tag';
import { NavBar, NavBarProps } from '../components/NavBar';
import { CategoryTags, CategoryTagsProps } from '../components/CategoryTags';
import { Footer } from '../components/Footer';
import './layout.css';
import type { Country } from '../constants/countries';

export interface LayoutProps {
    queryClient: QueryClient;
    activeCountry: Country;
    navBarProps: NavBarProps;
    categoryTagsProps: CategoryTagsProps;
    activePath: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    queryClient,
    activeCountry,
    navBarProps,
    categoryTagsProps,
    activePath,
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <UrlContextProvider activePath={activePath}>
                <CountryContextProvider activeCountry={activeCountry}>
                    <TagContextProvider activeTagId={categoryTagsProps.activeTagId}>
                        <NavBar {...navBarProps} />
                        <CategoryTags {...categoryTagsProps} />
                        {children}
                        <Footer />
                    </TagContextProvider>
                </CountryContextProvider>
            </UrlContextProvider>
        </QueryClientProvider>
    );
};
