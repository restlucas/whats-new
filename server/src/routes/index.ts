import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createUser,
  getLikesByUser,
  makeCommentLike,
  makeLike,
  removeCommentLike,
  removeLike,
  requestPasswordReset,
  resetPassword,
  updateProfile,
  validateToken,
} from "../controllers/userController";
import { check, login, logout } from "../controllers/authController";
import {
  createNews,
  deleteNews,
  getAllNews,
  getFullArticle,
  getResumeNewsByTeam,
  incrementViews,
  makeComment,
} from "../controllers/newsController";
import {
  create,
  getAllTeamsByUser,
  getLastNewsAndTopUsers,
  getMembersByTeam,
  getStatistics,
  getTeamInvitations,
  makeInvitation,
  removeMember,
  revokeInvitation,
  updateMemberRole,
  validateInvitation,
} from "../controllers/teamsController";
import { sendMessage } from "../controllers/contactController";

const router = Router();

// Login
router.get("/auth/check", check);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

// Users crud
router.get("/user/likes", authMiddleware, getLikesByUser);
router.post("/user", createUser);
router.post("/user/like", authMiddleware, makeLike);
router.post("/user/like/comment", authMiddleware, makeCommentLike);
router.put("/user", updateProfile);
router.delete("/user/like", authMiddleware, removeLike);
router.delete("/user/like/comment", removeCommentLike);
router.post("/users/request-reset-password", requestPasswordReset);
router.post("/users/reset-password", resetPassword);
router.get("/users/validate-token", validateToken);

// News crud
router.get("/news", getAllNews);
router.get("/news/article", getFullArticle);
router.get("/news/team", authMiddleware, getResumeNewsByTeam);
router.post("/news", authMiddleware, createNews);
router.post("/news/comment", authMiddleware, makeComment);
router.post("/news/article/views", incrementViews);
router.delete("/news", authMiddleware, deleteNews);

// Teams crud
router.get("/team/statistics", authMiddleware, getStatistics);
router.get("/team/news/members", authMiddleware, getLastNewsAndTopUsers);
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

// Contact
router.post("/contact", sendMessage);

export default router;
