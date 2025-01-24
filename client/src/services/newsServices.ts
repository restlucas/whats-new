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

interface NewsByTeamProps {
  teamId: string;
  page: number;
  pageSize: number;
  filters: FilterProps;
}

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
