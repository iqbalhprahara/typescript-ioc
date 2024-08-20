import { RandomUserRepository } from "@contracts/inftrastructure/repositories/random-user.repository.interface";
import { User } from "../dto/user.dto";
import Action from "@contracts/action/action.interface";
import { RESOLVER } from "awilix";
import { v7 } from "uuid";
import { getUnixTime } from "date-fns";
import { Gender } from "../enum/gender";
import { UserIngestionRepository } from "@contracts/inftrastructure/repositories/user-ingestion.repository.interface";
import { UserRepository } from "@contracts/inftrastructure/repositories/user.repository.interface";
import { UserIngestion } from "../dto/user-ingestion.dto";

export default class IngestUserData implements Action {
    static [RESOLVER] = {
        name: 'ingestUserDataAction',
    }
    constructor(
        private readonly randomUserRepository: RandomUserRepository,
        private readonly userRepository: UserRepository,
        private readonly userIngestionRepository: UserIngestionRepository
    ) { }
    public async execute(): Promise<Array<User>> {
        const users = (await this.randomUserRepository.get()).filter(async (user) =>
            ! await this.userRepository.existsByUuid(user.uuid)
        );

        if (!users.length) {
            return users;
        }

        const createdAt = users[0].createdAt;

        const userIngestion: UserIngestion = {
            uuid: v7(),
            timestamp: getUnixTime(createdAt),
            femaleCount: users.filter((item) => item.gender === Gender.Female).length,
            maleCount: users.filter((item) => item.gender === Gender.Male).length,
            users: users,
        };

        await this.userIngestionRepository.create(userIngestion);

        return users;
    }
}