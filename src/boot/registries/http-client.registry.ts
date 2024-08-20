import { asClass, asValue } from 'awilix';
import Registry from '@registries/registry.abstract';
import RandomUserClient from '@http-clients/random-user.client';

export default class HttpClientRegistry extends Registry {
    public register(): void {
        this.container.register({
            httpClients: asValue({
                randomUser: asClass(RandomUserClient).singleton().resolve(this.container),
            })
        });
    }
}

