import { AwilixContainer } from "awilix";
import Config from "@config/config";
import { AppConfig } from "@config/app.config";
import { ConfigRepository } from "@modules/common/repositories/ConfigRepository";

export default abstract class App {
    protected config: Config<AppConfig>
    protected container: AwilixContainer;

    constructor(container: AwilixContainer) {
        this.container = container;

        const configRepository: ConfigRepository = container.resolve('config');
        this.config = configRepository.get('app');
    }

    /**
     * Setup app
     */
    public abstract setup(): this;

    /**
     * Start the app
     */
    public abstract start(): any;
}