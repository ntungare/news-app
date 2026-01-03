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
        try {
            await redisCache
                .on('error', (thrown) => {
                    if (thrown instanceof Error) {
                        throw new Error('Redis Client Error', { cause: thrown });
                    }

                    throw new Error('Redis Client Error');
                })
                .connect();
        } catch (error) {
            console.error('Error occurred when trying to connect', error);

            redisCache = undefined;
        }
    }

    return redisCache;
};
