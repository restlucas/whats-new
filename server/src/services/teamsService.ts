import prisma from "../utils/db";
import { Role } from "@prisma/client";
import { sendInviteEmail } from "./emailService";

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

  async updateRole(teamId: string, userId: string, roleValue: string) {
    return await prisma.teamMember.update({
      where: {
        userId_teamId: {
          userId: userId,
          teamId: teamId,
        },
      },
      data: {
        role: roleValue as Role,
      },
    });
  },

  async getInvitations(teamId: string) {
    return await prisma.invitation.findMany({
      where: {
        teamId: teamId,
        status: "PENDING",
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
  },

  async createInvite(teamId: string, userEmail: string) {
    const teamInfo = await prisma.team.findFirstOrThrow({
      where: {
        id: teamId,
      },
      select: {
        name: true,
      },
    });

    const userAlreadyInvited = await prisma.invitation.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (userAlreadyInvited) {
      return { error: "User already invited" };
    }

    const response = await prisma.invitation.create({
      data: {
        teamId,
        email: userEmail,
      },
    });

    try {
      await sendInviteEmail(response.id, teamInfo.name, userEmail);
    } catch (error) {
      console.error("Failed to send invitation email:", error);
      return { error: "Failed to send invitation email" };
    }

    return response;
  },

  async deleteInvite(inviteId: string) {
    return await prisma.invitation.delete({
      where: {
        id: inviteId,
      },
    });
  },

  async removeUser(teamId: string, userId: string) {
    return await prisma.teamMember.delete({
      where: {
        userId_teamId: {
          userId,
          teamId,
        },
      },
    });
  },
};

export default teamsService;
