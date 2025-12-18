import { formatUrl } from '../../utils/urlFormatter';
import { UserInputParams } from '../api/newsdata';
import { Page } from '../utils/fileMappings';
import { getHtml, renderFile } from '../utils/render';

import type { Country } from '../../constants/countries';
import type { SearchRenderState } from '../../pages/search/Search.server';
import type { Controller } from '../middleware/type';

export type Handler = Controller<{ search: string; page?: string }>;

export const getSearchTerm = (request: Parameters<Handler>[0]): string => {
    return request.query.search;
};

export const firstPageUrl = (
    currentHref: string,
    activeCountry: Country,
    searchTerm?: string
): string | undefined => {
    return formatUrl({ path: currentHref, params: { country: activeCountry, search: searchTerm } });
};

export const previousPageUrl = (
    currentHref: string,
    previousPageParams: UserInputParams | undefined
): string | undefined => {
    if (!previousPageParams) {
        return undefined;
    }

    const { country: maybeManyCountries, q: search, page } = previousPageParams;
    let country: Country;
    if (Array.isArray(maybeManyCountries)) {
        country = maybeManyCountries[0];
    } else {
        country = maybeManyCountries;
    }

    return formatUrl({ path: currentHref, params: { country, search, page } });
};

export const makeSearchController = (): Handler =>
    async function SearchController(request, response) {
        const currentHref = request.path;
        const activeCountry = response.locals.activeCountry;
        const searchTerm = getSearchTerm(request);

        if (!searchTerm) {
            response.redirect(302, firstPageUrl(currentHref, activeCountry));
            return;
        }

        const pageToFetch = request.query.page;
        const newsDataService = response.locals.newsDataService;
        const navBarProps = response.locals.navBarProps;

        if (
            pageToFetch &&
            !newsDataService.getPreviousPageParamsFromPage({
                country: activeCountry,
                q: searchTerm,
                nextPage: pageToFetch,
            })
        ) {
            response.redirect(301, firstPageUrl(currentHref, activeCountry, searchTerm));
            return;
        }

        const searchArticles = await newsDataService.getLatest({
            country: activeCountry,
            q: searchTerm,
            page: pageToFetch,
            size: 9,
        });

        const state: SearchRenderState = {
            activePath: currentHref,
            activeCountry: activeCountry,
            navBarProps: navBarProps,
            data: {
                searchTerm,
                articleProps: {
                    articles: searchArticles.apiResponse.results,
                    previousPageUrl: previousPageUrl(currentHref, searchArticles.previousParams),
                    nextPage: searchArticles.apiResponse.nextPage,
                },
            },
        };

        const { queryClient, manifest } = response.locals;
        const page = Page.SEARCH;

        const rootHtml = await renderFile(page, queryClient, state);

        response.status(200).send(getHtml({ rootHtml, state }, { page, manifest }));
    };
