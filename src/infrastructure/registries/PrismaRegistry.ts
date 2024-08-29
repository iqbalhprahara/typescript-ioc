import { asFunction } from 'awilix';
import Registry from '@infrastructure/registries/Registry';
import { PrismaClient } from '@prisma/client';

export default class PrismaRegistry extends Registry {
    public register(): void {
        this.container.register({
            // Register prisma connection client
            prisma: asFunction(() => new PrismaClient()).singleton(),
        });
    }
}

