import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createUser } from "../controllers/userController";
import { check, login, logout } from "../controllers/authController";
import { createNews, getAllNews } from "../controllers/newsController";
import {
  create,
  getAllTeamsByUser,
  getMembersByTeam,
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
router.post("/news", authMiddleware, createNews);

// Teams crud
router.get("/teams", authMiddleware, getAllTeamsByUser);
router.post("/teams", authMiddleware, create);
router.get("/teams/members", getMembersByTeam);

export default router;
