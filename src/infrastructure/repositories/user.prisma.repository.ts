import { UserRepository as UserRepositoryInterface } from "@contracts/inftrastructure/repositories/user.repository.interface";
import { User } from "@modules/user/dto/user.dto";
import PrismaRepository from "./prisma.repository.abstract";
import { Gender } from "@modules/user/enum/gender";


export default class UserRepository extends PrismaRepository implements UserRepositoryInterface {
    public async create(user: User): Promise<User> {
        return await this.prisma.user.create({
            data: user,
        }).then((saved) => <User>saved);
    }

    public async createMany(users: Array<User>): Promise<Array<User>> {
        return await this.prisma.user.createMany({
            data: users
        }).then((saved) => {
            this.eventManager.emit('usersCreated', users);

            return users;
        });
    }

    public async update(user: User): Promise<User> {
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
                createdAt: {
                    lte: end,
                    gte: start,
                }
            }, _avg: { age: true }
        }).then((result) => result._avg.age ?? 0);
    }
}