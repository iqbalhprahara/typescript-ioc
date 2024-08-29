import { asClass, asValue } from 'awilix';
import Registry from '@infrastructure/registries/Registry';
import RandomUserClient from '@http-clients/RandomUserClient';

export default class HttpClientRegistry extends Registry {
    public register(): void {
        this.container.register({
            httpClients: asValue({
                randomUser: asClass(RandomUserClient).singleton().resolve(this.container),
            })
        });
    }
}

