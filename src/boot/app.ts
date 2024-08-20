import Server from "@infrastructure/server";
import Registry from "@registries/registry.abstract";
import ConfigRegistry from "@boot/registries/config.registry";
import LoggerRegistry from "@registries/logger.registry";
import HttpClientRegistry from "@boot/registries/http-client.registry";
import RepositoryRegistry from "@registries/repository.registry";
import PrismaRegistry from "@registries/prisma.registry";
import EventRegistry from "@registries/event.registry";
import RedisRegistry from "@registries/redis.registry";

const awilix = require('awilix');
const container = awilix.createContainer({ injectionMode: awilix.InjectionMode.CLASSIC });

/**
 * Initiate required registry
 */
const registries: Array<Registry> = [
    new ConfigRegistry(container),
    new LoggerRegistry(container),
    new EventRegistry(container),
    new HttpClientRegistry(container),
    new RedisRegistry(container),
    new PrismaRegistry(container),
    new RepositoryRegistry(container),
]

registries.forEach((registry: Registry) => registry.register());

container.loadModules(
    ['../app/modules/**/actions/*.ts'],
    {
        cwd: __dirname,
        resolverOptions: { register: awilix.asClass, lifetime: awilix.Lifetime.SCOPED },
    },
);

const server = new Server(container);

export { container };
module.exports = server;