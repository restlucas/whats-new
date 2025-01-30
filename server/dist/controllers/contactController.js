"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const contactService_1 = __importDefault(require("../services/contactService"));
const sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await contactService_1.default.createMessage({
            name,
            email,
            subject,
            message,
        });
        res.status(201).json({ message: "Message sent successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.sendMessage = sendMessage;
