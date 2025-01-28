import { PlusCircle } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Invites } from "./components/invites";
import { Members } from "./components/members";
import { CreateTeam } from "./components/create-team";
import { TeamContext } from "@src/contexts/TeamContext";

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
  createdAt: string;
}

export function Teams() {
  const { teams, activeTeam } = useContext(TeamContext);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const handleNavigation = (team: any) => {
    setSelectedTeam(team);
  };

  useEffect(() => {
    if (teams) setSelectedTeam(teams[0]);
  }, [teams]);

  // Skeleton loading
  if (!teams) {
    return (
      <section className="w-full h-full flex flex-col gap-5">
        <h1 className="text-red-vibrant font-bold text-2xl">Teams</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-start gap-2">
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="h-8 w-20 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse"
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
            <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
              <div className="px-6">
                <div className="mb-6">
                  <div className="h-6 w-28 rounded-md bg-tertiary/20 dark:bg-tertiary mb-2 animate-pulse" />
                  <div className="h-5 w-40 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                </div>

                <div className="relative w-full flex flex-col gap-8">
                  {Array.from({ length: 3 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="relative flex items-center justify-between"
                      >
                        <div className="flex items-start justify-start gap-4">
                          <div className="w-9 h-9 rounded-full bg-tertiary/20 dark:bg-tertiary animate-pulse" />

                          <div className="flex flex-col items-start justify-start">
                            <div className="h-5 w-32 rounded-md bg-tertiary/20 dark:bg-tertiary mb-2 animate-pulse" />
                            <div className="h-5 w-40 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <div className="h-9 w-9 sm:w-[100px] rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2 space-y-8">
              <div className="px-6">
                <div className="mb-6">
                  <div className="h-6 w-28 rounded-md bg-tertiary/20 dark:bg-tertiary mb-2 animate-pulse" />
                  <div className="h-5 w-40 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                </div>

                <div className="h-9 w-[250px] rounded-md bg-tertiary/20 dark:bg-tertiary mb-8 animate-pulse" />

                <div className="space-y-3">
                  <div className="h-5 w-44 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                  <div className="overflow-x-scroll md:overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
                    <table className="w-full border-collapse rounded-md">
                      <thead>
                        <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                          <th className="p-3 w-[60%]">
                            <div className="h-5 w-20 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                          </th>
                          <th className="p-3 w-[20%] text-nowrap">
                            <div className="h-5 w-20 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                          </th>
                          <th className="p-3 w-[20%]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 4 }).map((_, index) => {
                          return (
                            <tr
                              key={index}
                              className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                            >
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                              >
                                <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                              </td>
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                              >
                                <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                              </td>
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                              >
                                <div className="flex items-center justify-end gap-2">
                                  <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                                  <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="px-6">
                <div className="mb-6">
                  <div className="h-6 w-28 rounded-md bg-tertiary/20 dark:bg-tertiary mb-2 animate-pulse" />
                  <div className="h-5 w-40 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                </div>

                <div className="space-y-3">
                  <div className="overflow-x-scroll md:overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
                    <table className="w-full border-collapse rounded-md">
                      <thead>
                        <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                          <th className="p-3 w-[60%]">
                            <div className="h-5 w-20 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                          </th>
                          <th className="p-3 w-[20%] text-nowrap">
                            <div className="h-5 w-20 rounded-md bg-tertiary/20 dark:bg-tertiary animate-pulse" />
                          </th>
                          <th className="p-3 w-[20%]"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 4 }).map((_, index) => {
                          return (
                            <tr
                              key={index}
                              className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                            >
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer  duration-100 hover:underline`}
                              >
                                <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                              </td>
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                              >
                                <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                              </td>
                              <td
                                className={`${index === 2 ? "" : "border-y"} border-tertiary/20 dark:border-tertiary p-3`}
                              >
                                <div className="flex items-center justify-end gap-2">
                                  <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                                  <div className="h-9 w-24 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet title="Teams" />
      <section className="w-full h-full flex flex-col gap-5">
        <h1 className="text-red-vibrant font-bold text-2xl">Teams</h1>
        <div className="flex flex-col gap-4">
          {/* Teams */}
          <div className="flex">
            <div className="flex items-center justify-start gap-2">
              {teams &&
                teams.map((team: Team) => {
                  return (
                    <button
                      key={team.id}
                      type="button"
                      className={`font-bold py-1 px-4 rounded-lg hover:bg-tertiary/20 dark:hover:bg-tertiary hover:text-tertiary dark:hover:text-white ${selectedTeam && selectedTeam.name === team.name ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary" : "text-black/30 dark:text-light/30"}`}
                      onClick={() => handleNavigation(team)}
                    >
                      {team.name}
                    </button>
                  );
                })}
              <button
                type="button"
                onClick={() => handleNavigation({})}
                className={`${teams && teams.length >= 3 ? "hidden" : "block"} px-4 h-8 font-bold flex items-center justify-center gap-2 rounded-md duration-100 text-black/30 dark:text-light/30 hover:bg-tertiary/20 dark:hover:bg-tertiary hover:text-tertiary dark:hover:text-white ${selectedTeam && Object.keys(selectedTeam).length === 0 ? " text-tertiary dark:text-white bg-tertiary/20 dark:bg-tertiary" : "text-black/30 dark:text-light/30"}`}
              >
                <PlusCircle size={20} weight="bold" />
              </button>
            </div>
          </div>

          {selectedTeam && Object.keys(selectedTeam).length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
              {/* Members */}
              <Members teamId={selectedTeam.id} />

              {/* Invite members */}
              <Invites selectedTeam={selectedTeam} />
            </div>
          ) : (
            <CreateTeam />
          )}
        </div>
      </section>
    </>
  );
}
