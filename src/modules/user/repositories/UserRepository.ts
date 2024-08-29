import { User } from "../dto/User";
import { Gender } from "../enum/Gender";

export interface UserRepository {
    /**
     * Create new user data on repository
     * 
     * @param user 
     */
    create(user: User): User | Promise<User>;

    /**
     * Create new user data on repository
     * 
     * @param user 
     */
    createMany(users: Array<User>): Array<User> | Promise<Array<User>>;

    /**
     * Update current user data on repository
     * 
     * @param user 
     */
    update(user: User): User | Promise<User>;

    /**
     * Delete user on repository by the given uuid
     * 
     * @param uuid 
     */
    delete(uuid: string): boolean | Promise<boolean>;

    /**
     * Get user by the given uuid
     * 
     * @param uuid 
     */
    getByUuid(uuid: string): User | Promise<User>;

    /**
     * Check if a user already exists on repository
     * by the given uuid
     * 
     * @param uuid
     */
    existsByUuid(uuid: string): boolean | Promise<boolean>;

    /**
     * Get average age of user created on certain date
     * 
     * @param date
     * @param gender 
     */
    getAverageAgeByDate(date: Date, gender?: Gender): number | Promise<number>;

    /**
     * Find all user
     */
    findAll(limit?: number, offset?: number): Array<User> | Promise<Array<User>>;

    /**
     * Get count
     */
    count(): number | Promise<number>;
}