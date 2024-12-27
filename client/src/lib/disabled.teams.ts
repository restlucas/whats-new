import axiosInstance from "./axios";

export const fetchTeams = async () => {
  try {
    return await axiosInstance.get("/teams");

    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};
