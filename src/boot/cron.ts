require('dotenv').config();

import Scheduler from "@infrastructure/Scheduler";
import container from '@infrastructure/Container';
import App from "@infrastructure/App";

try {
    const scheduler: App = new Scheduler(container).setup();

    scheduler.start();
} catch (error: any) {
    console.error(error);
    process.exit();
}