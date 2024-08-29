import Consumer from "@infrastructure/rabbitmq/consumer/Consumer";
import { AsyncMessage, ConsumerProps } from "rabbitmq-client";

export default class UserDailyAnalyticConsumer extends Consumer {
    constructor() {
        super();
    }

    public consumerProps(): ConsumerProps {
        return <ConsumerProps>{
            queue: 'user:daily-analytic',
            queueOptions: {
                durable: true,
            },
            exchanges: [{ exchange: 'user', type: 'fanout' }],
            queueBindings: [{ exchange: 'user' }],
        }
    }

    public async handle(message: AsyncMessage): Promise<void> {
        this.log.info('message received (daily analytic). users count : ', message.body.users?.length);
    }
}