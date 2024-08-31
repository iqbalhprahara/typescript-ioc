import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Response {
            paginate(data: any, total: number): void;
        }

        export interface Request {
            limit: number,
            offset: number,
            page: number,
        }
    }
}

type PaginationData = {
    page: number,
    total: number,
    total_page: number,
};

class PaginationMetada {
    constructor(
        protected readonly request: Request,
        protected readonly total: number = 0,
    ) {

    }

    public data(): PaginationData {
        return {
            page: this.request.page,
            total: this.total,
            total_page: Math.ceil(this.total / this.request.limit),
        };
    }
}

export default function setupPagination(request: Request, response: Response, next: NextFunction) {
    request.limit = (request.query.limit ?? 10) as number;
    request.page = (request.query.page ?? 1) as number;
    request.offset = (request.page - 1) * 10;

    response.paginate = (data: any, total: number): void => {
        const metadata = new PaginationMetada(request, total);
        response.success(
            total > 0 ? 'Data Found' : 'Data Not Found',
            data,
            metadata.data()
        );
    }

    next();
}