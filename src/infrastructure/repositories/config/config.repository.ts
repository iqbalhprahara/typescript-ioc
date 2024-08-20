import ConfigNotFoundError from "./config-not-found.error";
import Config from "@contracts/config/config";
import { ConfigRepository as ConfigRepositoryInterface } from "@contracts/inftrastructure/repositories/config/config.repository.interface";

export default class ConfigRepository implements ConfigRepositoryInterface {
    protected attributes: {
        readonly [key: string]: Config<any>
    }

    constructor() {
        this.attributes = {};
    }

    public get<ConfigType>(key: string): Config<ConfigType> {
        if (this.attributes.hasOwnProperty(key)) {
            return this.attributes[key];
        }

        throw new ConfigNotFoundError(`Config with key ${key} does not exists`);
    }

    public set<ConfigType>(key: string, value: Config<ConfigType>): void {
        this.attributes = {
            ...this.attributes,
            [key]: value
        };
    }
}