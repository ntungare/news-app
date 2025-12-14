import cloneDeep from 'lodash-es/cloneDeep';
import { LRUCache } from 'lru-cache';
import objectHash from 'object-hash';
import { createClient } from 'redis';

export type RedisClient = ReturnType<typeof createClient>;

export interface CacheKeyParams {
    baseURL?: string;
    requestPath: string;
    requestParams: Record<string, unknown>;
}

const generateKey = (cacheKeyParams: CacheKeyParams): string => {
    const requestParams = cloneDeep(cacheKeyParams.requestParams);
    delete requestParams.apikey;

    const cacheKeyObject = {
        baseURL: cacheKeyParams.baseURL,
        requestPath: cacheKeyParams.requestPath,
        requestParams: requestParams,
    };

    return objectHash(cacheKeyObject);
};

// 12 hour = 1000 ms * 60 s * 60 m * 12 h
const ttlMilliseconds = 1000 * 60 * 60 * 12;

export class CacheWrapper {
    private redisCache: RedisClient | undefined;
    private localCache: LRUCache<string, string> | undefined;

    public constructor(redisCache: RedisClient | undefined) {
        this.redisCache = redisCache;
        if (!this.redisCache) {
            this.localCache = this.makeLocalCache();
        }
    }

    private makeLocalCache(): LRUCache<string, string> {
        return new LRUCache({
            max: 1000,
            ttl: ttlMilliseconds,
            ttlAutopurge: true,
        });
    }

    public async get(cacheKey: CacheKeyParams): Promise<string | undefined> {
        const normalizedCacheKey = generateKey(cacheKey);
        if (this.redisCache) {
            const redisData = await this.redisCache.get(normalizedCacheKey);

            return redisData ? redisData.toString() : undefined;
        }

        return this.localCache!.get(normalizedCacheKey);
    }

    public set(cacheKey: CacheKeyParams, value: string): void {
        const normalizedCacheKey = generateKey(cacheKey);
        if (this.redisCache) {
            this.redisCache
                .set(normalizedCacheKey, value, {
                    expiration: { type: 'PX', value: ttlMilliseconds },
                })
                .then(() => {})
                .catch(() => {});
            return;
        }

        this.localCache!.set(normalizedCacheKey, value);
    }
}
