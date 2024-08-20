import Config from "@contracts/config/config";

export type AppConfig = {
    port: number,
    timezone: string,
}

const app: Config<AppConfig> = {
    port: (process.env.APP_PORT ?? 3000) as number,
    timezone: (process.env.APP_TIMEZONE ?? 'Asia/Jakarta') as string,
};

export default app;