import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { getLocalStorage, setLocalStorage } from "../utils/storageUtils";
import { fetchTeams } from "../services/teamsServices";

interface Team {
  id: string;
  name: string;
  createdAt: string;
}

interface TeamContextType {
  teams: Team[] | undefined;
  activeTeam: Team | undefined;
  loading: boolean;
  error: string | null;
  handleActiveTeam: (teamId: string) => void;
  getTeams: () => void;
}

interface TeamContextProviderProps {
  children: ReactNode;
}

export const TeamContext = createContext({} as TeamContextType);

export function TeamContextProvider({ children }: TeamContextProviderProps) {
  const [teams, setTeams] = useState<Team[] | undefined>(undefined);
  const [activeTeam, setActiveTeam] = useState<Team | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
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

  const getTeams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchTeams();
      const fetchedTeams = response.data;

      if (!Array.isArray(fetchedTeams)) {
        throw new Error("Invalid data format received");
      }

      setTeams(fetchedTeams);
      setLocalStorage("@whats-new:teams", fetchedTeams);

      const storedActiveTeam = getLocalStorage(
        "@whats-new:active-team"
      ) as Team;
      const initialTeam = storedActiveTeam || fetchedTeams[0];

      setActiveTeam(initialTeam);
      setLocalStorage("@whats-new:active-team", initialTeam);
    } catch (err: any) {
      console.error("Failed to fetch teams:", err.message || err);
      setError("Error fetching teams. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  return (
    <TeamContext.Provider
      value={{
        teams,
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
