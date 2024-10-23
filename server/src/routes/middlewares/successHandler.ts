import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function successHandler (req: Request, res: Response, next: NextFunction){
    res.success = (data: any, message: string = "Success")=>{
        res.status(StatusCodes.OK).json({
            status: "success",
            message,
            data
        })
    };
    next();
}