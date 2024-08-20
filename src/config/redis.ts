import Config from "@contracts/config/config";

export type RedisConfig = {
    host: string
    port: number,
    password?: null | string,
}

const redis: Config<RedisConfig> = {
    host: (process.env.REDIS_HOST ?? 'localhost') as string,
    port: (process.env.REDIS_PORT ?? 6379) as number,
    password: process.env.REDIS_PASSWORD,
};

export default redis;