import { LRUCache } from 'lru-cache';
import cloneDeep from 'lodash-es/cloneDeep'

export interface CacheKeyParams {
    baseURL?: string;
    requestPath: string;
    requestParams: Record<string, unknown>;
}

export class CacheService {
    private cache: LRUCache<string, string>;

    private static instance: CacheService;

    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    private constructor() {
        this.cache = new LRUCache({
            max: 1000,
            ttl: 1000 * 60 * 60, // 1 hour
            ttlAutopurge: true,
        });
    }

    private generateKey(cacheKeyParams: CacheKeyParams): string {
        const requestParams = cloneDeep(cacheKeyParams.requestParams);
        delete requestParams.apikey;
    
        const cacheKeyObject = {
            baseURL: cacheKeyParams.baseURL,
            requestPath: cacheKeyParams.requestPath,
            requestParams: JSON.stringify(requestParams, Object.keys(requestParams).sort()),
        };

        return JSON.stringify(cacheKeyObject);
    }

    public get(cacheKey: CacheKeyParams): string | undefined {
        const normalizedCacheKey = this.generateKey(cacheKey);
        return this.cache.get(normalizedCacheKey);
    }

    public set(cacheKey: CacheKeyParams, value: string): void {
        const normalizedCacheKey = this.generateKey(cacheKey);
        this.cache.set(normalizedCacheKey, value);
    }
}
