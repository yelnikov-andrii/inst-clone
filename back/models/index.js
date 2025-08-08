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

export const UserInfo = sequelize.define('insta_user_info', {
    avatar: {
        type: DataTypes.STRING
    },
    bio: {
        type: DataTypes.TEXT
    },
    gender: {
        type: DataTypes.STRING,
    },
    showRecommendations: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    website: {
        type: DataTypes.STRING
    }
})

User.hasOne(UserInfo, { foreignKey: "userId" });
UserInfo.belongsTo(User, { foreignKey: 'userId' });
UserInfo.sync()

export const Post = sequelize.define("insta_post", {
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

Post.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: 'userId' });
Post.sync();

export const PostMedia = sequelize.define("post_media", {
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Post.hasMany(PostMedia, { foreignKey: "postId"});
PostMedia.belongsTo(Post, { foreignKey: 'postId'});

PostMedia.sync();

export const Like = sequelize.define('insta_like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Post.hasMany(Like, {foreignKey: 'postId'});
Like.belongsTo(Post, {foreignKey: 'postId'});

User.hasMany(Like, {foreignKey: 'userId'});
Like.belongsTo(User, {foreignKey: 'userId'});

Like.sync();

export const Comment = sequelize.define("comment_inst", {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Post.hasMany(Comment, {foreignKey: 'postId'});
Comment.belongsTo(Post, {foreignKey: 'postId'});

User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

Comment.sync();

export const Saved = sequelize.define('insta_saved', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Post.hasMany(Saved, {foreignKey: 'postId'});
Saved.belongsTo(Post, {foreignKey: 'postId'});

User.hasMany(Saved, {foreignKey: 'userId'});
Saved.belongsTo(User, {foreignKey: 'userId'});

Saved.sync();