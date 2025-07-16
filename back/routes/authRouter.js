import express from 'express';
import { authController } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/activate', authController.activate);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);