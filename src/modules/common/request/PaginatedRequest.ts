import { Request } from "express";

export default interface PaginatedRequest extends Request {
    limit: number,
    offset: number,
    page: number,
}