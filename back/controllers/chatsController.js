import { Op } from "sequelize";
import { Chat, Message, User, UserInfo } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

async function createOrFindChat(req, res) {
    try {
        const meId = req.user.id;
        const { recipientId } = req.body;
        const foundChat = await Chat.findOne({
            where: {
                [Op.or]: [
                    { senderId: meId, recipientId },
                    { senderId: recipientId, recipientId: meId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'Sender',
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                },
                {
                    model: User,
                    as: "Recipient",
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                }
            ]
        });

        if (foundChat) {
            res.status(201).json(foundChat);
        } else {
            await Chat.create({
                recipientId,
                senderId: meId
            })
            res.status(201).json({ message: "Чат створено" });
        }
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getAll(req, res) {
    try {
        const meId = req.user.id;

        const foundChats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: meId },
                    { recipientId: meId, }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'Sender',
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                },
                {
                    model: User,
                    as: "Recipient",
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                },
                {
                    model: Message,
                    attributes: ["id", "text", "senderId", "recipientId"]
                }
            ]
        });

        res.status(200).json(foundChats);
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function findOneByUserId(req, res) {
    try {
        const meId = req.user.id;
        const { recipientId } = req.params;
        const foundChat = await Chat.findOne({
            where: {
                [Op.or]: [
                    { senderId: meId, recipientId },
                    { senderId: recipientId, recipientId: meId }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'Sender',
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                },
                {
                    model: User,
                    as: "Recipient",
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                }
            ]
        });

        if (foundChat) {
            res.status(201).json(foundChat);
        } else {
            throw ApiError.BadRequest("Чат не знайдено")
        }
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function getById(req, res) {
    try {
        const { chatId } = req.params;
        const foundChat = await Chat.findOne({
            where: {
                id: chatId
            },
            include: [
                {
                    model: User,
                    as: 'Sender',
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                },
                {
                    model: User,
                    as: "Recipient",
                    attributes: ["id", "nickname", "fullname"],
                    include: [{
                        model: UserInfo,
                        attributes: ["id", "avatar"]
                    }]
                }
            ]
        });

        if (foundChat) {
            res.status(201).json(foundChat);
        } else {
            throw ApiError.BadRequest("Чат не знайдено")
        }
    }
    catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const chatController = {
    createOrFindChat,
    getAll,
    findOneByUserId,
    getById
}