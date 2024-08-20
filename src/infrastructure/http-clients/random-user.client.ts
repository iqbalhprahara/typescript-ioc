import { AxiosResponse } from "axios";
import BaseClient from "@http-clients/base.client";

const DEFAULT_USER_COUNT = 20;

export default class RandomUserClient extends BaseClient {
    public static signature: string = 'randomUser';

    /**
     * Get {userCount} number of random user from api
     * @param userCount 
     * @returns 
     */
    public async getRandomUser(userCount: number = DEFAULT_USER_COUNT): Promise<AxiosResponse<any, any>> {
        return await this.connector.get('/', {
            timeout: 30000,
            params: {
                results: userCount,
            }
        });
    }
}