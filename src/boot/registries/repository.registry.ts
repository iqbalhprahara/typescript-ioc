import { asClass } from 'awilix';
import Registry from '@registries/registry.abstract';
import RandomUserRepository from '@repositories/random-user.http-client.repository';
import UserRepository from '@infrastructure/repositories/user.prisma.repository';
import UserIngestionRepository from '@infrastructure/repositories/user-ingestion.redis.repository';

export default class RepositoryRegistry extends Registry {
    public register(): void {
        this.container.register({
            // Register random user repository
            randomUserRepository: asClass(RandomUserRepository).singleton(),
            // Register user repository
            userRepository: asClass(UserRepository).singleton(),
            // Register user ingestion repostory
            userIngestionRepository: asClass(UserIngestionRepository).singleton(),
        });
    }
}

