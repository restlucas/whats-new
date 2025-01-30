"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPwdReset = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const frontUrl = process.env.WHATSNEW_FRONTEND_URL;
const projectEmail = process.env.WHATSNEW_EMAIL;
const projectPwd = process.env.WHATSNEW_EMAIL_PASS;
const requestPwdReset = async (token, userEmail) => {
    const resetLink = `${frontUrl}auth/reset-password?token=${token}`;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: projectEmail,
            pass: projectPwd,
        },
    });
    const mailOptions = {
        from: projectEmail,
        to: userEmail,
        subject: "What's New | Password Reset Request",
        html: `<p>Click <a href="${resetLink}" target="_blan">here</a> to reset your password.</p>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { message: "Password reset link sent to email" };
    }
    catch (error) {
        return { message: "Failed to send reset email" };
    }
};
exports.requestPwdReset = requestPwdReset;
