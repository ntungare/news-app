import { CacheWrapper, CacheKeyParams } from './cacheWrapper';
import { makeRedisCache } from './redisCache';

export class CacheService {
    private cacheWrapper: CacheWrapper;

    private static instance: CacheService;

    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }

        return CacheService.instance;
    }

    public async init(): Promise<void> {
        const redisCache = await makeRedisCache();
        this.cacheWrapper = new CacheWrapper(redisCache);
    }

    public get(cacheKey: CacheKeyParams): Promise<string | undefined> {
        if (!this.cacheWrapper) {
            throw new Error('CacheWrapper not initialized');
        }
        return this.cacheWrapper.get(cacheKey);
    }

    public set(cacheKey: CacheKeyParams, value: string): void {
        if (!this.cacheWrapper) {
            throw new Error('CacheWrapper not initialized');
        }
        return this.cacheWrapper.set(cacheKey, value);
    }
}
