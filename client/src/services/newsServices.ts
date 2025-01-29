import { FilterProps } from "@src/hooks/useFetchNews";
import axiosInstance from "../lib/axios";
import { buildQueryParams, QueryOptions } from "../utils/fetchHelpers";

interface HandleNewsProps {
  fields: {
    title: string;
    description: string;
    category: string;
    content: string;
  };
  slug?: string;
  teamId: string | undefined;
  userId: string;
}

interface NewsByTeamProps {
  teamId: string;
  page: number;
  pageSize: number;
  filters: FilterProps;
}

export interface Article {
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
    likeCount: number;
    isLikedByUser: boolean;
  }[];
}

export const fetchPaginateNews = async (options: QueryOptions) => {
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

export const fetchArticle = async (
  articleSlug: string,
  userId?: string
): Promise<Article> => {
  try {
    const params = {
      slug: articleSlug,
      api_key: "a_super_secret_api_key",
      userId,
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

export const handleNews = async (
  data: HandleNewsProps,
  action: "post" | "put"
) => {
  try {
    const response = await axiosInstance[action]("/news", data, {
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

export const makeComment = async (
  userId: string,
  newsId: string,
  comment: string
) => {
  const response = await axiosInstance.post(
    "/news/comment",
    { userId, newsId, comment },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

export const fetchEditHistoryByTeam = async (teamId: string) => {
  const response = await axiosInstance.get("/news/edit/history", {
    params: { teamId },
  });
  return response.data;
};
