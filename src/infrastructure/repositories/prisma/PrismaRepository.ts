import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import _ from 'lodash';

export default abstract class PrismaRepository {
    constructor(protected prisma: PrismaClient | Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) {
    }

    private setTransactionClient(trx: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">): this {
        this.prisma = trx;

        return this;
    }

    public withTransaction(trx: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">): this {
        return _.cloneDeep(this).setTransactionClient(trx);
    }
}