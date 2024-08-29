import container from "@infrastructure/Container";
import Connection, { AsyncMessage, ConsumerProps, Consumer as RabbitMQConsumer } from "rabbitmq-client";
import { ILogObj, Logger } from "tslog";

export type ConsumerConstructor = {
    new(...params: any): Consumer;
}

export default abstract class Consumer {
    /**
     * The RabbitMQ consumer
     */
    protected consumer?: RabbitMQConsumer;

    /**
     * Logger
     */
    protected readonly log: Logger<ILogObj>;

    constructor() {
        this.log = container.resolve('log');
    }

    /**
     * Get consumer props
     */
    public abstract consumerProps(): ConsumerProps;

    /**
     * Handle the message
     */
    public abstract handle(message: AsyncMessage): Promise<void>

    public start(): void {
        const rabbitmq: Connection = container.resolve('rabbitmq');
        this.consumer = rabbitmq.createConsumer(this.consumerProps(), (message: AsyncMessage) => this.handle(message));
        this.consumer.on('error', (err) => {
            this.log.error(err);
        });

        const closeConsumer = async () => await this.consumer?.close();

        process.on('SIGINT', closeConsumer);
        process.on('SIGTERM', closeConsumer);
    }
}