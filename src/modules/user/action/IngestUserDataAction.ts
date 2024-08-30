import { RandomUserRepository } from "@modules/user/repositories/RandomUserRepository";
import Action from "@modules/common/action/Action";
import { RESOLVER } from "awilix";
import { UserRepository } from "@modules/user/repositories/UserRepository";
import { ILogObj, Logger } from "tslog";
import UserIngestionPublisher from "@infrastructure/rabbitmq/publisher/UserIngestionPublisher";
import { User } from "../dto/User";
import { Country, PrismaClient } from "@prisma/client";
import { CountryRepository } from "@modules/location/repositories/CountryRepository";
import { CityRepository } from "@modules/location/repositories/CityRepository";
import { UserLocation } from "../dto/UserLocation";
import PrismaRepository from "@infrastructure/repositories/prisma/PrismaRepository";
import { City } from "@modules/location/dto/City";

export default class IngestUserDataAction implements Action {
    static [RESOLVER] = {
        name: 'ingestUserDataAction',
    }
    constructor(
        private readonly prisma: PrismaClient,
        private readonly randomUserRepository: RandomUserRepository,
        private readonly userRepository: PrismaRepository & UserRepository,
        private readonly countryRepository: PrismaRepository & CountryRepository,
        private readonly cityRepository: PrismaRepository & CityRepository,
        private readonly userIngestionPublisher: UserIngestionPublisher,
        private readonly log: Logger<ILogObj>,
    ) { }
    public async execute(createdAt: Date = new Date): Promise<Array<User>> {

        const users = await this.randomUserRepository.get();

        let saved = await this.prisma.$transaction(async (trx): Promise<User[]> => {
            const saved: User[] = [];

            for (const key in users) {
                try {
                    const randomUser = users[key];
                    const exists = await this.userRepository.withTransaction(trx).existsByUuid(randomUser.uuid);

                    if (exists) {
                        continue;
                    }

                    const { country: randomUserCountry, city: randomUserCity, ...otherLocationProperty } = randomUser.location;
                    const country: Required<Country> = await this.countryRepository.withTransaction(trx).findOrCreateByName(randomUserCountry) as Required<Country>;
                    const city: Required<City> = await this.cityRepository.withTransaction(trx).findOrCreateByNameAndCountryUuid(randomUserCity, country.uuid) as Required<City>;

                    const userLocation: UserLocation = {
                        country_uuid: country.uuid,
                        city_uuid: city.uuid,
                        ...otherLocationProperty,
                    }

                    const { location: _, ...randomUserWithoutLocation } = randomUser;

                    const user: User = {
                        location: userLocation,
                        created_at: createdAt,
                        ...randomUserWithoutLocation
                    }

                    saved.push(await this.userRepository.withTransaction(trx).create(user));
                } catch (error: any) {
                    throw (error);
                }

            }



            return saved;
        });

        if (!saved.length) {
            return saved;
        }

        await this.userIngestionPublisher.send({ users: saved }).catch((err: Error) => this.log.error(err));

        return saved;
    }
}