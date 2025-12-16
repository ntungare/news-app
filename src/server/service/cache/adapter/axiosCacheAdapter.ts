import { getAdapter } from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';

import { CacheService } from '../index';

import type { AxiosAdapterConfig, AxiosAdapter, AxiosResponse } from 'axios';

import type { CacheKeyParams } from '../cacheWrapper';

export const redactParams = (
    params: CacheKeyParams['requestParams']
): CacheKeyParams['requestParams'] => {
    const redactedParams = cloneDeep(params);
    if (redactedParams.apikey) {
        redactedParams.apikey = '***********';
    }

    return redactedParams;
};

export const makeCacheAdapter = (
    adapter?: AxiosAdapterConfig | AxiosAdapterConfig[]
): AxiosAdapter => {
    const originalAdapter = getAdapter(adapter);

    return async function cacheAdapter(config) {
        const cacheService = CacheService.getInstance();
        const cacheKeyParams: CacheKeyParams = {
            baseURL: config.baseURL,
            requestPath: config.url,
            requestParams: config.params,
        };
        const maybeCachedResponse = await cacheService.get(cacheKeyParams);
        if (maybeCachedResponse) {
            console.log('Cache hit for', { ...cacheKeyParams, requestParams: redactParams(cacheKeyParams.requestParams) });

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
