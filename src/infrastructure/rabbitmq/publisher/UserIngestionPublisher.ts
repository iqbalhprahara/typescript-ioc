import Publisher from "@infrastructure/rabbitmq/publisher/Publisher";
import { Envelope } from "rabbitmq-client";

export default class UserIngestionPublisher extends Publisher {
    public envelope(): Envelope | string {
        return <Envelope>{
            exchange: 'user', routingKey: 'user:*',
        };
    }
}