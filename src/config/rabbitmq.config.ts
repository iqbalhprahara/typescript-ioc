import { ConnectionOptions } from "rabbitmq-client";
import Config from "./config";
import { env } from "process";


export type RabbitMQConfig = ConnectionOptions;

const rabbitmq: Config<RabbitMQConfig> = {
    hostname: env.RABBITMQ_HOST ?? 'localhost',
    port: env.RABBITMQ_PORT ?? 5672,
    username: env.RABBITMQ_USER ?? '',
    password: env.RABBITMQ_PASSWORD ?? '',
    vhost: '/',
}

export default rabbitmq;