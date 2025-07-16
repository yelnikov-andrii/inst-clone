import { Token } from "../models/index.js";

async function saveToken(user, refreshToken) {
    const foundToken = await Token.findOne({
        where: {
            InstaUserId: user.id
        }
    });

    if (foundToken) {
        foundToken.refreshToken = refreshToken;
    } else {
        await Token.create({ refreshToken, InstaUserId: user.id })
    }
}

async function removeToken(refreshToken) {
    const foundToken = await Token.findOne({
        where: {
            refreshToken
        }
    });

    if (foundToken) {
        await foundToken.destroy()
    }
}

export const TokenService = {
    saveToken,
    removeToken
}