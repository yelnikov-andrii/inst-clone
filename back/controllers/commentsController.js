import { Post, Comment, User, UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

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
            include: {
                model: User,
                attributes: ["id", "nickname", "fullname"],
                include: [{
                    model: UserInfo,
                    attributes: ["id", "avatar"]
                }]
            }
        });

        res.status(200).json(comments);

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            throw ApiError.BadRequest("Невідомий комент");
        }

        const comment = await Comment.findOne({
            where: {
                id: commentId
            }
        });

        if (comment) {
            await comment.destroy();
            res.status(200).json({ message: "Комент видалений" })
        } else {
            throw ApiError.BadRequest("Неможливо видалити комент");
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const commentsController = {
    create,
    getPostComments,
    deleteComment
}