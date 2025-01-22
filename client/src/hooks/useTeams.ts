import { useState, useCallback } from "react";
import { createTeam, fetchTeams } from "../services/teamsServices";

export const useTeams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTeams = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetchTeams();
      setTeams(response.data);
    } catch (err) {
      setError("Error on fetching teams");
    } finally {
      setLoading(false);
    }
  }, []);

  const newTeam = async (userId: string, teamName: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await createTeam(userId, teamName);

      return {
        status: response.status,
        message: response.statusText,
      };
    } catch (err) {
      console.log("Error on creat new team: ", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    teams,
    loading,
    error,
    getTeams,
    newTeam,
  };
};

// export const useFetchTeams = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchTeams();

//         setTeams(response.data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { teams, loading, error };
// };
