import { User, Token } from "../models/index.js";
import { UserService } from "../services/userService.js";
import { ApiError } from "../utils/ApiError.js";
import { jwtService } from "../services/jwtService.js";
import bcrypt from 'bcrypt';
import { TokenService } from "../services/tokenService.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

async function register(req, res) {
    const { login, password, nickname, fullname } = req.body;

    try {
        const response = await UserService.register({ login, password, nickname, fullname });

        if (response) {
            res.status(201).json({ message: "Користувача створено" });
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function validateUserDataAndSendAuth(user, password, res) {
    if (!user) {
        throw ApiError.BadRequest("Користувача не знайдено")
    }

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw ApiError.BadRequest("Невірний логін або пароль")
        }
        await sendAutenthication(user, res);
    }
}

function normalizeUser(user) {
    return user.get({ plain: true });
}

async function login(req, res) {
    try {
        const { login, password } = req.body;

        const isEmail = !UserService.validateLogin(login);

        if (isEmail) {
            const foundUserByEmail = await UserService.getUserByEmail(login);
            if (foundUserByEmail) {
                const userData = normalizeUser(foundUserByEmail);
                await validateUserDataAndSendAuth(userData, password, res);
            }


        } else {
            const foundUserByNickname = await UserService.getUserByNickname(login);
            if (foundUserByNickname) {
                const userData = normalizeUser(foundUserByNickname);
                await validateUserDataAndSendAuth(userData, password, res);
            }

        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function sendAutenthication(userData, res) {
    const accessToken = jwtService.generateAccessToken(userData);
    const refreshToken = jwtService.generateRefreshToken(userData);

    await TokenService.saveToken(userData, refreshToken);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    res.status(201).json({ accessToken, user: userData });
}

async function activate(req, res) {
    const { code, nickname } = req.body;

    try {
        const foundUser = await UserService.getUserByNickname(nickname);

        if (!foundUser) {
            throw ApiError.BadRequest("Користувача не знайдено")
        }

        if (foundUser) {

            if (!foundUser.activationToken) {
                throw ApiError.BadRequest("Користувач вже зареєстроваий")
            }

            if (foundUser.activationToken.trim() !== code.trim()) {
                throw ApiError.BadRequest("Невірний код")
            } else {
                foundUser.activationToken = null;
                await foundUser.save();

                const userData = foundUser.get({ plain: true });
                await sendAutenthication(userData, res);
            }
        }
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function logout(req, res) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            res.status(200).json({ message: "Вже вийшли" })
        }

        if (refreshToken) {
            await TokenService.removeToken(refreshToken);
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({ message: 'Успішний вихід' })

    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

async function refresh(req, res) {
    try {
        const { refreshToken } = req?.cookies;

        if (!refreshToken) {
            throw ApiError.UnAuthorized();
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw ApiError.UnAuthorized();
            }

            const { exp, iat, ...payload } = user;

            const accessToken = jwtService.generateAccessToken(payload);
            res.status(201).json({ accessToken });
        })


    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || 'Помилка сервера' });
    }
}

export const authController = {
    register,
    activate,
    login,
    logout,
    refresh
}