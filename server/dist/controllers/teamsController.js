"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTeamInvite = exports.getLastNewsAndTopUsers = exports.getStatistics = exports.removeMember = exports.validateInvitation = exports.revokeInvitation = exports.makeInvitation = exports.getTeamInvitations = exports.getMemberInvitations = exports.updateMemberRole = exports.getMembersByTeam = exports.getAllTeamsByUser = exports.create = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const teamsService_1 = __importDefault(require("../services/teamsService"));
// Create team
const create = async (req, res) => {
    const { userId, teamName } = req.body;
    try {
        const news = await teamsService_1.default.createTeam(userId, teamName);
        res.status(201).json(news);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.create = create;
// Get all teams by user
const getAllTeamsByUser = async (req, res) => {
    const { userId } = req.query;
    try {
        const response = await teamsService_1.default.getAllByUser(userId);
        res.status(201).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.getAllTeamsByUser = getAllTeamsByUser;
// Get all members by team
const getMembersByTeam = async (req, res) => {
    const { teamId } = req.query;
    try {
        const members = await teamsService_1.default.getMembers(teamId);
        res.status(201).json(members);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.getMembersByTeam = getMembersByTeam;
const updateMemberRole = async (req, res) => {
    try {
        const { teamId, userId, roleValue } = req.body;
        try {
            const response = await teamsService_1.default.updateRole(teamId, userId, roleValue);
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
    catch (error) {
        console.error("Error on update member role:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateMemberRole = updateMemberRole;
const getMemberInvitations = async (req, res) => {
    try {
        const { teamId } = req.query;
        try {
            const response = await teamsService_1.default.getInvitationsByTeam(teamId);
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
    catch (error) {
        console.error("Erro ao atualizar o papel:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};
exports.getMemberInvitations = getMemberInvitations;
const getTeamInvitations = async (req, res) => {
    try {
        const { userEmail } = req.query;
        try {
            const response = await teamsService_1.default.getInvitationsByUser(userEmail);
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
    catch (error) {
        console.error("Erro ao atualizar o papel:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};
exports.getTeamInvitations = getTeamInvitations;
const makeInvitation = async (req, res) => {
    const { teamId, userEmail } = req.body;
    try {
        const response = await teamsService_1.default.createInvite(teamId, userEmail);
        if ("error" in response) {
            res.status(400).json({ error: response.error });
            return;
        }
        res.status(201).json(response);
    }
    catch (error) {
        console.error("Unexpected error on create invite:", error);
        res.status(500).json({ message: "Unexpected error occurred" });
    }
};
exports.makeInvitation = makeInvitation;
const revokeInvitation = async (req, res) => {
    const { inviteId } = req.body;
    try {
        const response = await teamsService_1.default.deleteInvite(inviteId);
        res.status(201).json(response);
    }
    catch (error) {
        console.error("Unexpected error on create invite:", error);
        res.status(500).json({ message: "Unexpected error occurred" });
    }
};
exports.revokeInvitation = revokeInvitation;
const validateInvitation = async (req, res) => {
    const { token } = req.query;
    try {
        const { invitationId, email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let redirect = `/auth/creator?method=register&email=${email}`;
        let message = `Token is valid, redirecting to register page!`;
        const userInSystem = await teamsService_1.default.getInvitationsByUser(email);
        if (userInSystem) {
            redirect = "/auth/creator?method=login";
            message = "Make login and access system to accept invite!";
        }
        res.status(200).json({ message, redirect });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError") {
                res
                    .status(400)
                    .json({ message: "Token expired", code: "TOKEN_EXPIRED" });
            }
            else {
                res
                    .status(400)
                    .json({ message: "Invalid token", code: "INVALID_TOKEN" });
            }
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};
exports.validateInvitation = validateInvitation;
const removeMember = async (req, res) => {
    const { teamId, memberId } = req.body;
    try {
        const response = await teamsService_1.default.removeUser(teamId, memberId);
        res.status(201).json(response);
    }
    catch (error) {
        console.error("Unexpected error on remove member:", error);
        res.status(500).json({ message: "Unexpected error occurred" });
    }
};
exports.removeMember = removeMember;
const getStatistics = async (req, res) => {
    const { teamId, type } = req.query;
    let key = null;
    switch (type) {
        case "recentViews":
            key = "views";
            break;
        case "likeRate":
            key = "likes";
            break;
        default:
            break;
    }
    const response = await teamsService_1.default.getStatisticsByTeam(teamId, key);
    res.status(201).json({ data: response });
};
exports.getStatistics = getStatistics;
const getLastNewsAndTopUsers = async (req, res) => {
    const { teamId } = req.query;
    const response = await teamsService_1.default.getLastFiveNewsAndTopUsers(teamId);
    res.status(201).json({ data: response });
};
exports.getLastNewsAndTopUsers = getLastNewsAndTopUsers;
const handleTeamInvite = async (req, res) => {
    const { userId, invitationId, action } = req.body;
    try {
        const response = await teamsService_1.default.updateTeamInvitation(userId, invitationId, action);
        res.status(201).json({ message: "Success", user: response });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
};
exports.handleTeamInvite = handleTeamInvite;
