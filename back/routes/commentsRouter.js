import express from 'express';
import { commentsController } from '../controllers/commentsController.js';

export const commentsRouter = express.Router();

commentsRouter.post('/comments', commentsController.create);
commentsRouter.get('/comments-post/:postId', commentsController.getPostComments);
commentsRouter.delete('/comments/:commentId', commentsController.deleteComment);