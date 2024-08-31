import { Response } from "express";
import { before, GET, route } from "awilix-express";
import { UserRepository } from "./repositories/UserRepository";
import setupPagination from "@modules/common/middleware/SetupPagination";
import PaginatedRequest from "@modules/common/request/PaginatedRequest";

@route('/users')
export default class UserHandler {
    constructor(private readonly userRepository: UserRepository) { }
    @route('')
    @GET()
    @before(setupPagination)
    public async index(request: PaginatedRequest, response: Response): Promise<void> {
        const [result, count] = await Promise.all([
            this.userRepository.findAll(request.limit, request.offset),
            this.userRepository.count(),
        ]);

        response.paginate(result, count);
    }
}