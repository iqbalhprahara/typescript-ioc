import { asFunction } from 'awilix';
import Registry from '@infrastructure/registries/Registry';
import { ILogObj, Logger } from 'tslog';
import { ConfigRepository } from '@modules/common/repositories/ConfigRepository';
import Config from '@config/config';
import { AppConfig } from '@config/app.config';

export default class LoggerRegistry extends Registry {
    public register(): void {
        // Register logger into container
        this.container.register({
            log: asFunction((config: ConfigRepository): Logger<ILogObj> => {
                const appConfig: Config<AppConfig> = config.get('app');
                return new Logger({
                    prettyLogTimeZone: appConfig.timezone as any,
                })
            }),
        });


    }
}
