import express from 'express';
import { userInfoController } from '../controllers/userInfoController.js';

export const userInfoRouter = express.Router();

userInfoRouter.post('/userinfo', userInfoController.create);
userInfoRouter.patch('/userinfo', userInfoController.update);
userInfoRouter.get('/userinfo/:userId', userInfoController.getByUserId)