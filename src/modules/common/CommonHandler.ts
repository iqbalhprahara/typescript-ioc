import { Request, Response } from "express";
import { GET, route } from "awilix-express";

@route('/')
export default class CommonHandler {
    constructor() { }
    @route('/')
    @GET()
    public async index(request: Request, response: Response): Promise<void> {
        response.success('Welcome to the API');
    }
}