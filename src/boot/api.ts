require('dotenv').config();

import container from "@infrastructure/Container";
import Server from "@infrastructure/Server";
import App from "@infrastructure/App";

try {
    const server: App = new Server(container).setup();

    server.start().catch((error: any) => {
        console.error(error);
        process.exit();
    });
} catch (error: any) {
    console.error(error.stack);
    process.exit();
}
