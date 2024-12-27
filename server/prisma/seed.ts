import {
  PrismaClient,
  News as PrismaNews,
  User as PrismaUser,
  Favorite as PrismaFavorite,
} from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Definindo as categorias e países
const categories = [
  "world",
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "games",
];
const countries = ["US", "FR", "GB", "CN", "CA", "IT", "RU", "ES", "BR"];

async function getRandomImageUrl() {
  const url = `https://picsum.photos/800/600`;
  return url;
}

async function getRandomRow(): Promise<PrismaUser | null> {
  const totalRecords = await prisma.user.count();

  if (totalRecords === 0) return null;

  const randomIndex = Math.floor(Math.random() * totalRecords);

  const randomRow = await prisma.user.findMany({
    take: 1,
    skip: randomIndex,
  });

  return randomRow[0];
}

async function createSpecificUser() {
  const hashedPassword = await bcrypt.hash("123", 10);

  return await prisma.user.create({
    data: {
      name: "Lucas Souza de Oliveira",
      username: "restlucas",
      email: "restlucas.dev@gmail.com",
      password: hashedPassword,
    },
  });
}

// Função para criar um usuário
async function createUser() {
  return await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });
}

// Função para criar notícias
async function createNews(country: string): Promise<PrismaNews[]> {
  const news: PrismaNews[] = []; // Tipando explicitamente o array como PrismaNews[]
  for (const category of categories) {
    for (let i = 0; i < 20; i++) {
      const title = faker.lorem.sentence(10); // Título com até 10 palavras
      const description = faker.lorem.sentence(30); // Descrição curta
      const content = faker.lorem.paragraphs(6); // Conteúdo com no mínimo 6 parágrafos
      const views = faker.number.int({ min: 100, max: 1000 }); // Views aleatórios
      const likes = faker.number.int({ min: 10, max: 500 }); // Likes aleatórios
      const image = await getRandomImageUrl();

      const { id: userId } = (await getRandomRow()) as PrismaUser;

      const newsItem = await prisma.news.create({
        data: {
          image,
          title,
          description,
          content,
          views,
          likes,
          country,
          category,
          userId,
        },
      });

      news.push(newsItem);
    }
  }
  return news;
}

// Função para criar favoritos
async function createFavorites(newsList: PrismaNews[]) {
  const favoriteNews: PrismaFavorite[] = [];
  const randomNews = faker.helpers.shuffle(newsList).slice(0, 5); // Favoritar 5 notícias aleatórias

  const { id: userId } = (await getRandomRow()) as PrismaUser;

  for (const news of randomNews) {
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        newsId: news.id,
      },
    });
    favoriteNews.push(favorite);
  }
}

// Função principal para popular o banco de dados
async function seedDatabase() {
  try {
    const specificUser = await createSpecificUser();
    console.log("Specific user created:", specificUser);

    // Criação de 10 usuários
    const users: PrismaUser[] = [];
    for (let i = 0; i < 20; i++) {
      const user = await createUser();
      users.push(user);
    }

    for (const country of countries) {
      const newsList = await createNews(country);
      await createFavorites(newsList);
    }

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
