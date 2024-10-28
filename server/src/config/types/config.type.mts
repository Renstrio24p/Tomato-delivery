import { IncomingMessage, Server, ServerResponse } from "http"

export type Config = {
    host: string,
    port: number,
    collection: string,
    driver: {
        port: number
    }
}

export type MongoConfig = {
    online: string,
    offline: string,
}

export type Service = Server<typeof IncomingMessage, typeof ServerResponse>