import { validationResult } from 'express-validator';
import config from '../../config/index.config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


export function wholeUrl(){
    const filePath = `${config.server.url}${config.apiPrefix.server}`;
    return filePath
}

export function clientUrl(...routePaths: string[]): string {
    return `${config.client.url}${routePaths.join('/')}`;
}


export function serverUrl(routePath: string){
    return `${config.server.url}/${routePath}`;
}

export function error(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorInfo = errors.array().map(ele => ele.msg);
        next({message: errorInfo.join(",")})
        return;
    }
}