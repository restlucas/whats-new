// import { Request, Response } from "express";
// import NewsService from "../services/newsService";

// class NewsController {
//   async create(req: Request, res: Response) {
//     const { title, content, userId, description, country, category } = req.body;
//     try {
//       const news = await NewsService.createNews(
//         title,
//         content,
//         userId,
//         description,
//         country,
//         category
//       );
//       res.status(201).json(news);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(400).json({ error: error.message });
//       }
//     }
//   }

//   async getAll(req: Request, res: Response) {
//     const {
//       country,
//       category,
//       page = 1,
//       size = 20,
//       sortBy = "publishedAt",
//     } = req.query;

//     try {
//       // Chama o serviço para obter as notícias com os filtros e paginação
//       const newsList = await NewsService.getAllNews({
//         country: country as string | undefined,
//         category: category as string | undefined,
//         page: parseInt(page as string, 10),
//         size: parseInt(size as string, 10),
//         sortBy: sortBy as string,
//       });

//       // Retorna as notícias com a contagem total e a próxima página, se houver
//       res.status(200).json(newsList);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(400).json({ error: error.message });
//       }
//     }
//   }

//   // Adicionar outros métodos como update, delete, etc.
// }

// export const newsController = new NewsController();

import { Request, Response } from "express";
import newsService from "../services/newsService";

// CRUD: create news
export const createNews = async (req: Request, res: Response) => {
  const { title, content, userId, description, country, category } = req.body;

  try {
    const news = await newsService.createNews(
      title,
      content,
      userId,
      description,
      country,
      category
    );
    res.status(201).json(news);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// CRUD: get news
export const getAllNews = async (req: Request, res: Response): Promise<any> => {
  const secretKey = req.query.api_key as string;
  const {
    country,
    category,
    page = 1,
    size = 20,
    sortBy = "publishedAt",
  } = req.query;

  try {
    if (secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ message: "Secret key invalid" });
    }

    const newsList = await newsService.getAllNews({
      country: country as string | undefined,
      category: category as string | undefined,
      page: parseInt(page as string, 10),
      size: parseInt(size as string, 10),
      sortBy: sortBy as string,
    });
    res.status(201).json(newsList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// CRUD: update news
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

// CRUD: delete news
// export const deleteUser = async (req: Request, res: Response) => {
//   await prisma.user.delete({ where: { id: req.params.id } });
//   res.status(204).json({ message: "User deleted successfully" });
// };
