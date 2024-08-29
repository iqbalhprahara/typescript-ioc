import { Request, Response } from "express";
import { before, GET, route } from "awilix-express";
import { UserRepository } from "./repositories/UserRepository";

@route('/users')
export default class UserHandler {
    constructor(private readonly userRepository: UserRepository) { }
    @route('')
    @GET()
    public async ingest(request: Request, response: Response): Promise<Response<any, Record<any, any>>> {
        const limit: number = (request.query.limit ?? 10) as number;
        const page: number = (request.query.page ?? 1) as number;
        const offset: number = (page - 1) * 10;
        const [result, count] = await Promise.all([
            this.userRepository.findAll(limit, offset),
            this.userRepository.count(),
        ]);

        return response.send({
            data: result,
            meta: {
                page: page,
                total: count,
                total_page: Math.ceil(count / limit),
            }
        });
    }
}