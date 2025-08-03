import { Post, Comment, User } from "../models/index.js";

async function create(req, res) {
    const { postId, userId, text } = req.body;

    try {
        if (!userId) {
            throw ApiError.BadRequest("Неможливо створити коментарій, невідомий користувач")
        }

        const post = await Post.findOne({
            id: postId
        });

        if (!post) {
            throw ApiError.BadRequest("Не вдалося створити коментарій, невідомий пост")
        }

        const comment = await Comment.create({
            text,
            userId,
            postId
        });

        if (comment) {
            res.status(201).json({ message: "Комент створено" });
        }

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getPostComments(req, res) {
    const { postId } = req.params;

    try {

        if (!postId) {
            throw ApiError.BadRequest("Не вдалося отримати коментарі, невідомий пост")
        }

        const comments = await Comment.findAll({
            where: {
                postId,
            },
            raw: true,
            include: {
                model: User,
                attributes: ["id", "nickname", "fullname"]
            }
        });

        res.status(200).json(comments);

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const commentsController = {
    create,
    getPostComments
}