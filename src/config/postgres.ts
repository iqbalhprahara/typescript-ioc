import Config from "@contracts/config/config";

export type PostgresConfig = {
    host: string
    port: number,
    database: string,
    username: string,
    password: string,
}

const postgres: Config<PostgresConfig> = {
    host: (process.env.POSTGRES_HOST ?? 'localhost') as string,
    port: (process.env.POSTGRES_PORT ?? 5432) as number,
    database: (process.env.POSTGRES_DB ?? '') as string,
    username: (process.env.POSTGRES_USERNAME ?? '') as string,
    password: (process.env.POSTGRES_PASSWORD ?? '') as string,
};

export default postgres;