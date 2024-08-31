import PaginatedRequest from "../request/PaginatedRequest";

type PaginationData = {
    page: number,
    total: number,
    total_page: number,
};

export default class PaginationMetadata {
    constructor(
        protected readonly request: PaginatedRequest,
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