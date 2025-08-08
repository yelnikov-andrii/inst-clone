import express from "express";
import { feedController } from "../controllers/feedController.js";

export const feedRouter = express.Router();

feedRouter.get('/feed/:userId', feedController.getFeed);