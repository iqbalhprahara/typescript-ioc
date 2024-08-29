import ConfigNotFoundError from "../../modules/common/repositories/ConfigNotFoundError";
import Config from "@config/config";
import { ConfigRepository as ConfigRepositoryInterface } from "@modules/common/repositories/ConfigRepository";

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