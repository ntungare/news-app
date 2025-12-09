import path from 'path';
import { getHtml, renderFile } from '../utils/render';
import { Category, categoryMapping } from '../../constants/categories';
import { Country, countries } from '../../constants/countries';
import type { RequestHandler } from 'express';
import type { AppLocals } from '../../server/server';
import type { HomeRenderState } from '../../pages/home/Home.client';

export type Handler = RequestHandler<
    unknown,
    string,
    unknown,
    {
        tag?: Category | string;
        country?: Country | string;
    },
    AppLocals
>;

export const getTagsToDisplay = (): Array<{ id: Category; name: string }> => {
    return Object.entries(categoryMapping)
        .filter(([key, _value]) => key !== 'breaking')
        .map(([key, value]) => ({
            id: key as Category,
            name: value,
        }));
};

export const inputIsCategory = (category: Category | string): category is Category => {
    return Object.prototype.hasOwnProperty.call(categoryMapping, category);
};

export const inputIsCountry = (country: Country | string): country is Country => {
    return countries.some((c) => c === country);
};

export const makeHomeController = (): Handler =>
    async function HomeController(request, response) {
        const activeCountry: Country = inputIsCountry(request.query.country)
            ? request.query.country
            : 'ie';

        const activeTagId: Category = inputIsCategory(request.query.tag)
            ? request.query.tag
            : 'technology';

        const latestArticlesPromise = response.locals.newsDataService.getLatest({
            country: activeCountry,
            category: [activeTagId],
        });
        const breakingArticlesPromise = response.locals.newsDataService.getLatest({
            country: activeCountry,
            category: ['breaking'],
        });

        const [latestArticles, breakingArticles] = await Promise.all([
            latestArticlesPromise,
            breakingArticlesPromise,
        ]);

        const state: HomeRenderState = {
            activeCountry: activeCountry,
            navBarProps: {
                title: 'DailyNews',
                navItems: [
                    {
                        id: 'home',
                        name: 'Home',
                        href: '/',
                    },
                    {
                        id: 'world',
                        name: 'World',
                        href: '/world',
                    },
                    {
                        id: 'politics',
                        name: 'Politics',
                        href: '/politics',
                    },
                    {
                        id: 'tech',
                        name: 'Tech',
                        href: '/tech',
                    },
                    {
                        id: 'sports',
                        name: 'Sports',
                        href: '/sports',
                    },
                ],
            },
            categoryTagsProps: {
                activeTagId: activeTagId,
                tags: getTagsToDisplay(),
            },
            data: {
                mainArticle: {
                    title: 'Global Summit Reaches Historic Agreement on Climate Action',
                    description:
                        'World leaders have unanimously agreed to ambitious new targets for carbon reduction, marking a turning point in the fight against climate change. The agreement comes after weeks of intense negotiations, promising a greener future for generations to come.',
                    image: 'https://images.unsplash.com/photo-1621274790572-7c32596bc67f?auto=format&fit=crop&q=80&w=2000',
                    category: 'World',
                },
                articles: latestArticles.results,
                trending: breakingArticles.results,
            },
        };
        const { serverAssetPath, queryClient, manifest } = response.locals;

        const rootHtml = await renderFile(
            path.join(serverAssetPath, 'home', 'Home.server.mjs'),
            queryClient,
            state
        );

        response.status(200).send(
            getHtml(
                { rootHtml, state },
                {
                    clientFileName: 'src/pages/home/Home.client.tsx',
                    manifest,
                }
            )
        );
    };
