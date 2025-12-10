import { getAdapter } from 'axios';
import { CacheKeyParams, CacheService } from './cache';
import type { AxiosAdapterConfig, AxiosAdapter, AxiosResponse } from 'axios';

export const makeCacheAdapter = (adapter?: AxiosAdapterConfig | AxiosAdapterConfig[]): AxiosAdapter => {
    const originalAdapter = getAdapter(adapter);

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
