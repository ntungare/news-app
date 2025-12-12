import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { makeCacheAdapter } from '../service/cache/adapter/axiosCacheAdapter';

import type { Category } from '../../constants/categories';
import type { Country } from '../../constants/countries';

export interface NewsDataLatestParams {
    apikey: string;
    q?: string;
    qInTitle?: string;
    qInMeta?: string;
    country: Country;
    category?: Category | Category[];
    language: 'en';
    domain?: string | string[];
    sort: 'pubdateasc' | 'relevancy' | 'source';
    prioritydomain?: 'top' | 'medium' | 'low';
    page?: string;
}

export type UserInputParams = Omit<NewsDataLatestParams, 'apikey' | 'language'>;

const defaultParams: UserInputParams = {
    country: 'ie',
    sort: 'pubdateasc',
};

export interface NewsDataArticle {
    article_id: string;
    link: string;
    title: string;
    description?: string;
    content?: string;
    keywords?: string[];
    creator?: string[];
    language: string;
    country: string[];
    category: Category[];
    datatype: string;
    pubDate: string;
    pubDateTZ: string;
    image_url?: string;
    video_url?: string;
    source_id?: string;
    source_name?: string;
    source_priority?: number;
    source_url?: string;
    source_icon?: string;
    sentiment?: string;
    sentiment_stats?: {
        negative: number;
        neutral: number;
        positive: number;
    };
    ai_tag?: string[];
    ai_region?: string[];
    ai_org?: string[];
    ai_summary?: string;
    duplicate: boolean;
}

export interface NewsDataLatestResponse {
    status: string;
    totalResults: number;
    results: NewsDataArticle[];
    nextPage: string | null;
}

export interface GetLatestResponse {
    previousParams?: UserInputParams;
    apiResponse: NewsDataLatestResponse;
}

export interface PageKey {
    country: NonNullable<UserInputParams['country']>;
    category: NonNullable<UserInputParams['category']>;
    nextPage?: NonNullable<NewsDataLatestResponse['nextPage']>;
}

export class NewsDataService {
    private apiKey: string;
    private baseUrl = 'https://newsdata.io/api/1';
    private instance: AxiosInstance;
    private pageMap: Map<string, UserInputParams>;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.instance = this.makeAxiosInstance();
        this.pageMap = new Map<string, UserInputParams>();
        this.addExtraConfigsToInstance(this.instance);
    }

    private makeAxiosInstance() {
        return axios.create({
            baseURL: this.baseUrl,
            params: {
                apikey: this.apiKey,
                language: 'en',
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'comma' });
            },
            timeout: 5000,
        });
    }

    private addExtraConfigsToInstance(instance: AxiosInstance) {
        // Wrap the adapter with caching functionality
        instance.defaults.adapter = makeCacheAdapter(instance.defaults.adapter);

        // Add a request interceptor for logging
        instance.interceptors.request.use((config) => {
            console.log(`Axios Request URL: ${config.baseURL}${config.url}`);

            return config;
        });
    }

    private getPageKey(pageKey: PageKey): string {
        return JSON.stringify(pageKey, Object.keys(pageKey).sort());
    }

    private setCurrentPageParamsToNextPage(
        currentParams: UserInputParams,
        nextPage?: string | null
    ): void {
        if (!nextPage) {
            return;
        }

        const key = this.getPageKey({
            country: currentParams.country,
            category: currentParams.category!,
            nextPage,
        });

        this.pageMap.set(key, currentParams);
    }

    public getPreviousPageParamsFromPage(pageKey: PageKey): UserInputParams | undefined {
        if (!pageKey.nextPage) {
            return;
        }

        const key = this.getPageKey(pageKey);

        return this.pageMap.get(key);
    }

    private generateUserInputParams(
        params: Partial<UserInputParams> = defaultParams
    ): UserInputParams {
        return {
            ...defaultParams,
            prioritydomain: 'top',
            ...params,
        };
    }

    /**
     * Fetch latest news from newsdata.io
     * @param params - Freeform parameters for the API call
     */
    async getLatest(params?: Partial<UserInputParams>): Promise<GetLatestResponse> {
        // Merge api key with the provided freeform params
        const requestParams = this.generateUserInputParams(params);

        try {
            const response = await this.instance.get<NewsDataLatestResponse>('/latest', {
                params: requestParams,
            });

            this.setCurrentPageParamsToNextPage(requestParams, response.data.nextPage);
            const previousPageParams = this.getPreviousPageParamsFromPage({
                country: requestParams.country,
                category: requestParams.category!,
                nextPage: requestParams.page,
            });

            return {
                previousParams: previousPageParams,
                apiResponse: response.data,
            };
        } catch (error) {
            console.error('Error fetching news:', error.message);
            throw error;
        }
    }
}
