import { CaretLeft, Plus } from "@phosphor-icons/react";
import { Team, TeamContext } from "@src/contexts/TeamContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function TeamsButton() {
  const divRef = useRef<HTMLDivElement>(null);
  const { teams, activeTeam, loading, handleActiveTeam } =
    useContext(TeamContext);

  const [showingTeams, setShowingTeams] = useState<boolean>(false);

  const changeTeam = async (teamId: string) => {
    handleActiveTeam(teamId);
    setShowingTeams(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowingTeams(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="relative">
      {loading ? (
        <div className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-hover text-white">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      ) : teams && teams.length > 0 ? (
        <button
          onClick={() => setShowingTeams(!showingTeams)}
          className="w-full h-10 flex items-center justify-center cursor-pointer group"
        >
          <div className="border border-r-0 border-tertiary/20 dark:border-tertiary w-full h-full px-2 flex-1 rounded-tl-md rounded-bl-md flex items-center justify-start duration-200 group-hover:text-white group-hover:bg-red-vibrant">
            <span className="font-bold text-nowrap line-clamp-1">
              {activeTeam?.name}
            </span>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-tr-md rounded-br-md bg-red-vibrant">
            <CaretLeft
              size={22}
              weight="bold"
              fill="white"
              className="duration-200 group-hover:-rotate-90 "
            />
          </div>
        </button>
      ) : (
        <Link
          to="/panel/teams"
          className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-hover text-white"
        >
          <span className="font-bold">Create a team</span>
          <Plus size={22} />
        </Link>
      )}

      {showingTeams && teams && teams.length > 1 && (
        <div className="animate-fade-yaxis border border-tertiary/20 dark:border-tertiary h-auto absolute flex flex-col items-center justify-center top-full mt-1 right-0 left-0 z-100 rounded-md shadow-md bg-light dark:bg-dark">
          {teams &&
            teams
              .filter((team: Team) => team.id !== activeTeam?.id)
              .map((team: Team) => {
                return (
                  <button
                    key={team.id}
                    onClick={() => changeTeam(team.id)}
                    className="h-10 w-full p-2 text-start duration-200 hover:bg-tertiary/5 hover:dark:bg-tertiary/60 font-bold text-nowrap line-clamp-1"
                  >
                    {team.name}
                  </button>
                );
              })}
        </div>
      )}
    </div>
  );
}
