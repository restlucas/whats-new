import axiosInstance from "../lib/axios";
import { buildQueryParams, QueryOptions } from "../utils/fetchHelpers";

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
