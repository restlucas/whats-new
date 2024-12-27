import { PlusCircle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { InviteMembers } from "./components/invite-members";
import { Members } from "./components/members";
import { useTeams } from "../../../hooks/useTeams";
import { CreateTeam } from "./components/create-team";

interface Member {
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  members: Member[];
  invitations: any;
}

export function Teams() {
  const { teams, loading, error, getTeams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<any>({});

  const handleNavigation = (team: any) => {
    setSelectedTeam(team);
  };

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  useEffect(() => {
    if (teams.length > 0) setSelectedTeam(teams[0]);
  }, [teams]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>An error occurred while fetching teams...</p>;
  }

  return (
    <>
      <Helmet title="Teams" />
      <section className="w-full h-full flex flex-col gap-5">
        <h1 className="text-vibrant-red font-bold text-2xl">Teams</h1>
        <div className="flex flex-col gap-4">
          {/* Teams */}
          <div className="flex">
            <div className="flex items-center justify-start gap-2">
              {teams.map((team: Team, index: number) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`font-bold py-1 px-4 rounded-lg hover:bg-tertiary/20 dark:hover:bg-tertiary hover:text-tertiary dark:hover:text-white ${selectedTeam.name === team.name ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary" : "text-black/30 dark:text-light/30"}`}
                    onClick={() => handleNavigation(team)}
                  >
                    {team.name}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleNavigation({})}
                className={`px-4 h-8 font-bold flex items-center justify-center gap-2 rounded-md duration-100 text-black/30 dark:text-light/30 hover:bg-tertiary/20 dark:hover:bg-tertiary hover:text-tertiary dark:hover:text-white ${Object.keys(selectedTeam).length === 0 ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary" : "text-black/30 dark:text-light/30"}`}
              >
                {/* <span>Create</span> */}
                <PlusCircle size={20} weight="bold" />
              </button>
            </div>
          </div>

          {Object.keys(selectedTeam).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Members */}
              <Members teamId={selectedTeam.id} />

              {/* Invite members */}
              <InviteMembers />
            </div>
          ) : (
            <CreateTeam />
          )}
        </div>
      </section>
    </>
  );
}
