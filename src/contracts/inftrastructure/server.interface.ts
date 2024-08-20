import { Server as HttpServer } from "http";

export interface Server {
    /**
     * start the server
     */
    start(): Promise<HttpServer>;
}