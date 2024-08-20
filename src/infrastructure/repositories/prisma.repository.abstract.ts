import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "stream";

export default abstract class PrismaRepository {
    constructor(protected readonly prisma: PrismaClient, protected readonly eventManager: EventEmitter) {
    }
}