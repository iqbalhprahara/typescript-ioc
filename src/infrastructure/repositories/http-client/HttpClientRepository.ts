import BaseClient from "@http-clients/Client"

type HttpClients = {
    [key: string]: BaseClient
}

export default abstract class HttpClientRepository {
    constructor(protected httpClients: HttpClients) {
    }
    /**
     * 
    /**
     * Get the http client connector instance for repository
     */
    protected abstract client(): BaseClient;
}