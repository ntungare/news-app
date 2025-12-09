import { CacheKeyParams, CacheService } from './cache';
import type { AxiosAdapter, AxiosResponse } from 'axios';

export interface CacheAdapterParams {
    originalAdapter: AxiosAdapter;
}

export const makeCacheAdapter = (originalAdapter: AxiosAdapter): AxiosAdapter => {
    return async function cacheAdapter(config) {
        const cacheService = CacheService.getInstance();
        const cacheKeyParams: CacheKeyParams = {
            baseURL: config.baseURL,
            requestPath: config.url,
            requestParams: config.params
        };
        const maybeCachedResponse = cacheService.get(cacheKeyParams);
        if (maybeCachedResponse) {
            return Promise.resolve({
                data: maybeCachedResponse,
                status: 200,
                statusText: 'OK',
                config,
            } as AxiosResponse<string>);
        }

        const response = await originalAdapter(config);
        cacheService.set(cacheKeyParams, response.data);
        return response;
    };
};
