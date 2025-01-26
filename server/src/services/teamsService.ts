import prisma from "../utils/db";
import { TeamRole } from "@prisma/client";
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
        role: TeamRole.OWNER,
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
        role: roleValue as TeamRole,
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

  async getStatisticsByTeam(teamId: string, key: string) {
    if (key === null) {
      const result = await prisma.news.aggregate({
        _count: {
          id: true,
        },
        where: {
          teamMember: {
            teamId: teamId,
          },
        },
      });
      return result._count.id;
    }

    if (key === "likes") {
      const result = await prisma.like.count({
        where: {
          news: {
            teamMember: {
              teamId: teamId,
            },
          },
        },
      });
      return result || 0;
    }

    const result = await prisma.news.aggregate({
      _sum: {
        [key]: true,
      },
      where: {
        teamMember: {
          teamId: teamId,
        },
      },
    });

    return result._sum[key] || 0;
  },

  async getLastFiveNewsAndTopUsers(teamId: string) {
    const lastFiveNews = await prisma.news.findMany({
      where: {
        teamMember: {
          teamId: teamId,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        views: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const users = await prisma.teamMember.findMany({
      where: {
        teamId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            news: true,
          },
        },
        news: {
          select: {
            views: true,
          },
        },
      },
      orderBy: {
        news: {
          _count: "desc",
        },
      },
      take: 5,
    });

    const topUsers = users.map((user) => ({
      id: user.user.id,
      name: user.user.name,
      totalNews: user._count.news,
      totalViews: user.news.reduce((sum, news) => sum + news.views, 0),
    }));

    return {
      lastFiveNews,
      topUsers,
    };
  },
};

export default teamsService;
