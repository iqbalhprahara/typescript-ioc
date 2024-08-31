import { Request } from "express";

export type PaginationData = {
    page: number,
    total: number,
    total_page: number,
};

export default class PaginationMetada {
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