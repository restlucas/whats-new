import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userService from "../services/userService";
import bcrypt from "bcryptjs";

// CRUD: Create user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void | any> => {
  const { token, ...rest } = req.body;
  let invitationId = "";

  if (token !== "") {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    invitationId = (decoded as any).invitationId;
  }

  const formattedData = {
    ...rest,
    invitationId,
  };

  try {
    const response = await userService.createUser(formattedData);

    if ("error" in response) {
      return res.status(401).json({ message: response.error });
    }

    return res.status(201).json({ message: "User created successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const response = await userService.updateProfile(
      userId as string,
      name as string,
      hashedPassword
    );
    res
      .status(201)
      .json({ message: "Profile updated successfully", user: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const getLikesByUser = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const likes = await userService.getLikes(userId);

    res.status(201).json({ likes: likes });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const makeLike = async (req: Request, res: Response) => {
  const { userId, newsId } = req.body;

  try {
    await userService.createLike(userId, newsId);
    res.status(201).json({ message: "Liked successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const removeLike = async (req: Request, res: Response) => {
  const { userId, newsId } = req.body;

  try {
    await userService.deleteLike(userId as string, newsId as string);
    res.status(201).json({ message: "Like removed successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const makeCommentLike = async (req: Request, res: Response) => {
  const { userId, commentId } = req.body;

  try {
    await userService.createCommentLike(userId, commentId);
    res.status(201).json({ message: "Liked successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const removeCommentLike = async (req: Request, res: Response) => {
  const { userId, commentId } = req.body;
  try {
    await userService.deleteCommentLike(userId as string, commentId as string);
    res.status(201).json({ message: "Like removed successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// CRUD: get users
// export const getUsers = async (req: Request, res: Response) => {
//   const secretKey = req.query.secret_key as string;
//   if (secretKey !== process.env.SECRET_KEY) {
//     return res.status(403).json({ message: "Secret key invalid" });
//   }

//   const users = await prisma.user.findMany();
//   res.status(200).json(users);
// };

// // CRUD: update user
// export const updateUser = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//   const updatedUser = await prisma.user.update({
//     where: { id: req.params.id },
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//     },
//   });

//   res.status(200).json(updatedUser);
// };

// // CRUD: delete user
// export const deleteUser = async (req: Request, res: Response) => {
//   await prisma.user.delete({ where: { id: req.params.id } });
//   res.status(204).json({ message: "User deleted successfully" });
// };
