import { asValue } from 'awilix';
import * as configs from '@config/index';
import ConfigRepository from '@repositories/config/config.repository';
import { ConfigRepository as ConfigRepositoryInterface } from 'contracts/inftrastructure/repositories/config/config.repository.interface';
import Registry from '@registries/registry.abstract';

export default class ConfigRegistry extends Registry {
    public register(): void {
        // Register config repository into container
        const configRepository: ConfigRepositoryInterface = new ConfigRepository;
        this.container.register({
            config: asValue(configRepository)
        });

        // Register config to repository
        for (const [key, config] of Object.entries(configs)) {
            configRepository.set<typeof config>(key, config);
        }
    }
}

