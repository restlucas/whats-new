import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authService = {
  async check(token: string) {
    if (!token) {
      return { error: "Not authenticated" };
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return { error: "Invalid token" };
      }
      return { user };
    });
  },

  async login(username: string, pwd: string) {
    const userFound = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        teamMember: {
          select: {
            role: true,
            team: {
              select: {
                id: true,
                name: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!userFound || !(await bcrypt.compare(pwd, userFound.password))) {
      return { error: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: userFound.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    const { password, ...user } = userFound;

    return { token, user };
  },
};

export default authService;
