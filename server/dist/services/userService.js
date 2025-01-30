"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userService = {
    async createUser(data) {
        const { name, username, email, password, invitationId, registerMode: role, } = data;
        const userUsernameExist = await db_1.default.user.findUnique({
            where: {
                username,
            },
        });
        if (userUsernameExist) {
            return { error: "Username already exists" };
        }
        const userEmailExist = await db_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (userEmailExist) {
            return { error: "Email already exists" };
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                role,
            },
        });
        if (invitationId) {
            const invitationInfo = await db_1.default.invitation.update({
                where: {
                    id: invitationId,
                },
                data: {
                    status: "ACCEPTED",
                },
            });
            await db_1.default.teamMember.create({
                data: {
                    teamId: invitationInfo.teamId,
                    userId: user.id,
                },
            });
        }
        return user;
    },
    async getUserByKey(key, value) {
        const user = await db_1.default.user.findFirst({
            where: {
                [key]: value,
            },
        });
        return user;
    },
    async updateProfile(userId, data) {
        const { image, name, password } = data;
        const updateData = {};
        if (image !== "")
            updateData.image = image;
        if (name !== "")
            updateData.name = name;
        if (password !== "")
            updateData.password = password;
        return await db_1.default.user.update({
            where: {
                id: userId,
            },
            data: updateData,
            select: {
                id: true,
                username: true,
                name: true,
                image: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    },
    async updatePassword(userId, newPassword) {
        const user = await db_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            return { error: "User not found" };
        }
        return await db_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                password: newPassword,
            },
        });
    },
    async getUserFavorites(userId) {
        return await db_1.default.user.findUnique({
            where: { id: userId },
        });
    },
    async getLikes(userId) {
        const likes = await db_1.default.like.findMany({
            where: {
                userId,
            },
            select: {
                newsId: true,
            },
        });
        return likes.map((like) => like.newsId);
    },
    async createLike(userId, newsId) {
        return await db_1.default.like.create({
            data: {
                newsId,
                userId,
            },
        });
    },
    async deleteLike(userId, newsId) {
        return await db_1.default.like.delete({
            where: {
                userId_newsId: {
                    userId,
                    newsId,
                },
            },
        });
    },
    async createCommentLike(userId, commentId) {
        return await db_1.default.commentLike.create({
            data: {
                commentId,
                userId,
            },
        });
    },
    async deleteCommentLike(userId, commentId) {
        return await db_1.default.commentLike.delete({
            where: {
                userId_commentId: {
                    userId,
                    commentId,
                },
            },
        });
    },
    async createResetToken(userId, token) {
        return await db_1.default.resetPasswordToken.create({
            data: {
                userId,
                token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
        });
    },
    async getResetToken(token) {
        return await db_1.default.resetPasswordToken.findUnique({
            where: {
                token,
            },
        });
    },
    async updateResetToken(token) {
        return await db_1.default.resetPasswordToken.update({
            where: {
                token,
            },
            data: {
                used: true,
            },
        });
    },
    async updateImage(userId, imageUrl) {
        return await db_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                image: imageUrl,
            },
        });
    },
};
exports.default = userService;
