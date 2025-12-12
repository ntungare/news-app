import { Category, TagData, categoryMapping } from '../../constants/categories';
import { formatUrl } from '../../utils/urlFormatter';
import { AppError } from '../errors/error';
import { Page } from '../utils/fileMappings';
import { getHtml, renderFile } from '../utils/render';

import type { Country } from '../../constants/countries';
import type { HomeRenderState } from '../../pages/home/Home.server';
import type { UserInputParams } from '../api/newsdata';
import type { Controller } from '../middleware/type';

export type Handler = Controller<{
    tag?: Category;
    page?: string;
}>;

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

export const inputIsCategory = (category?: string): category is Category => {
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
        const activeCountry = response.locals.activeCountry;

        if (!!request.query.tag && !inputIsCategory(request.query.tag)) {
            throw new AppError(400, 'Invalid tag');
        }
        const activeTagId = inputIsCategory(request.query.tag)
            ? request.query.tag
            : 'technology';

        const currentHref = request.path;

        if (!request.query.country || !request.query.tag) {
            response.redirect(301, firstPageUrl(currentHref, activeCountry, activeTagId));
            return;
        }

        const pageToFetch = request.query.page;
        const newsDataService = response.locals.newsDataService;
        const navBarProps = response.locals.navBarProps;

        if (
            pageToFetch &&
            !newsDataService.getPreviousPageParamsFromPage({
                country: activeCountry,
                category: activeTagId,
                nextPage: pageToFetch,
            })
        ) {
            response.redirect(301, firstPageUrl(currentHref, activeCountry, activeTagId));
            return;
        }

        const latestArticlesPromise = newsDataService.getLatest({
            country: activeCountry,
            category: activeTagId,
            page: pageToFetch,
        });
        const breakingArticlesPromise = newsDataService.getLatest({
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
            navBarProps: navBarProps,
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

        const { queryClient, manifest } = response.locals;
        const page = Page.HOME;

        const rootHtml = await renderFile(page, queryClient, state);

        response.status(200).send(getHtml({ rootHtml, state }, { page, manifest }));
    };
