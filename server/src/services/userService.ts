import prisma from "../utils/db";
import bcrypt from "bcryptjs";

interface CreateUserData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  invitationId: string;
}

const userService = {
  async createUser(data: CreateUserData) {
    const { name, username, email, password, invitationId } = data;

    const userUsernameExist = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userUsernameExist) {
      return { error: "Username already exists" };
    }

    const userEmailExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userEmailExist) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    if (invitationId) {
      const invitationInfo = await prisma.invitation.update({
        where: {
          id: invitationId,
        },
        data: {
          status: "ACCEPTED",
        },
      });

      await prisma.teamMember.create({
        data: {
          teamId: invitationInfo.teamId,
          userId: user.id,
        },
      });
    }

    return user;
  },

  async updateProfile(userId: string, name: string, password: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  async getUserFavorites(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  async getLikes(userId: string) {
    const likes = await prisma.like.findMany({
      where: {
        userId,
      },
      select: {
        newsId: true,
      },
    });

    return likes.map((like) => like.newsId);
  },

  async createLike(userId: string, newsId: string) {
    return await prisma.like.create({
      data: {
        newsId,
        userId,
      },
    });
  },

  async deleteLike(userId: string, newsId: string) {
    return await prisma.like.delete({
      where: {
        userId_newsId: {
          userId,
          newsId,
        },
      },
    });
  },

  async createCommentLike(userId: string, commentId: string) {
    return await prisma.commentLike.create({
      data: {
        commentId,
        userId,
      },
    });
  },

  async deleteCommentLike(userId: string, commentId: string) {
    return await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  },
};

export default userService;
