import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/index.config';
import { StatusCodes } from 'http-status-codes';


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const openRoutePatterns = config.server.unProtectedRoutes.map(route => {
        return new RegExp(`^${route.replace(/:[^/]+/g, '[^/]+')}$`);
    });
    
    if (openRoutePatterns.some(pattern => pattern.test(req.path))) {
        return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decodedPayload = jwt.verify(token.split(' ')[1], config.server.jwt_secret);
        req.user = decodedPayload;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' }); 
    }
};
