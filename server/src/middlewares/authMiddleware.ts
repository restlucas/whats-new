import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client"; // Importa o tipo User do Prisma

interface CustomRequest extends Request {
  user?: User;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(
    token["@whats-new:token"],
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = decoded as User; // Agora req.user é do tipo User
      next(); // Chama o próximo middleware ou rota
    }
  );
};

export default authMiddleware;
