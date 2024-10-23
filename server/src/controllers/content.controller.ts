import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { deleteContent, getContentList, storeContent } from "../services/content.service";
import { getCachedData, storeCache } from "../loaders/redis.loader";


export async function saveContent(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { title, body } = req.body;
        const { id: userId } = req.user;
        storeContent(title, body, +userId)
        res.success("Successfully saved");
    } catch (error) {
        next(error);
    }
}

export async function getContentByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id: userId } = req.user;
        const page = +req.query.page || 0;
        const limit = +req.query.limit || 20;
        const offset = page * limit;

        const whereCondition = { userId };
        const cacheKey = `content:page:${page}:limit:${limit}:userId:${userId}`;

        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            res.success(cachedData, "fetched content successfully")
            return;
        }

        const content = await getContentList(limit, offset, whereCondition);
        await storeCache(cacheKey, JSON.stringify(content), 60);
        res.success(content, "Success");
    } catch (error) {
        next(error);
    }
}


export async function contentList(req: Request, res: Response, next: NextFunction) {
    try {
        const page = +req.query.page || 0;
        const limit = +req.query.limit || 20;
        const offset = page * limit;
        const cacheKey = `content:page:${page}:limit:${limit}`;

        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            res.success(cachedData, "fetched content successfully")
            return;
        }

        const content = await getContentList(limit, offset);
        console.log(content)
        await storeCache(cacheKey, JSON.stringify(content), 60);
        res.success(content, "Success");
    } catch (error) {
        next(error);
    }
}

export async function removeContent(req: Request, res: Response, next: NextFunction){
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { id: contentId } = req.query;
        await deleteContent(+contentId);
        res.success("Deleted")
    } catch (error) {
        next(error);
    }
}