import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetAllNewsParams {
  country?: string;
  category?: string;
  page: number;
  size: number;
  sortBy: string;
}

const newsService = {
  async createNews(
    title: string,
    content: string,
    description: string,
    country: string,
    category: string,
    userId: string
  ) {
    return prisma.news.create({
      data: {
        title,
        content,
        userId,
        description,
        country,
        category,
      },
    });
  },

  async getAllNews({
    country,
    category,
    page,
    size,
    sortBy,
  }: GetAllNewsParams) {
    // Construir os filtros para a consulta
    const filters: any = {};
    if (country) filters.country = country;
    if (category) filters.category = category;

    // Definir a ordem de acordo com o parâmetro sortBy
    let orderBy: any = {};
    if (sortBy === "publishedAt") {
      orderBy = { createdAt: "desc" };
    } else if (sortBy === "likes") {
      orderBy = { likes: "desc" };
    } else if (sortBy === "views") {
      orderBy = { views: "desc" };
    }

    // Consultar as notícias com os filtros, ordenação e paginação
    const news = await prisma.news.findMany({
      where: filters,
      orderBy: orderBy,
      skip: (page - 1) * size, // Pula os itens da página anterior
      take: size, // Limita o número de resultados por página
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Contar o número total de notícias que atendem aos critérios de filtro
    const total = await prisma.news.count({
      where: filters,
    });

    // Calcular a próxima página
    const nextPage = page * size < total ? page + 1 : null;

    return {
      news,
      total,
      nextPage,
    };
  },
};

export default newsService;
