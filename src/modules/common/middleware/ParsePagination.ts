import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Request {
            limit: number,
            offset: number,
            page: number,
        }
    }
}

export default async function parsePagination(request: Request, response: Response, next: NextFunction) {
    request.limit = (request.query.limit ?? 10) as number;
    request.page = (request.query.page ?? 1) as number;
    request.offset = (request.page - 1) * 10;

    next();
}