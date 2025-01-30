"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const contactService = {
    async createMessage(data) {
        return await prisma.contact.create({
            data,
        });
    },
};
exports.default = contactService;
