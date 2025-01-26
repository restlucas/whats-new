import jwt from "jsonwebtoken";
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
  const { userId } = req.query;

  try {
    const response = await teamsService.getAllByUser(userId as string);
    res.status(201).json(response);
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

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const { teamId, userId, roleValue } = req.body;

    try {
      const response = await teamsService.updateRole(
        teamId as string,
        userId as string,
        roleValue as string
      );
      res.status(201).json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    console.error("Error on update member role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeamInvitations = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.query;

    try {
      const response = await teamsService.getInvitations(teamId as string);
      res.status(201).json(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar o papel:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const makeInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { teamId, userEmail } = req.body;

  try {
    const response = await teamsService.createInvite(
      teamId as string,
      userEmail as string
    );

    if ("error" in response) {
      res.status(400).json({ error: response.error });
      return;
    }

    res.status(201).json(response);
  } catch (error: unknown) {
    console.error("Unexpected error on create invite:", error);
    res.status(500).json({ message: "Unexpected error occurred" });
  }
};

export const revokeInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { inviteId } = req.body;

  try {
    const response = await teamsService.deleteInvite(inviteId as string);
    res.status(201).json(response);
  } catch (error: unknown) {
    console.error("Unexpected error on create invite:", error);
    res.status(500).json({ message: "Unexpected error occurred" });
  }
};

export const validateInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    res.status(200).json({ message: "Token is valid", decoded });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res
          .status(400)
          .json({ message: "Token expired", code: "TOKEN_EXPIRED" });
      } else {
        res
          .status(400)
          .json({ message: "Invalid token", code: "INVALID_TOKEN" });
      }
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const removeMember = async (req: Request, res: Response) => {
  const { teamId, memberId } = req.body;

  try {
    const response = await teamsService.removeUser(
      teamId as string,
      memberId as string
    );
    res.status(201).json(response);
  } catch (error: unknown) {
    console.error("Unexpected error on remove member:", error);
    res.status(500).json({ message: "Unexpected error occurred" });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
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

  const response = await teamsService.getStatisticsByTeam(
    teamId as string,
    key as string
  );

  res.status(201).json({ data: response });
};

export const getLastNewsAndTopUsers = async (req: Request, res: Response) => {
  const { teamId } = req.query;

  const response = await teamsService.getLastFiveNewsAndTopUsers(
    teamId as string
  );

  res.status(201).json({ data: response });
};
