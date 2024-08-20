import { UserIngestion } from "@modules/user/dto/user-ingestion.dto";
import RedisRepository from "./redis.repository.abstract";
import { UserIngestionRepository as UserIngestionRepositoryInterface } from "@contracts/inftrastructure/repositories/user-ingestion.repository.interface";
import { endOfDay, getUnixTime, startOfDay } from "date-fns";

export default class UserIngestionRepository extends RedisRepository implements UserIngestionRepositoryInterface {
    public readonly key: string = 'user_ingestion';
    public async create(userIngestion: UserIngestion): Promise<UserIngestion> {
        await this.redis.zadd(this.key, userIngestion.timestamp, JSON.stringify(userIngestion));

        return userIngestion;
    }

    public async findAllByDate(date: Date): Promise<Array<string>> {
        const start = startOfDay(date);
        const end = endOfDay(date);

        return await this.redis.zrangebyscore(
            this.key,
            getUnixTime(start),
            getUnixTime(end)
        );
    }

    public async deleteAllbyDate(date: Date): Promise<boolean> {
        console.log(this);
        return new Promise(() => true);
    }
}