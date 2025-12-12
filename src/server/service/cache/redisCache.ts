import { createClient } from 'redis';

import type { RedisClient } from './cacheWrapper';

export const makeRedisCache = async (): Promise<RedisClient | undefined> => {
    let redisCache: RedisClient | undefined;
    if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
        redisCache = createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        });
    } else if (process.env.HOST_REDIS) {
        redisCache = createClient({
            url: 'redis://localhost:6379',
        });
    } else {
        redisCache = undefined;
    }

    if (redisCache) {
        await redisCache.on('error', (err) => console.log('Redis Client Error', err)).connect();
    }

    return redisCache;
};
