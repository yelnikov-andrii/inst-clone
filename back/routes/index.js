import express from 'express';
import { authRouter } from './authRouter.js';
import { userInfoRouter } from './userInfoRouter.js';
import { postsRouter } from './postsRouter.js';
import { mediaRouter } from './mediaRouter.js';
import { likesRouter } from './likesRouter.js';
import { commentsRouter } from './CommentsRouter.js';
import { savedRouter } from './savedRouter.js';
import { feedRouter } from './feedRouter.js';

export const router = express.Router();

router.use(authRouter);
router.use(userInfoRouter);
router.use(postsRouter);
router.use(mediaRouter);
router.use(likesRouter);
router.use(commentsRouter);
router.use(savedRouter);
router.use(feedRouter);
