import express from 'express';
import { mediaController } from '../controllers/mediaController.js';

export const mediaRouter = express.Router();

mediaRouter.get('/posts-media/:postId', mediaController.getAll);