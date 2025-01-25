import axiosInstance from "@src/lib/axios";

export const fetchStatistics = async (teamId: string, type: string) => {
  try {
    const params = { teamId, type };

    const response = await axiosInstance.get("/team/statistics", {
      params,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};

export const fetchLastNewsAndTopMembers = async (teamId: string) => {
  try {
    const params = { teamId };
    const response = await axiosInstance.get("/team/news/members", {
      params,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};
