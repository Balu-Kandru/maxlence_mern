import { Response, Request } from 'express';
import { TokenPayload } from '../services/user-management.service';

declare global {
    namespace Express {
        interface Request {
            file?: Express.Multer.File;
            files?: Express.Multer.File[];
            user?: string | jwt.JwtPayload
        }
        interface Response {
            success: (data: any, message?: string) => void;
        }
    }
}
