import { Server } from "contracts/inftrastructure/server.interface";

require('dotenv').config();

try {
    const server: Server = require('@boot/app.ts');

    server.start().catch((error: any) => {
        console.error(error);
        process.exit();
    });
} catch (error: any) {
    console.error(error.stack);
    process.exit();
}
