import { Post, PostMedia, User, UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import path from 'path';

async function create(req, res) {
    const { description, userId } = req.body;
    const files = req.files.files;

    try {
        if (!userId) {
            throw ApiError.BadRequest("Неможливо створити пост, невідомий користувач")
        }

        const post = await Post.create({
            userId,
            description
        });

        if (!post) {
            throw ApiError.BadRequest("Не вдалося створити пост")
        }

        const files = req.files.files;

        let uploadedFiles = [];

        if (Array.isArray(files)) {
            uploadedFiles = files;
        } else if (files) {
            uploadedFiles = [files];
        } else {
            throw ApiError.BadRequest("Файли відсутні");
        }

        for (const file of uploadedFiles) {
            const uploadPath = path.join('uploads', file.name);
            await file.mv(uploadPath);
            await PostMedia.create({
                filename: uploadPath,
                type: file.mimetype.startsWith('video') ? 'video' : 'image',
                postId: post.id
            })
        }

        res.status(201).json({ message: "Пост створено" });

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getAll(req, res) {
    const { user_id } = req.query;
    const userId = user_id;

    try {
        if (!userId) {
            throw ApiError.BadRequest("Неможливо отримати пости, невідомий користувач")
        }

        const posts = await Post.findAll({
            where: {
                userId
            },
            include: [{
                model: PostMedia,
                attributes: ["id", "filename", "type"]
            }]
        });

        if (!posts || !posts.length) {
            res.status(200).json({ posts: [] });
        } else {
            const cleanPosts = posts.map(post => post.dataValues);
            res.status(200).json({ posts: cleanPosts });
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getOne(req, res) {
    const { postId } = req.params;

    try {
        if (!postId) {
            throw ApiError.BadRequest("Неможливо отримати пост, невірний ідентифікатор")
        }

        const post = await Post.findOne({
            where: {
                id: postId
            },
            include: [
                {
                    model: PostMedia,
                    attributes: ["id", "filename", "type"]
                },
                {
                    model: User,
                    attributes: ["id", "nickname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["avatar", "id"]
                    }]
                }
            ]
        });

        if (!post) {
            throw ApiError.BadRequest("Неможливо отримати пост, пост не знайдено")
        } else {
            const cleanPost = post.dataValues;
            res.status(200).json(cleanPost);
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function deletePost(req, res) {
    const { postId, userId } = req.body;

    try {
        if (!postId || !userId) {
            throw ApiError.BadRequest("Не можна видалити пост");
        }

        const foundPost = await Post.findOne({
            where: {
                id: postId,
                userId
            }
        });

        if (!foundPost) {
            throw ApiError.BadRequest("Поста не існує")
        }

        foundPost.destroy();
        res.status(200).json({ message: "Пост видалено" })
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function updatePost(req, res) {
    const { description, id } = req.body;

    try {

        if (!description || !id) {
            throw ApiError.BadRequest("Неможливо редагувати пост");
        }

        const foundPost = await Post.findOne({ where: { id } });

        if (!foundPost) {
            throw ApiError.BadRequest("Неможливо редагувати, пост не знайдено");
        } else {
            const [affectedCount] = await Post.update({ description }, {
                where: {
                    id
                }
            });

            if (affectedCount === 0) {
                throw ApiError.BadRequest("Неможливо редагувати пост, можливо його не існує");
            } else {
                const foundPost = await Post.findOne({ where: { id } });
                const post = foundPost.dataValues;
                res.status(200).json(post)
            }
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const postsController = {
    create,
    getAll,
    getOne,
    deletePost,
    updatePost
}