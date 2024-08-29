import { asClass, asFunction, AwilixContainer } from 'awilix';
import Registry from '@infrastructure/registries/Registry';
import { ILogObj, Logger } from 'tslog';
import Connection, { Publisher } from 'rabbitmq-client';
import Config from '@config/config';
import { RabbitMQConfig } from '@config/rabbitmq.config';
import UserIngestionPublisher from '@infrastructure/rabbitmq/publisher/UserIngestionPublisher';
import { ConsumerConstructor } from '@infrastructure/rabbitmq/consumer/Consumer';
import { PublisherConstructor } from '@infrastructure/rabbitmq/publisher/Publisher';
import { ConfigRepository } from '@modules/common/repositories/ConfigRepository';
import UserDailyAnalyticConsumer from '@infrastructure/rabbitmq/consumer/UserDailyAnalyticConsumer';
import UserRegionAnalyticConsumer from '@infrastructure/rabbitmq/consumer/UserRegionAnalyticConsumer';

enum RabbitMQMode {
    Publisher = 'publisher',
    Consumer = 'subscriber',
};

export default class RabbitMQRegistry extends Registry {
    /**
     * The mode of the RabbitMQ should be registered to
     */
    private mode: RabbitMQMode = RabbitMQMode.Publisher;

    /**
     * List of publisher instance
     */
    public static readonly PublisherRegister: Record<string, PublisherConstructor> = {
        userIngestionPublisher: UserIngestionPublisher,
    }

    /**
     * :ost of consumer instance
     */
    public static readonly ConsumerRegister: Record<string, ConsumerConstructor> = {
        userDailyAnalyticConsumer: UserDailyAnalyticConsumer,
        userRegionAnlyticConsumer: UserRegionAnalyticConsumer,
    }

    constructor(container: AwilixContainer, mode: RabbitMQMode) {
        super(container);

        this.mode = mode;
    }

    public register(): void {
        this.container.register({
            // Register redis client
            rabbitmq: asFunction((config: ConfigRepository, log: Logger<ILogObj>): Connection => {
                const rabbitMqConfig: Config<RabbitMQConfig> = config.get('rabbitmq');
                const connection: Connection = new Connection(rabbitMqConfig);

                connection.on('error', (err: Error) => log.error(err));
                connection.on('connection', () => log.info('rabbitmq connected'));

                const closeConnection = async () => await connection.close();

                process.on('SIGINT', closeConnection);
                process.on('SIGTERM', closeConnection);

                return connection;
            }).singleton(),
        });

        if (this.asConsumer()) {
            // consumer class registration
            for (const key in RabbitMQRegistry.ConsumerRegister) {
                this.container.register(key, asClass(RabbitMQRegistry.ConsumerRegister[key]).singleton())
            }
        }

        if (this.asPublisher()) {
            this.container.register({
                rabbitmqPublisher: asFunction((rabbitmq: Connection): Publisher => {
                    const publisher = rabbitmq.createPublisher({
                        confirm: true,
                        maxAttempts: 5,
                    });

                    const closePublisher = async () => await publisher.close();

                    process.on('SIGINT', closePublisher);
                    process.on('SIGTERM', closePublisher);

                    return publisher;
                }).singleton(),
            })

            // Publisher class registration
            for (const key in RabbitMQRegistry.PublisherRegister) {
                this.container.register(key, asClass(RabbitMQRegistry.PublisherRegister[key]).singleton())
            }
        }
    }

    /**
     * Register RabbitMQ as publisher
     */
    public static registerAsPublisher(container: AwilixContainer): RabbitMQRegistry {
        const registry = new RabbitMQRegistry(container, RabbitMQMode.Publisher);

        registry.register();

        return registry;
    }

    /**
     * Register RabbitMQ as subscriber
     */
    public static registerAsConsumer(container: AwilixContainer): RabbitMQRegistry {
        const registry = new RabbitMQRegistry(container, RabbitMQMode.Consumer);

        registry.register();

        return registry;
    }

    /**
     * Check if RabbitMQ regitered as publisher
     */
    public asPublisher(): boolean {
        return this.mode === RabbitMQMode.Publisher;
    }

    /**
     * Check if RabbitMQ regitered as subscriber
     */
    public asConsumer(): boolean {
        return this.mode === RabbitMQMode.Consumer;
    }
}

