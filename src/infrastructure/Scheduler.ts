
import { CronJob, CronJobParams } from "cron";
import { existsSync, readdirSync } from "fs";
import RabbitMQRegistry from "@infrastructure/registries/RabbitMQRegistry";
import App from "./App";

export default class Scheduler extends App {
    public schedules: CronJob[] = [];

    public setup(): this {
        RabbitMQRegistry.registerAsPublisher(this.container);

        const modulesDir = __dirname + '/../modules';
        const modules = readdirSync(modulesDir);

        modules.forEach((module) => {
            const cronDir = modulesDir + '/' + module + '/cron';

            if (existsSync(cronDir)) {
                const crons = readdirSync(cronDir);

                crons.forEach((cronFile) => {
                    const dir = cronDir + '/' + cronFile;
                    const cronConfig: CronJobParams = require(dir).default;

                    this.schedules.push(CronJob.from(cronConfig));
                })
            }
        })

        return this;
    }

    public start(): void {
        this.schedules.forEach((schedule) => {
            schedule.start()

            process.on('SIGINT', () => schedule.stop());
            process.on('SIGTERM', () => schedule.stop());
        });
    }
}