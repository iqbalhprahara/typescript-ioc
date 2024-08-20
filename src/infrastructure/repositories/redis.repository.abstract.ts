import { container } from "@boot/app";
import { Redis } from "ioredis";

export default abstract class RedisRepository {
    protected readonly redis: Redis;
    constructor() {
        this.redis = container.resolve('redis');
    }
}