import express from "express";
import { chatController } from "../controllers/chatsController.js";

export const chatsRouter = express.Router();

chatsRouter.post('/chats', chatController.createOrFindChat);
chatsRouter.get('/chats', chatController.getAll);
chatsRouter.get('/chats/:chatId', chatController.getById);
chatsRouter.get('/chats-by-user/:recipientId', chatController.findOneByUserId);