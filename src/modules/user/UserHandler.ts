import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import { UserRepository } from "./repositories/UserRepository";

@route('/users')
export default class UserHandler {
    constructor(private readonly userRepository: UserRepository) { }
    @route('')
    @GET()
    public async index(request: Request, response: Response): Promise<void> {
        const [result, count] = await Promise.all([
            this.userRepository.findAll(request.limit, request.offset),
            this.userRepository.count(),
        ]);

        response.paginate(result, count);
    }
}