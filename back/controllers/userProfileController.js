import { Post, PostMedia, User, UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

async function getProfileInfoAboutUser(req, res) {
    try {
        const { nickname } = req.params;

        if (!nickname) {
            throw ApiError.BadRequest("Невірний нікнейм");
        }

        const response = await User.findOne({
            where: {
                nickname,
            },
            attributes: ["id", "nickname", "fullname", "createdAt"],
            include: [
                {
                    model: UserInfo,
                    attributes: ["id", "avatar", "bio"]
                },
                {
                    model: Post,
                    attributes: ["id", "description"],
                    include: [{
                        model: PostMedia,
                        attributes: ["id", "filename", "type"]
                    }]
                }
            ]
        });

        const profileInfo = response.dataValues;
        res.status(200).json(profileInfo);

    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const userProfileController = {
    getProfileInfoAboutUser
}