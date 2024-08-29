import { Envelope, MessageBody, Publisher as RabbitMQPublisher } from "rabbitmq-client";

export type PublisherConstructor = {
    new(...params: any): Publisher;
}

export default abstract class Publisher {
    /**
     * The publisher of RabbitMQ
     */
    protected readonly publisher: RabbitMQPublisher;
    constructor(rabbitmqPublisher: RabbitMQPublisher) {
        this.publisher = rabbitmqPublisher;
    }

    /**
     * Get the envelope to publish to
     */
    public abstract envelope(): Envelope | string;

    /**
     * Send message to RabbitMQ
     */
    public async send(message: MessageBody) {
        await this.publisher.send(
            this.envelope(),
            message
        );
    }
}