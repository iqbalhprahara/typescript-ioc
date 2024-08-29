require('dotenv').config();

import container from '@infrastructure/Container';
import App from "@infrastructure/App";
import RabbitMQConsumer from "@infrastructure/RabbitMQConsumer";

try {
    const consumer: App = new RabbitMQConsumer(container).setup();

    consumer.start();
} catch (error: any) {
    console.error(error);
    process.exit();
}