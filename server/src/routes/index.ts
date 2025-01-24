import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createUser } from "../controllers/userController";
import { check, login, logout } from "../controllers/authController";
import {
  createNews,
  deleteNews,
  getAllNews,
  getFullArticle,
  getResumeNewsByTeam,
  incrementViews,
} from "../controllers/newsController";
import {
  create,
  getAllTeamsByUser,
  getMembersByTeam,
  getTeamInvitations,
  makeInvitation,
  removeMember,
  revokeInvitation,
  updateMemberRole,
  validateInvitation,
} from "../controllers/teamsController";

const router = Router();

// Login
router.get("/auth/check", check);

router.post("/auth/login", login);
router.post("/auth/logout", logout);

// Users crud
router.post("/users", createUser);

// News crud
router.get("/news", getAllNews);
router.get("/news/team", authMiddleware, getResumeNewsByTeam);
router.get("/news/article", getFullArticle);

router.post("/news", authMiddleware, createNews);
router.post("/news/article/views", incrementViews);

router.delete("/news", authMiddleware, deleteNews);

// Teams crud
router.get("/teams", authMiddleware, getAllTeamsByUser);
router.get("/teams/user", authMiddleware, getAllTeamsByUser);
router.get("/teams/members", getMembersByTeam);
router.get("/teams/invitations", authMiddleware, getTeamInvitations);
router.get("/teams/invitations/validate", validateInvitation);

router.post("/teams", authMiddleware, create);
router.post("/teams/invitations", authMiddleware, makeInvitation);

router.put("/teams/member/role", authMiddleware, updateMemberRole);

router.delete("/teams/member", removeMember);
router.delete("/teams/invitations", authMiddleware, revokeInvitation);

export default router;
