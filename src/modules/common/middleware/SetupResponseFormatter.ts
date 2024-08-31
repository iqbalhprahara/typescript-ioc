import { NextFunction, Request, Response } from "express";
import PaginationMetada from "../PaginationMetadata";

declare global {
    namespace Express {
        export interface Response {
            success(message: string, data: any, metadata: any): void;
            paginate(data: any, total: number): void;
            error(message: string, code: number, details: any): void;
        }
    }
}


export default async function setupResponseFormatter(request: Request, response: Response, next: NextFunction) {
    response.success = (message: string, data: any, metadata: any): void => {
        response.status(200).json({
            'status': 'success',
            message,
            data,
            metadata,
        });
    }

    response.paginate = (data: any, total: number): void => {
        const metadata = new PaginationMetada(request, total);
        response.success(
            total > 0 ? 'Data Found' : 'Data Not Found',
            data,
            metadata.data()
        );
    }

    response.error = (message: string, code = 400, details = {}): void => {
        response.status(code).json({
            'status': 'error',
            message,
            error: {
                code,
                details,
            },
            metadata: {
                timestamp: new Date().toISOString(),
            },
        });
    }

    next();
}