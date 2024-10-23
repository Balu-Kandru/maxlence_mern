import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import config from '../../config/index.config';
import jwt from 'jsonwebtoken';

export async function generateToken(): Promise<string> {
    return uuidv4();
}

export async function hashText(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
}

export async function compareHashedText(currStr: string, originalStr: string): Promise<Boolean> {
    return await bcrypt.compare(currStr, originalStr);
}

export async function generateJwtToken(jwtPayload: any) {
    const token = jwt.sign(
        jwtPayload,
        config.server.jwt_secret,
        { expiresIn: '3h' }
    );
    return token;
}