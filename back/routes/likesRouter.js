import express from 'express';
import { likesController } from '../controllers/likeController.js';

export const likesRouter = express.Router();

likesRouter.post('/posts/:postId/like', likesController.toggleLike);
likesRouter.get('/posts/:postId/likes', likesController.getAll);
likesRouter.get('/posts/:postId/like-status', likesController.getLikeStatus);