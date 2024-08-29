
import App from "@infrastructure/App";
import Consumer from "@infrastructure/rabbitmq/consumer/Consumer";
import RabbitMQRegistry from "./registries/RabbitMQRegistry";

export default class RabbitMQConsumer extends App {
    protected consumers: Consumer[] = [];

    public setup(): this {
        RabbitMQRegistry.registerAsConsumer(this.container);

        return this;
    }

    public start(): void {
        for (const key in RabbitMQRegistry.ConsumerRegister) {
            const consumer: Consumer = this.container.resolve(key);
            consumer.start();
        }
    }
}