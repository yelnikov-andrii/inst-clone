import jwt from "jsonwebtoken";
import 'dotenv/config'
import { ApiError } from "../utils/ApiError.js";

export async function authMiddleware (req, res, next) {
     try {
            const token = req.headers['authorization']?.split(' ')[1];
    
            if (!token) {
                return next(ApiError.UnAuthorized());
            }
    
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return next(ApiError.UnAuthorized());
                }

                req.user = user;
                next()
            })
    
    
        } catch(e) {
            console.log(e, 'error')
            return next(ApiError.UnAuthorized());
        }
}