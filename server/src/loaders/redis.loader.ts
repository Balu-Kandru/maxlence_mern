import Redis from 'ioredis';
import config from '../config/index.config'

const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (error) => {
    console.error('Redis error:', error);
});

export async function getCachedData(cacheKey: string) {
    try {
        const data = await redis.get(cacheKey);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error getting cached data for key ${cacheKey}:`, error);
        throw error;
    }
}

export async function storeCache(cacheKey: string, data: string, expiresIn: number = 60) {
    try {
        return await redis.set(cacheKey, data, 'EX', expiresIn);
    } catch (error) {
        console.error(`Error storing data in cache for key ${cacheKey}:`, error);
        throw error;
    }
}

export default redis;
