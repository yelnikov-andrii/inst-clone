import express from "express";
import { followersController } from "../controllers/followersController.js";

export const followersRouter = express.Router();


followersRouter.get('/followers', followersController.getFollowers);
followersRouter.post('/followers', followersController.toggleFollower);