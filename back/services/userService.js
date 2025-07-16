import { Token, User } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { emailService } from "./emailService.js";
import { jwtService } from "./jwtService.js";
import bcrypt from 'bcrypt';

function validateLogin(value) {
    if (!value) {
        return 'Поле не може бути порожнім';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Введіть коректну адресу електронної пошти';
    }

    return null;
}

function validatePassword(password) {
    if (password?.length < 5) {
        return "Пароль має бути не менше 5 символів"
    }
}

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

async function getUserByEmail(email) {
    const foundByLogin = await User.findOne({
        where: {
            login: email
        }
    });

    return foundByLogin;
}

async function getUserByNickname(nickname) {
    const foundUserByNickname = await User.findOne({
        where: {
            nickname: nickname
        }
    });

    return foundUserByNickname;
}

async function register(user) {
    const loginError = validateLogin(user.login);
    const passwordError = validatePassword(user.password);

    const foundUserByNickname = await getUserByNickname(user.nickname);
    const foundByLogin = await getUserByEmail(user.login);

    if (foundByLogin) {
        throw ApiError.Conflict("Користувач вже існує з цим логіном")
    }

    if (foundUserByNickname) {
        throw ApiError.Conflict("Користувач з таким нікнеймом вже є");
    }

    if (loginError || passwordError) {
        throw ApiError.BadRequest("Помилка логіну або паролю", { loginError, passwordError })
    }

    const code = generateCode();
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({ ...user, password: hashedPassword, activationToken: code });

    try {
        await emailService.sendCode(code, user.login);
    } catch (err) {
        throw ApiError.Internal("Не вдалося надіслати листа");
    }

    if (newUser) {
        return newUser;
    }
}

export const UserService = {
    register,
    validateLogin,
    getUserByEmail,
    getUserByNickname
}