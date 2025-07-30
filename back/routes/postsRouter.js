import express from 'express';
import { postsController } from '../controllers/postsController.js';

export const postsRouter = express.Router();

postsRouter.post('/posts', postsController.create);
postsRouter.get('/posts', postsController.getAll);
postsRouter.get('/posts/:postId', postsController.getOne);