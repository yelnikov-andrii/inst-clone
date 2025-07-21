import express from 'express';
import { authRouter } from './authRouter.js';
import { userInfoRouter } from './userInfoRouter.js';

export const router = express.Router();

router.use(authRouter);
router.use(userInfoRouter);

