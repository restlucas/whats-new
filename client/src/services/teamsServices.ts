import axiosInstance from "../lib/axios";

export const createTeam = async (userId: string, teamName: string) => {
  try {
    return await axiosInstance.post("/teams", {
      userId,
      teamName,
    });
  } catch (error) {
    console.log("Error on create new team: ", error);
    throw new Error("Failed to create new team");
  }
};

export const fetchTeams = async () => {
  try {
    return await axiosInstance.get("/teams");
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};

export const fetchMembers = async (teamId: string) => {
  try {
    return await axiosInstance.get("/teams/members", { params: { teamId } });
  } catch (error) {
    console.log("Error on fetching team members: ", error);
    throw new Error("Failed to fetch members");
  }
};
