import path from 'path';
import { getHtml, renderFile } from '../utils/render';
import { Category, TagData, categoryMapping } from '../../constants/categories';
import { Country, countriesSet } from '../../constants/countries';
import { formatUrl } from '../../utils/urlFormatter';
import type { RequestHandler } from 'express';
import type { AppLocals } from '../../server/server';
import type { HomeRenderState } from '../../pages/home/Home.client';
import type { UserInputParams } from '../api/newsdata';

export type Handler = RequestHandler<
    unknown,
    string,
    unknown,
    {
        tag?: Category | string;
        country?: Country | string;
        page?: string;
    },
    AppLocals
>;

const breakingTagId: Category = 'breaking';
const domesticTagId: Category = 'domestic';
const worldTagId: Category = 'world';
const lastTagId: Category = 'other';

const tagsToFilterOut = new Set<Category>([breakingTagId, domesticTagId, worldTagId, lastTagId]);

export const getTagsToDisplay = (activeTagId: Category): Array<TagData> => {
    const allTags: Array<TagData> = Object.entries(categoryMapping)
        .filter(([key, _value]) => !tagsToFilterOut.has(key as Category))
        .filter(([key, _value]) => key !== activeTagId)
        .map(([key, value]) => ({
            id: key as Category,
            name: value,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const firstTags: Array<TagData> = [];
    if (activeTagId !== domesticTagId) {
        firstTags.push({
            id: domesticTagId,
            name: categoryMapping[domesticTagId],
        });
    }
    if (activeTagId !== worldTagId) {
        firstTags.push({
            id: worldTagId,
            name: categoryMapping[worldTagId],
        });
    }
    const lastTags: Array<TagData> = [];
    if (activeTagId !== lastTagId) {
        lastTags.push({
            id: lastTagId,
            name: categoryMapping[lastTagId],
        });
    }

    return [
        {
            id: activeTagId,
            name: categoryMapping[activeTagId],
        },
        ...firstTags,
        ...allTags,
        ...lastTags,
    ];
};

export const inputIsCountry = (country: Country | string): country is Country => {
    return countriesSet.has(country);
};

export const inputIsCategory = (category: Category | string): category is Category => {
    return Object.prototype.hasOwnProperty.call(categoryMapping, category);
};

export const firstPageUrl = (
    currentHref: string,
    activeCountry: Country,
    activeTagId: Category
): string | undefined => {
    return formatUrl({ path: currentHref, params: { country: activeCountry, tag: activeTagId } });
};

export const previousPageUrl = (
    currentHref: string,
    previousPageParams: UserInputParams | undefined
): string | undefined => {
    if (!previousPageParams) {
        return undefined;
    }

    const { country, category, page } = previousPageParams;
    let tag: Category;
    if (Array.isArray(category)) {
        tag = category[0];
    } else {
        tag = category;
    }

    return formatUrl({ path: currentHref, params: { country, tag, page } });
};

export const makeHomeController = (): Handler =>
    async function HomeController(request, response) {
        if (!!request.query.country && !inputIsCountry(request.query.country)) {
            response.status(400).send('Invalid country');
            return;
        }
        const activeCountry: Country = inputIsCountry(request.query.country)
            ? request.query.country
            : 'ie';

        if (!!request.query.tag && !inputIsCategory(request.query.tag)) {
            response.status(400).send('Invalid tag');
            return;
        }
        const activeTagId: Category = inputIsCategory(request.query.tag)
            ? request.query.tag
            : 'technology';

        const currentHref = request.path;
        const pageToFetch = request.query.page;
        const newsDataService = response.locals.newsDataService;

        if (pageToFetch && !newsDataService.getPreviousPageParamsFromPage(pageToFetch)) {
            response.redirect(301, firstPageUrl(currentHref, activeCountry, activeTagId));
            return;
        }

        const latestArticlesPromise = response.locals.newsDataService.getLatest({
            country: activeCountry,
            category: activeTagId,
            page: request.query.page,
        });
        const breakingArticlesPromise = response.locals.newsDataService.getLatest({
            country: activeCountry,
            category: 'breaking',
        });

        const [latestArticles, breakingArticles] = await Promise.all([
            latestArticlesPromise,
            breakingArticlesPromise,
        ]);

        const state: HomeRenderState = {
            activePath: currentHref,
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
                tags: getTagsToDisplay(activeTagId),
            },
            data: {
                articleProps: {
                    articles: latestArticles.apiResponse.results,
                    previousPageUrl: previousPageUrl(currentHref, latestArticles.previousParams),
                    nextPage: latestArticles.apiResponse.nextPage,
                },
                trendingSidebarProps: {
                    articles: breakingArticles.apiResponse.results,
                },
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
