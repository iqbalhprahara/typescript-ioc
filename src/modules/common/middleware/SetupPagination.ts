import { NextFunction, Response } from "express";
import PaginationMetadata from "../response/PaginationMetadata";
import PaginatedRequest from "../request/PaginatedRequest";

declare global {
    namespace Express {
        export interface Response {
            paginate(data: any, total: number): void;
        }
    }
}

export default function setupPagination(request: PaginatedRequest, response: Response, next: NextFunction) {
    request.limit = (request.query.limit ?? 10) as number;
    request.page = (request.query.page ?? 1) as number;
    request.offset = (request.page - 1) * 10;

    response.paginate = (data: any, total: number): void => {
        const metadata = new PaginationMetadata(request, total);
        response.success(
            total > 0 ? 'Data Found' : 'Data Not Found',
            data,
            metadata.data()
        );
    }

    next();
}