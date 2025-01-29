import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storageUtils";
import { fetchTeamsByUser } from "../services/teamsServices";

export interface Team {
  id: string;
  name: string;
  createdAt: string;
}

interface TeamContextType {
  teams: Team[] | undefined;
  setTeams: React.Dispatch<React.SetStateAction<Team[] | undefined>>;
  activeTeam: Team | null;
  loading: boolean;
  error: string | null;
  handleActiveTeam: (teamId: string) => void;
  getTeams: (userId: string) => void;
}

interface TeamContextProviderProps {
  children: ReactNode;
}

export const TeamContext = createContext({} as TeamContextType);

export function TeamContextProvider({ children }: TeamContextProviderProps) {
  const [teams, setTeams] = useState<Team[] | undefined>(undefined);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleActiveTeam = (teamId: string) => {
    const teamInfo = teams?.find((team) => team.id === teamId);
    if (!teamInfo) {
      console.error(`Team with id "${teamId}" not found`);
      return;
    }
    setLocalStorage("@whats-new:active-team", teamInfo);
    setActiveTeam(teamInfo);
  };

  const validateTeams = (
    data: { id: string; name: string; createdAt: string }[]
  ): Team[] => {
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: Expected an array.");
    }
    return data;
  };

  const updateLocalStorage = (key: string, value: Team | Team[] | null) => {
    try {
      setLocalStorage(key, value);
    } catch (error) {
      console.error(`Failed to update localStorage for key: ${key}`, error);
    }
  };

  const getTeams = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchTeamsByUser(userId);
      const fetchedTeams = validateTeams(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (fetchedTeams.length === 0) {
        setTeams([]);
        setActiveTeam(null);
        updateLocalStorage("@whats-new:active-team", null);
        console.warn("No teams found for the user.");
        return;
      }

      setTeams(fetchedTeams);
      updateLocalStorage("@whats-new:teams", fetchedTeams);

      const storedActiveTeam = getLocalStorage(
        "@whats-new:active-team"
      ) as Team;
      const initialTeam = storedActiveTeam || fetchedTeams[0];

      setActiveTeam(initialTeam);
      updateLocalStorage("@whats-new:active-team", initialTeam);
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Failed to fetch teams:", error.message || error);
      setError("Error fetching teams. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = getLocalStorage<{ id: string } | null>("@whats-new:user");

    if (user && "id" in user) {
      getTeams(user.id as string);
    }
  }, [getTeams]);

  return (
    <TeamContext.Provider
      value={{
        teams,
        setTeams,
        activeTeam,
        loading,
        error,
        getTeams,
        handleActiveTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
