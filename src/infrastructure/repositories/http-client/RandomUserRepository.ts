import { RandomUserRepository as RandomUserRepositoryInterface } from "@modules/user/repositories/RandomUserRepository";
import HttpClientRepository from "@repositories/http-client/HttpClientRepository"
import { AxiosResponse } from "axios";
import RandomUserClient from "@http-clients/RandomUserClient";
import { Gender } from "@modules/user/enum/Gender";
import { RandomUser } from "@modules/user/dto/RandomUser";
import { RandomUserLocation } from "@modules/user/dto/RandomUserLocation";

const DEFAULT_USER_COUNT = 20;

export default class RandomUserRepository extends HttpClientRepository implements RandomUserRepositoryInterface {
    public client(): RandomUserClient {
        return <RandomUserClient>this.httpClients[RandomUserClient.signature]
    }

    public async get(userCount: number = DEFAULT_USER_COUNT): Promise<Array<RandomUser>> {
        return await this.client().getRandomUser(userCount)
            .then((response: AxiosResponse<any, any>) => response.data?.results ?? [])
            .then((data: Array<any>) => {
                return data.map((item) => <RandomUser>{
                    uuid: item.login.uuid,
                    gender: <Gender>item.gender,
                    title: item.name.title,
                    first_name: item.name.first,
                    last_name: item.name.last,
                    nat: item.nat,
                    location: <RandomUserLocation>{
                        street_number: item.location.street.number.toString(),
                        street_name: item.location.street.name,
                        city: item.location.city,
                        country: item.location.country,
                        postcode: item.location.postcode.toString(),
                        coordinates: item.location.coordinates,
                        timezone: item.location.timezone,
                    },
                    email: item.email,
                    age: item.dob.age,
                    dob: item.dob.date,
                    phone: item.phone,
                    cell: item.cell,
                    picture: item.picture,
                    id: item.id,
                });
            });
    }
}