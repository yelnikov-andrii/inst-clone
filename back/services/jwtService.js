import jwt from 'jsonwebtoken';
import 'dotenv/config'

function generateAccessToken(user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '5s'
    });

    return token;
}

function generateRefreshToken(user) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    return token;
}

export const jwtService = {
    generateAccessToken,
    generateRefreshToken
}