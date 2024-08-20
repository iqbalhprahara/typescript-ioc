import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import IngestUserData from "./actions/ingest-user-data.action";

@route('/users')
export default class UserHandler {
    constructor(private readonly ingestUserDataAction: IngestUserData) { }
    @route('/ingest')
    @GET()
    public async ingest(request: Request, response: Response): Promise<Response<any, Record<any, any>>> {
        const result = await this.ingestUserDataAction.execute();
        return response.send(result);
    }
}