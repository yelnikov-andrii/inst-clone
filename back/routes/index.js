import express from 'express';
import { authRouter } from './authRouter.js';

export const router = express.Router();

router.use(authRouter);

