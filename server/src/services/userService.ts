import prisma from "../utils/db";
import bcrypt from "bcryptjs";

const userService = {
  async createUser(
    name: string,
    username: string,
    email: string,
    password: string
  ) {
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

    return await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
  },

  async getUserFavorites(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },
};

export default userService;
