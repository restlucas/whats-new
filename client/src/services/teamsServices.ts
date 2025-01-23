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
    return await axiosInstance.get("/teams/user", { params: { userId } });
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

export const updateMemberRole = async (
  teamId: string,
  userId: string,
  roleValue: string
) => {
  try {
    return await axiosInstance.put("/teams/member/role", {
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
    return await axiosInstance.get("/teams/invitations", {
      params: {
        teamId,
      },
    });
  } catch (error) {
    console.log("Error on get member Invitations: ", error);
    throw new Error("Failed to get member Invitations");
  }
};

export const sendInvitation = async (teamId: string, userEmail: string) => {
  try {
    const response = await axiosInstance.post("/teams/invitations", {
      teamId,
      userEmail,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Usuário já foi convidado.");
      } else {
        throw new Error(
          "Falha ao enviar o convite. Tente novamente mais tarde."
        );
      }
    } else if (error.request) {
      throw new Error("Problema de conexão. Verifique sua internet.");
    } else {
      throw new Error("Tente novamente.");
    }
  }
};

export const revokeInvitation = async (inviteId: string) => {
  try {
    return await axiosInstance.delete("/teams/invitations", {
      data: { inviteId },
    });
  } catch (error) {
    console.log("Error on revoke user invite: ", error);
    throw new Error("Failed on revoke member invite");
  }
};

export const removeMember = async (teamId: string, memberId: string) => {
  try {
    return await axiosInstance.delete("/teams/member", {
      data: { teamId, memberId },
    });
  } catch (error) {
    console.log("Error on remove user: ", error);
    throw new Error("Failed on remove member");
  }
};
