import { UserIngestion } from "@modules/user/dto/user-ingestion.dto";

export interface UserIngestionRepository {
    /**
     * Create user ingestion record data on repository
     * 
     * @param userIngestion 
     */
    create(userIngestion: UserIngestion): UserIngestion | Promise<UserIngestion>;

    /**
     * Find all user ingestion records by date given
     * 
     * @param date
     */
    findAllByDate(date: Date): Array<string> | Promise<Array<string>>;

    /**
     * Delete all user ingestion records by date given
     * 
     * @param date 
     */
    deleteAllbyDate(date: Date): boolean | Promise<boolean>;
}