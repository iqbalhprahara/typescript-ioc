import Registry from "@registries/Registry";
import ConfigRegistry from "@registries/ConfigRegistry";
import LoggerRegistry from "@registries/LoggerRegistory";
import HttpClientRegistry from "@registries/HttpClientRegistry";
import RepositoryRegistry from "@registries/RepositoryRegistry";
import PrismaRegistry from "@registries/PrismaRegistry";
import RedisRegistry from "@registries/RedisRegistry";

const awilix = require('awilix');
const container = awilix.createContainer({ injectionMode: awilix.InjectionMode.CLASSIC });

/**
 * Initiate required registry
 */
const registries: Array<Registry> = [
    new ConfigRegistry(container),
    new LoggerRegistry(container),
    new HttpClientRegistry(container),
    new RedisRegistry(container),
    new PrismaRegistry(container),
    new RepositoryRegistry(container),
]

registries.forEach((registry: Registry) => registry.register());

container.loadModules(
    ['../modules/**/action/*'],
    {
        cwd: __dirname,
        resolverOptions: { register: awilix.asClass, lifetime: awilix.Lifetime.SCOPED },
    },
);

export default container;