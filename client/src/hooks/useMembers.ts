import { useState } from "react";
import { fetchMembers } from "../services/teamsServices";

interface Member {
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getMembers = async (teamId: string) => {
    setLoading(true);

    try {
      const response = await fetchMembers(teamId);
      setMembers(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) setError("Error on fetch member");
    } finally {
      setLoading(false);
    }
  };

  return {
    members,
    loading,
    error,
    getMembers,
  };
};
