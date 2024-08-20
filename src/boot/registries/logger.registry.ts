import { asValue } from 'awilix';
import Registry from '@registries/registry.abstract';
import { Logger } from 'tslog';
import { ConfigRepository } from '@contracts/inftrastructure/repositories/config/config.repository.interface';
import Config from '@contracts/config/config';
import { AppConfig } from '@config/app';

export default class LoggerRegistry extends Registry {
    public register(): void {
        const config: ConfigRepository = this.container.resolve('config');
        const appConfig: Config<AppConfig> = config.get('app');

        // Register logger into container
        this.container.register({
            log: asValue(new Logger({
                prettyLogTimeZone: appConfig.timezone as any,
            })),
        });
    }
}

