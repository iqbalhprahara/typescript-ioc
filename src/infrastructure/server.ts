
import express, { Express } from "express";
import { Server as HttpServer } from "http";
import { Server as ServerInterface } from "@contracts/inftrastructure/server.interface";
import { AwilixContainer } from "awilix";
import Config from "@contracts/config/config";
import { ConfigRepository } from "@contracts/inftrastructure/repositories/config/config.repository.interface";
import { loadControllers, scopePerRequest } from "awilix-express";
import { AppConfig } from "@config/app";

export default class Server implements ServerInterface {
    protected app: Express
    protected config: Config<AppConfig>
    protected container: AwilixContainer;

    constructor(container: AwilixContainer) {
        this.app = express();
        this.container = container;

        const configRepository: ConfigRepository = container.resolve('config');
        this.config = configRepository.get('app');

        this.setup();
    }

    private setup(): void {
        const statusMonitor = require('express-status-monitor');

        this.app.use(statusMonitor());
        this.app.use(require('morgan')('dev'));
        this.app.use(scopePerRequest(this.container));
        this.app.use(loadControllers('../app/modules/**/*.handler.ts', { cwd: __dirname }));
    }

    public start(): Promise<HttpServer> {
        return new Promise((resolve) => {
            this.app.listen(this.config.port, () => {
                this.container.resolve('log').info(`Server is running on http://localhost:${this.config.port}`);
            });
        })
    }
}