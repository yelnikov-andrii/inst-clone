import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    'Insta_User',
    {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        // Other model options go here
    },
);

User.sync()

export const Token = sequelize.define('Insta_token', {
    refreshToken: {
        type: DataTypes.TEXT,
    }
})

User.hasOne(Token);
Token.belongsTo(User);
Token.sync();