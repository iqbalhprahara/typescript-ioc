
import express, { Express } from "express";
import { Server as HttpServer } from "http";
import { loadControllers, scopePerRequest } from "awilix-express";
import App from "./App";

export default class Server extends App {
    protected app?: Express

    public setup(): this {
        this.app = express();
        const statusMonitor = require('express-status-monitor');

        this.app.use(statusMonitor());
        this.app.use(require('morgan')('dev'));
        this.app.use(scopePerRequest(this.container));
        this.app.use(loadControllers('../modules/**/*Handler.ts', { cwd: __dirname }));

        return this;
    }

    public start(): Promise<HttpServer> {
        if (this.app === undefined) {
            throw new Error('Express app not initialized. please initialize first');
        }

        return new Promise((resolve) => {
            this.app?.listen(this.config.port, () => {
                this.container.resolve('log').info(`Server is running on http://localhost:${this.config.port}`);
            });
        })
    }
}