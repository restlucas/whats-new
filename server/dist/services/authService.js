"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const authService = {
    async check(token) {
        if (!token) {
            return { error: "Not authenticated" };
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return { error: "Invalid token" };
            }
            return { user };
        });
    },
    async login(username, pwd, entranceRole) {
        let userFound = await prisma.user.findUnique({
            where: {
                username,
                role: entranceRole,
            },
            select: {
                id: true,
                image: true,
                role: true,
                name: true,
                username: true,
                email: true,
                password: true,
                createdAt: true,
            },
        });
        if (!userFound) {
            userFound = await prisma.user.findUnique({
                where: {
                    username,
                    role: "ADMIN",
                },
                select: {
                    id: true,
                    role: true,
                    image: true,
                    name: true,
                    username: true,
                    email: true,
                    password: true,
                    createdAt: true,
                },
            });
        }
        if (!userFound || !(await bcryptjs_1.default.compare(pwd, userFound.password))) {
            return { error: "Invalid credentials" };
        }
        const token = jsonwebtoken_1.default.sign({ id: userFound.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        const { password, ...user } = userFound;
        return { token, user };
    },
};
exports.default = authService;
