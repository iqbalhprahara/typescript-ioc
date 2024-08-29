import { asClass } from 'awilix';
import Registry from '@infrastructure/registries/Registry';
import RandomUserRepository from '@repositories/http-client/RandomUserRepository';
import UserRepository from '@repositories/prisma/UserRepository';
import CountryRepository from '@infrastructure/repositories/prisma/CountryRepository';
import CityRepository from '@infrastructure/repositories/prisma/CityRepository';

export default class RepositoryRegistry extends Registry {
    protected static readonly Register: Record<string, { new(...params: any): any }> = {
        randomUserRepository: RandomUserRepository,
        userRepository: UserRepository,
        countryRepository: CountryRepository,
        cityRepository: CityRepository,
    };

    public register(): void {
        for (const key in RepositoryRegistry.Register) {
            this.container.register(key, asClass(RepositoryRegistry.Register[key]).singleton());
        }
    }
}

