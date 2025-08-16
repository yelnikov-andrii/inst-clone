import express from "express";
import { usersController } from "../controllers/usersController.js";

export const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAll);