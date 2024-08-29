import Config from "@config/config";
import BaseClient from "@http-clients/Client";
import RandomUserClient from "@http-clients/RandomUserClient";

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