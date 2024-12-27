import { Request, Response } from "express";
import teamsService from "../services/teamsService";

// Create team
export const create = async (req: Request, res: Response) => {
  const { userId, teamName } = req.body;

  try {
    const news = await teamsService.createTeam(userId, teamName);
    res.status(201).json(news);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get all teams by user
export const getAllTeamsByUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const news = await teamsService.getAllByUser(userId);
    res.status(201).json(news);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Get all members by team
export const getMembersByTeam = async (req: Request, res: Response) => {
  const { teamId } = req.query;

  try {
    const members = await teamsService.getMembers(teamId as string);
    res.status(201).json(members);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};
