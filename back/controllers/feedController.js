import { Op } from "sequelize";
import { Post, PostMedia, User, UserInfo, Comment } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

async function getFeed(req, res) {
    const { userId } = req.params;

    try {
        if (!userId) {
            throw ApiError.BadRequest("Невідомий користувач");
        }

        const posts = await Post.findAll({
            where: {
                userId: {
                    [Op.not]: userId
                }
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname', 'fullname'],
                    include: [
                        {
                            model: UserInfo,
                            attributes: ['id', 'avatar']
                        }]
                },
                {
                    model: PostMedia,
                    attributes: ['id', 'filename', 'type']
                },
                {
                    model: Comment,
                    attributes: ["id", "text", "userId"],
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname', 'fullname'],
                        include: [
                            {
                                model: UserInfo,
                                attributes: ['id', 'avatar']
                            }]
                    }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(posts);
    } catch (e) {
        console.log(e, 'error')
        res.status(500).json({ message: "Помилка при отриманні стрічки" })
    }
}

export const feedController = {
    getFeed
}