import { FilterProps } from "@src/hooks/useFetchNews";
import axiosInstance from "../lib/axios";
import { buildQueryParams, QueryOptions } from "../utils/fetchHelpers";

interface CreateNewsProps {
  fields: {
    title: string;
    description: string;
    category: string;
    content: string;
  };
  teamId: string;
  userId: string;
}

interface NewsByTeamProps {
  teamId: string;
  page: number;
  pageSize: number;
  filters: FilterProps;
}

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  country: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  teamMember: {
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  comments: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

export const fetchNews = async (options: QueryOptions) => {
  try {
    const params = {
      ...buildQueryParams(options),
      api_key: "a_super_secret_api_key",
    };

    const response = await axiosInstance.get("/news", {
      params,
    });

    const {
      data: { news, nextPage, total },
    } = response;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      data: news || [],
      nextPage,
      total,
    };
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw new Error("Failed to fetch top headlines");
  }
};

export const fetchArticle = async (articleSlug: string): Promise<Article> => {
  try {
    const params = {
      slug: articleSlug,
      api_key: "a_super_secret_api_key",
    };

    const response = (await axiosInstance.get("/news/article", {
      params,
    })) as { data: Article };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Error("Failed to fetch article");
  }
};

export const fetchNewsByTeam = async ({
  teamId,
  page = 1,
  pageSize = 10,
  filters,
}: NewsByTeamProps) => {
  try {
    return await axiosInstance.get("/news/team", {
      params: {
        teamId,
        page,
        pageSize,
        filters,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching news by team:", error);
    throw new Error("Failed to fetch news by team");
  }
};

export const createNews = async (data: CreateNewsProps) => {
  try {
    const response = await axiosInstance.post("/news", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { status: response.status, message: response.statusText };
  } catch (error) {
    console.error("Error creating news:", error);
    throw new Error("Failed to create news");
  }
};

export const removeNews = async (newsId: string) => {
  try {
    const response = await axiosInstance.delete("/news", {
      data: { newsId },
    });

    return { status: response.status, message: response.statusText };
  } catch (error) {
    console.error("Error delete news:", error);
    throw new Error("Failed to delete news");
  }
};

export const incrementViews = async (slug: string): Promise<void> => {
  await axiosInstance.post("/news/article/views", {
    slug,
    api_key: "a_super_secret_api_key",
  });
};
