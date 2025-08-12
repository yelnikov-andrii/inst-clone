import express from 'express';
import { userProfileController } from '../controllers/userProfileController.js';

export const userProfile = express.Router();

userProfile.get("/user-profile/:nickname", userProfileController.getProfileInfoAboutUser)