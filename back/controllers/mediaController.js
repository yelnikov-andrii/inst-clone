import { PostMedia } from "../models/index.js";

async function getAll(req, res) {
    const { postId } = req.params;

    try {
        if (!postId) {
            throw ApiError.BadRequest("Неможливо отримати медіа, невідомий пост")
        } else {
            const media = await PostMedia.findAll({ where: {
                postId
            }})

            res.status(200).json(media);
        }
    } catch(e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const mediaController = { getAll };