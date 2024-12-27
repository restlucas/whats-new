import prisma from "../utils/db";
import { Role } from "@prisma/client";

const teamsService = {
  async createTeam(userId: string, teamName: string) {
    const teamNameExist = await prisma.team.findFirst({
      where: {
        name: teamName,
      },
    });

    if (teamNameExist) {
      return { error: "Team name already exists" };
    }

    const { id: teamId } = await prisma.team.create({
      data: {
        name: teamName,
      },
    });

    return await prisma.teamMember.create({
      data: {
        userId,
        teamId,
        role: Role.OWNER,
      },
    });
  },

  async getAllByUser(userId: string) {
    return await prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });
  },

  async getMembers(teamId: string) {
    return await prisma.teamMember.findMany({
      where: {
        teamId,
      },
      select: {
        role: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },
};

export default teamsService;
