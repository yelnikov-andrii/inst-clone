import { Op } from "sequelize";
import { Followers, User, UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

async function toggleFollower(req, res) {
    const { followerId, followingId } = req.body;

    try {
        if (!followerId || !followingId) {
            throw ApiError.BadRequest("Невідомий користувач")
        }

        if (followerId === followingId) {
            throw ApiError.BadRequest("Неможлива дія");
        }

        const subcribing = await Followers.findOne({
            where: {
                followerId,
                followingId
            }
        });

        if (subcribing) {
            await subcribing.destroy();
            return res.status(200).json({ isFollowed: false });
        } else {
            await Followers.create({ followerId, followingId });
            return res.status(200).json({ isFollowed: true });
        }


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getFollowers(req, res) {
    try {
        const { followerId, followingId } = req.query;

        if (followerId) {
            const user = await User.findByPk(followerId, {
                attributes: ["id", "fullname", "nickname", "createdAt"],
                include: [
                    {
                        model: User,
                        as: "Following",
                        attributes: ["id", "nickname", "fullname"],
                        include: [{
                            model: UserInfo,
                            attributes: ["id", "avatar"]
                        }]
                    }]
            });

            res.status(200).json(user);
        }

        if (followingId) {
            const user = await User.findByPk(followingId, {
                attributes: ["id", "fullname", "nickname", "createdAt"],
                include: [
                    {
                        model: User,
                        as: 'Followers',
                        attributes: ['id', 'nickname', 'fullname'],
                        include: [{
                            model: UserInfo,
                            attributes: ["id", "avatar"]
                        }]
                    }
                ]
            })

            res.status(200).json(user);
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }

}

async function getRecommendations(req, res) {
    try {
        const { userId } = req.params;

        if (userId) {
            const allFollowers = await Followers.findAll();
            const ids = [];

            for (let follower of allFollowers) {
                if (follower.followingId === +userId) {
                    ids.push(follower.followerId);
                }
            }

            const recommendations = await User.findAll({
                where: {
                    id: {
                        [Op.notIn]: ids
                    }
                },
                attributes: ["id", "fullname", "nickname", "createdAt"],
                include: [{
                    model: UserInfo,
                    attributes: ["id", "avatar"]
                }]
            })

            res.status(200).json(recommendations);
        }
    } catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }

}

export const followersController = {
    toggleFollower,
    getFollowers,
    getRecommendations
}