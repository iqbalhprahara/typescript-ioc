import { RandomUser } from "../dto/RandomUser";

export interface RandomUserRepository {
    /**
     * Get (userCount) number of random user
     * 
     * @param userCount 
     */
    get(userCount?: number): Promise<Array<RandomUser>>;
}