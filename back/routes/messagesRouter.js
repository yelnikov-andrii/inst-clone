import express from "express";
import { messagesController } from "../controllers/messagesController.js";

export const messagesRouter = express.Router();

messagesRouter.get('/messages', messagesController.getMessagesByChatId);
messagesRouter.post('/messages', messagesController.sendMessage);