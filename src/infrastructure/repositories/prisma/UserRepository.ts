import { UserRepository as UserRepositoryInterface } from "@modules/user/repositories/UserRepository";
import PrismaRepository from "./PrismaRepository";
import { User } from "@modules/user/dto/User";
import { Gender } from "@modules/user/enum/Gender";
import { UserLocation } from "@modules/user/dto/UserLocation";


export default class UserRepository extends PrismaRepository implements UserRepositoryInterface {
    public async create(user: User): Promise<User> {
        return await this.prisma.user.create({
            data: {
                ...user,
                location: user.location ? {
                    create: user.location as Omit<UserLocation, 'country' | 'city'>,
                } : undefined,
            },
        }).then((saved) => <User>saved);
    }

    public async createMany(users: Array<Omit<User, 'location'>>): Promise<Array<User>> {
        return await this.prisma.user.createMany({
            data: users
        }).then((saved) => {
            return users;
        });
    }

    public async update(user: Omit<User, 'location'>): Promise<User> {
        return await this.prisma.user.update({
            where: { uuid: user.uuid },
            data: user
        }).then((saved) => <User>saved);
    }

    public async delete(uuid: string): Promise<boolean> {
        return await this.prisma.user.delete({
            where: { uuid: uuid },
        }).then(Boolean);
    }

    public async getByUuid(uuid: string): Promise<User> {
        return await this.prisma.user.findFirstOrThrow({
            where: { uuid: uuid }
        }).then((found) => <User>found)
    }

    public async existsByUuid(uuid: string): Promise<boolean> {
        return await this.prisma.user.findFirst({
            where: { uuid: uuid },
            select: {
                uuid: true,
            }
        }).then(Boolean);
    }

    public async getAverageAgeByDate(date: Date, gender?: Gender): Promise<number> {
        const start = date;
        start.setHours(0, 0, 0);

        const end = date;
        end.setHours(23, 59, 59);

        return await this.prisma.user.aggregate({
            where: {
                gender: gender ? gender : undefined,
                created_at: {
                    lte: end,
                    gte: start,
                }
            }, _avg: { age: true }
        }).then((result) => result._avg.age ?? 0);
    }

    public async findAll(limit?: number, offset?: number): Promise<Array<User>> {
        return await this.prisma.user.findMany({
            skip: offset,
            take: limit
        }).then((result) => result.map((user) => <User>user));
    }

    public async count(): Promise<number> {
        return await this.prisma.user.count();
    }
}