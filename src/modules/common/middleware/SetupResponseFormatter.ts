import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        export interface Response {
            success(message: string, data?: any, metadata?: any): void;
            error(message: string, code?: number, details?: any): void;
        }
    }
}

export default function setupResponseFormatter(request: Request, response: Response, next: NextFunction) {
    response.success = (message: string, data = undefined, metadata = undefined): void => {
        response.status(200).json({
            message,
            data,
            metadata,
        });
    }

    response.error = (message: string, code = 400, details = undefined): void => {
        response.status(code).json({
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