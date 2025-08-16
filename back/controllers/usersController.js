import { Op } from "sequelize";
import { User, UserInfo } from "../models/index.js";

async function getAll(req, res) {
    try {
        const { query } = req.query;
        const myId = req.user.id;

        const users = await User.findAll({
            where: {
                id: {
                    [Op.ne]: myId
                },
                [Op.or]: [
                    { fullname: { [Op.iLike]: `%${query}%` } },
                    { nickname: { [Op.iLike]: `%${query}%` } }
                ]
            },
            attributes: ["id", "fullname", "nickname"],
            include: [{
                model: UserInfo,
                attributes: ["id", "avatar"]
            }]
        });

        res.status(200).json(users);

    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const usersController = {
    getAll,
}