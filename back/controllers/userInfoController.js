import { UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import path from 'path';

async function create(req, res) {
    const { bio, showRecommendations, gender, website, userId } = req.body;
    const avatar = req.files?.avatar;


    try {

        let uploadPath = '';

        if (avatar) {
            uploadPath = path.join('uploads', avatar.name);
            await avatar.mv(uploadPath);
        }

        if (!userId) {
            throw ApiError.BadRequest("Неможливо зебрегти інформацію, невідомий користувач")
        }

        const response = await UserInfo.create({
            bio,
            gender,
            website,
            userId,
            showRecommendations: showRecommendations ? true : false,
            avatar: uploadPath
        });

        res.status(201).json({ message: "Інформацію збережено" });

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function update(req, res) {
    const { bio, showRecommendations, gender, website, userId } = req.body;
    const avatar = req.files?.avatar;

    const userInfo = {};

    try {
        if (avatar) {
            const uploadPath = path.join('uploads', avatar.name);
            await avatar.mv(uploadPath);
            userInfo.avatar = uploadPath;
        }

        if (bio) {
            userInfo.bio = bio;
        }

        if (gender) {
            userInfo.gender = gender;
        }

        if (website) {
            userInfo.website = website;
        }

        if (!userId) {
            throw ApiError.BadRequest("Неможливо оновити інформацію, невідомий користувач")
        }

        userInfo.userId = userId;

        if (showRecommendations !== 'undefined') {
            userInfo.showRecommendations = showRecommendations === 'true';
        }

        const response = await UserInfo.update(userInfo, { where:  {
            userId
        }});

        res.status(201).json({ message: "Інформацію оновлено" });

    } catch (e) {
        console.log(e, 'error')
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getByUserId(req, res) {
    const { userId } = req.params;

    try {
        if (!userId) {
            throw ApiError.BadRequest("Користувач не знайдений")
        }

        const userInfo = await UserInfo.findOne({
            where: {
                userId
            }
        });

        if (!userInfo) {
            throw ApiError.BadRequest("Інформація відсутня");
        }

        res.status(200).json(userInfo);

    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}


export const userInfoController = {
    create,
    update,
    getByUserId
}