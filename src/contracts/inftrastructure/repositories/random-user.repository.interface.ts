import User from "@modules/user/dto/user.dto";

export interface RandomUserRepository {
    /**
     * Get (userCount) number of random user
     * 
     * @param userCount 
     */
    get(userCount?: number): Promise<Array<User>>;
}