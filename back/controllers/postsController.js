import { Post, PostMedia } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import path from 'path';

async function create(req, res) {
    const { description, userId } = req.body;
    const files = req.files.files;
    console.log(files, 'files')

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
            }
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
            }
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

export const postsController = {
    create,
    getAll,
    getOne
}