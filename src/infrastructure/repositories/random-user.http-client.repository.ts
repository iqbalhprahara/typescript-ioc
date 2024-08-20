import { RandomUserRepository as RandomUserRepositoryInterface } from "@contracts/inftrastructure/repositories/random-user.repository.interface";
import HttpClientRepository from "@repositories/http-client.repository.abstract"
import { User } from "@modules/user/dto/user.dto";
import { AxiosResponse } from "axios";
import RandomUserClient from "@http-clients/random-user.client";

const DEFAULT_USER_COUNT = 20;

export default class RandomUserRepository extends HttpClientRepository implements RandomUserRepositoryInterface {
    public client(): RandomUserClient {
        return <RandomUserClient>this.httpClients[RandomUserClient.signature]
    }

    public async get(userCount: number = DEFAULT_USER_COUNT): Promise<Array<User>> {
        return await this.client().getRandomUser(userCount)
            .then((response: AxiosResponse<any, any>) => response.data?.results ?? [])
            .then((data: Array<any>) => {
                const createdAt = new Date();

                return data.map((item) => <User>{
                    uuid: item.login.uuid,
                    gender: item.gender,
                    name: item.name,
                    location: item.location,
                    age: item.dob.age,
                    createdAt: createdAt,
                });
            });
    }
}