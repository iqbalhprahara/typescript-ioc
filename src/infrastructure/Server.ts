
import express, { Express } from "express";
import { Server as HttpServer } from "http";
import { loadControllers, scopePerRequest } from "awilix-express";
import App from "./App";
import setupResponseFormatter from "@modules/common/middleware/SetupResponseFormatter";

export default class Server extends App {
    protected app?: Express

    public setup(): this {
        this.app = express();
        const statusMonitor = require('express-status-monitor');

        // setup monitor endpoint
        this.app.use(statusMonitor());

        // setup express logger
        this.app.use(require('morgan')('dev'));

        // setup request container
        this.app.use(scopePerRequest(this.container));

        // add response formatter utilities
        this.app.use(setupResponseFormatter);

        // setup route from controller
        this.app.use(loadControllers('../modules/**/*Handler*', { cwd: __dirname }));

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