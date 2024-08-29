import { CityRepository as CityRepositoryInterface } from "@modules/location/repositories/CityRepository";
import PrismaRepository from "./PrismaRepository";
import { City } from "@modules/location/dto/City";


export default class CityRepository extends PrismaRepository implements CityRepositoryInterface {
    public async create(city: Omit<City, 'country'>): Promise<City> {
        return await this.prisma.city.create({
            data: city,
        }).then((saved) => <City>saved);
    }

    public async update(city: Omit<City, 'country'>): Promise<City> {
        return await this.prisma.city.update({
            where: { uuid: city.uuid },
            data: city
        }).then((saved) => <City>saved);
    }

    public async delete(uuid: string): Promise<boolean> {
        return await this.prisma.city.delete({
            where: { uuid: uuid },
        }).then(Boolean);
    }

    public async getByUuid(uuid: string): Promise<City> {
        return await this.prisma.city.findFirstOrThrow({
            where: { uuid: uuid }
        }).then((found) => <City>found)
    }

    public async findOrCreateByNameAndCountryUuid(name: string, countryUuid: string): Promise<City> {
        return await this.prisma.city.upsert({
            where: {
                country_uuid_name: {
                    country_uuid: countryUuid,
                    name: name,
                }
            },
            update: {},
            create: {
                country_uuid: countryUuid,
                name: name,
            }
        });
    }
}