import { useState } from "react";
import { fetchMembers } from "../services/teamsServices";

export const useMembers = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getMembers = async (teamId: string) => {
    setLoading(true);

    try {
      const response = await fetchMembers(teamId);
      setMembers(response.data);
    } catch (err) {
      setError("Error on fetch member");
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
