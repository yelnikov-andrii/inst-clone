import express from 'express';
import { savedController } from '../controllers/savedController.js';

export const savedRouter = express.Router();

savedRouter.post('/posts/:postId/save', savedController.toggleSave);
savedRouter.get('/posts-saved', savedController.getAll);
savedRouter.get('/posts/:postId/saved-status', savedController.getStatus);