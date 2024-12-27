import { Request, Response } from "express";
import userService from "../services/userService";

// CRUD: Create user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void | any> => {
  const { name, username, email, password } = req.body;

  try {
    const response = await userService.createUser(
      name,
      username,
      email,
      password
    );

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
