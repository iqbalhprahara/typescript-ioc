import { asFunction } from 'awilix';
import Registry from '@registries/registry.abstract';
import Config from '@contracts/config/config';
import { RedisConfig } from '@config/redis';
import { ConfigRepository } from '@contracts/inftrastructure/repositories/config/config.repository.interface';
import { Redis } from 'ioredis';
import { ILogObj, Logger } from 'tslog';

export default class RedisRegistry extends Registry {
    public register(): void {
        this.container.register({
            // Register redis client
            redis: asFunction((config: ConfigRepository, log: Logger<ILogObj>): Redis => {
                const redisConfig: Config<RedisConfig> = config.get('redis');
                return new Redis({
                    port: redisConfig.port,
                    host: redisConfig.host,
                    password: redisConfig.password ?? undefined,
                    enableReadyCheck: true,
                })
                    .on('connect', () => log.info('connected to redis client'))
                    .on('ready', () => log.info('redis connection is ready to receive command'))
                    .on('error', (error: Error) => log.error('redis connection error', { error }))
                    .on('close', () => log.info('redis connection closed'))
                    .on('reconnecting', () => log.info('reconnecting redis client'))
            }).singleton(),
        });
    }
}

