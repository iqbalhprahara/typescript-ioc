import Config from "@config/config";

export interface ConfigRepository {
    /**
     * Get value of a config by key given
     * 
     * @param key 
     */
    get<ConfigType>(key: string): Config<ConfigType>;

    /**
     * Set new config key value pair
     * 
     * @param key 
     * @param value 
     */
    set<ConfigType>(key: string, value: Config<ConfigType>): void;
}