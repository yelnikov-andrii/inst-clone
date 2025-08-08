import { Post, PostMedia, Saved } from "../models/index.js";

async function toggleSave(req, res) {
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

        const saved = await Saved.findOne({
            where: {
                userId,
                postId
            }
        });

        if (saved) {
            await saved.destroy();
            return res.status(200).json({ saved: false });
        } else {
            await Saved.create({ postId, userId });
            return res.status(200).json({ saved: true });
        }


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getAll(req, res) {
    const { userId } = req.query;

    try {
        const savedPosts = await Saved.findAll({
            where: {
                userId
            },
            include: [{
                model: Post,
                attributes: ['id', 'description', 'createdAt', 'userId'],
                include: [{
                    model: PostMedia,
                    attributes: ['id', 'filename', 'type', 'postId']
                }]
            }]
        });

        const normalizedPosts = savedPosts.map(saved => saved?.toJSON());

        res.status(200).json(normalizedPosts);


    } catch (e) {
        console.log(e, 'error saved posts')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getStatus(req, res) {
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

        const isSaved = await Saved.findOne({ where: {
            postId,
            userId
        }})

        res.status(200).json({ saved: !!isSaved});


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка при перевірці лайку' });
    }
}

export const savedController = {
    toggleSave,
    getAll,
    getStatus
}