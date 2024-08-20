import axios, { AxiosInstance } from "axios";
import { HttpClientConfig, HttpClientConfigItem } from "@config/http-client";
import { ConfigRepository } from "@contracts/inftrastructure/repositories/config/config.repository.interface";

export default abstract class BaseClient {
    public static signature: string;
    protected connector: AxiosInstance;
    protected config: HttpClientConfigItem<BaseClient>;

    constructor(config: ConfigRepository) {
        this.config = this.resolveConfig(config);
        this.connector = this.setupConnector();
    }

    protected setupConnector(): AxiosInstance {
        return axios.create({
            baseURL: this.config.url,
            timeout: this.config.timeout ?? 1000,
            headers: {
                Accept: 'application/json',
            },
        });
    }

    protected resolveConfig(config: ConfigRepository): HttpClientConfigItem<BaseClient> {
        const httpConfig: HttpClientConfig = config.get('httpClient');
        const client = <typeof BaseClient>this.constructor;

        return httpConfig[client.signature];
    }
}