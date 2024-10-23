import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	const error = new Error(`path ${req.originalUrl} not found`);
	error['status'] = StatusCodes.NOT_FOUND;
	next(error);
}

export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = error['status'] || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
}