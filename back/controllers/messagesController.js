import { Message } from "../models/index.js";

async function getMessagesByChatId(req, res) {
    try {
        const { chatId } = req.query;
        const messages = await Message.findAll({
            where: {
                chatId
            },
            order: [['createdAt', 'ASC']]
        });

        res.status(200).json(messages || []);

    } catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function sendMessage(req, res) {
    try {
        const { text, chatId, recipientId } = req.body;
        const senderId = req.user.id;

        const result = await Message.create({
            chatId,
            text,
            senderId,
            recipientId
        });

        res.status(201).json({ message: "Відправлено" });

    } catch (e) {
        console.log(e)
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const messagesController = {
    getMessagesByChatId,
    sendMessage
}