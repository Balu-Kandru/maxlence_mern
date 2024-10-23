import { Content } from "../db/models/content.model";
import { User } from "../db/models/user.model";

export const storeContent = async (title: string, body: string, userId: number) => {
    try {
        await Content.create({
            title,
            body,
            userId
        })
    } catch (error) {
        throw new Error('Content creation failed: ' + error.message);
    }
}

export const getContentList = async (limit: number, offset: number, whereCondition?: any) => {
    try {
        const { count, rows } = await Content.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                    required: true,
                },
            ],
        });
        const contentWithUserName = rows.map((row: any) => {
            const { user, ...contentData } = row.toJSON(); // Extract the user and the content data
            return {
                ...contentData,
                userName: user.name, // Move user.name outside the content
            };
        });
        return {
            total: count,
            page: offset/limit,
            totalPages: Math.ceil(count / limit),
            content: contentWithUserName ?? [],
        }
    } catch (error) {
        throw new Error('Content creation failed: ' + error.message);
    }
}

export const deleteContent = async (id: number) => {
    try {
        console.log("here")
        await Content.destroy({
            where: { id }
        })
    } catch (error) {
        throw new Error('deletion failed: ' + error.message);
    }
}