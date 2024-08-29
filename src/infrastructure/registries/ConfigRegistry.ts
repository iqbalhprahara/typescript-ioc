import { asFunction } from 'awilix';
import * as configs from '@config/index';
import { ConfigRepository as ConfigRepositoryInterface } from '@modules/common/repositories/ConfigRepository';
import Registry from '@infrastructure/registries/Registry';
import ConfigRepository from '@infrastructure/repositories/ConfigRepository';

export default class ConfigRegistry extends Registry {
    public register(): void {
        this.container.register('config', asFunction((): ConfigRepositoryInterface => {
            const configRepository: ConfigRepositoryInterface = new ConfigRepository;
            // Register config to repository
            for (const [key, config] of Object.entries(configs)) {
                configRepository.set<typeof config>(key, config);
            }

            return configRepository;
        }));
    }
}

