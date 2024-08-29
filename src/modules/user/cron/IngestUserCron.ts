import container from "@infrastructure/Container";
import { CronJobParams } from "cron";
import { ILogObj, Logger } from "tslog";
import IngestUserDataAction from "@modules/user/action/IngestUserDataAction";

export default <CronJobParams>{
    cronTime: '0/2 * * * * *', // every 10 seconds
    onTick: () => {
        const log: Logger<ILogObj> = container.resolve('log');

        try {
            log.info('starting cron ingest user data');

            const ingestUserData: IngestUserDataAction = container.resolve('ingestUserDataAction');

            ingestUserData.execute();

            log.info('cron user ingest finished')
        } catch (error: any) {
            log.error(error);
        }
    },
}