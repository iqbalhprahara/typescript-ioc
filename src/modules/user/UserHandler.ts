import { Request, Response } from "express";
import { before, GET, route } from "awilix-express";
import { UserRepository } from "./repositories/UserRepository";
import parsePagination from "@modules/common/middleware/ParsePagination";

@route('/users')
export default class UserHandler {
    constructor(private readonly userRepository: UserRepository) { }
    @route('')
    @GET()
    @before(parsePagination)
    public async index(request: Request, response: Response): Promise<void> {
        const [result, count] = await Promise.all([
            this.userRepository.findAll(request.limit, request.offset),
            this.userRepository.count(),
        ]);

        response.paginate(result, count);
    }
}