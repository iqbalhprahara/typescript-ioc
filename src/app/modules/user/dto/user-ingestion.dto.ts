import { User } from "./user.dto";

export type UserIngestion = {
    uuid: string,
    timestamp: number,
    maleCount: number,
    femaleCount: number,
    users: User[],
}