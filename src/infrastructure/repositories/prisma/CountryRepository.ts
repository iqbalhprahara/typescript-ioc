import { CountryRepository as CountryRepositoryInterface } from "@modules/location/repositories/CountryRepository";
import PrismaRepository from "./PrismaRepository";
import { Country } from "@modules/location/dto/Country";


export default class CountryRepository extends PrismaRepository implements CountryRepositoryInterface {
    public async create(country: Country): Promise<Country> {
        return await this.prisma.country.create({
            data: country,
        }).then((saved) => <Country>saved);
    }

    public async update(country: Country): Promise<Country> {
        return await this.prisma.country.update({
            where: { uuid: country.uuid },
            data: country
        }).then((saved) => <Country>saved);
    }

    public async delete(uuid: string): Promise<boolean> {
        return await this.prisma.country.delete({
            where: { uuid: uuid },
        }).then(Boolean);
    }

    public async getByUuid(uuid: string): Promise<Country> {
        return await this.prisma.country.findFirstOrThrow({
            where: { uuid: uuid }
        }).then((found) => <Country>found)
    }

    public async findOrCreateByName(name: string): Promise<Country> {
        return await this.prisma.country.upsert({
            where: {
                name: name,
            },
            update: {},
            create: {
                name: name
            }
        });
    }
}