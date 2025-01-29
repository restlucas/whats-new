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

export const fetchTeamsByUser = async (userId: string) => {
  try {
    return await axiosInstance.get("/team/all", { params: { userId } });
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};

export const fetchMembers = async (teamId: string) => {
  try {
    return await axiosInstance.get("/team/members", { params: { teamId } });
  } catch (error) {
    console.log("Error on fetching team members: ", error);
    throw new Error("Failed to fetch members");
  }
};

export const updateMemberRole = async (
  teamId: string,
  userId: string,
  roleValue: string
) => {
  try {
    return await axiosInstance.put("/team/member/role", {
      teamId,
      userId,
      roleValue,
    });
  } catch (error) {
    console.log("Error on updating member role: ", error);
    throw new Error("Failed to update member role");
  }
};

export const getMemberInvitations = async (teamId: string) => {
  try {
    return await axiosInstance.get("/team/invitations/members", {
      params: {
        teamId,
      },
    });
  } catch (error) {
    console.log("Error on get member Invitations: ", error);
    throw new Error("Failed to get member Invitations");
  }
};

export const getTeamInvitations = async (userEmail: string) => {
  try {
    return await axiosInstance.get("/team/invitations", {
      params: {
        userEmail,
      },
    });
  } catch (error) {
    console.log("Error on get team invitations: ", error);
    throw new Error("Failed to get member team invitations");
  }
};

export const sendInvitation = async (teamId: string, userEmail: string) => {
  try {
    const response = await axiosInstance.post("/team/invitations", {
      teamId,
      userEmail,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const revokeInvitation = async (inviteId: string) => {
  try {
    return await axiosInstance.delete("/team/invitations", {
      data: { inviteId },
    });
  } catch (error) {
    console.log("Error on revoke user invite: ", error);
    throw new Error("Failed on revoke member invite");
  }
};

export const removeMember = async (teamId: string, memberId: string) => {
  try {
    return await axiosInstance.delete("/team/member", {
      data: { teamId, memberId },
    });
  } catch (error) {
    console.log("Error on remove user: ", error);
    throw new Error("Failed on remove member");
  }
};

export const handleTeamInvitation = async (
  userId: string,
  invitationId: string,
  action: string
) => {
  return await axiosInstance.put("/team/invitation/team", {
    userId,
    invitationId,
    action,
  });
};
