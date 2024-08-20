import Config from "@contracts/config/config";
import BaseClient from "@http-clients/base.client";
import RandomUserClient from "@http-clients/random-user.client";

export type HttpClientConfigItem<T> = {
    client: T,
    url: string,
    timeout?: number,
};

export type HttpClientConfig = {
    [key: string]: HttpClientConfigItem<BaseClient>
}

const httpClient: Config<HttpClientConfig> = {
    [`${RandomUserClient.signature}`]: {
        url: (process.env.RANDOM_USER_URL ?? 'https://randomuser.me/api') as string,
    } as HttpClientConfigItem<RandomUserClient>,
};

export default httpClient;