import { Like, Post, PostMedia } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

async function toggleLike(req, res) {
    const { userId } = req.body;
    const { postId } = req.params;


    try {
        const foundPost = await Post.findOne({
            where: {
                id: postId
            }
        });

        if (!foundPost) {
            throw ApiError.BadRequest("Неможливо отримати пост, бо він не існує")
        }

        if (!userId) {
            throw ApiError.BadRequest("Невідомий користувач")
        }

        const like = await Like.findOne({
            where: {
                userId,
                postId
            }
        });

        if (like) {
            await like.destroy();
            return res.status(200).json({ liked: false });
        } else {
            await Like.create({ postId, userId });
            return res.status(200).json({ liked: true });
        }


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getAll(req, res) {
    const { postId } = req.params;

    try {
        const foundPost = await Post.findOne({
            where: {
                id: postId
            }
        });

        if (!foundPost) {
            throw ApiError.BadRequest("Неможливо отримати пост, бо він не існує")
        }

        const likes = await Like.findAll({
            where: {
                postId
            }
        });

        const likesNormalized = likes.map(like => like.dataValues);
        res.status(200).json(likesNormalized);


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getLikeStatus(req, res) {
    const { postId } = req.params;
    const { userId } = req.query;

    try {
        const foundPost = await Post.findOne({
            where: {
                id: postId
            }
        });

        if (!foundPost) {
            throw ApiError.BadRequest("Неможливо отримати пост, бо він не існує")
        }

        if (!userId) {
            throw ApiError.BadRequest("Невідомий користувач")
        }

        const count = await Like.count({ where: { postId } });
        const isLiked = await Like.findOne({ where: {
            postId,
            userId
        }})

        res.status(200).json({ count, liked: !!isLiked});


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка при перевірці лайку' });
    }
}

export const likesController = {
    toggleLike,
    getAll,
    getLikeStatus
}