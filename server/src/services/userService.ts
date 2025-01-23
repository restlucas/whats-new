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

    return user;
  },

  async getUserFavorites(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },
};

export default userService;
