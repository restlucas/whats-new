import { Helmet } from "react-helmet-async";
import { TotalNewsPublished } from "./components/totalNewsPublished";
import { TotalRecentViews } from "./components/totalRecentViews";
import { LikeRate } from "./components/likeRate";
import { NewsAndMembers } from "./components/newsAndMembers";
import { useContext } from "react";
import { TeamContext } from "@src/contexts/TeamContext";

export function Dashboard() {
  const { activeTeam } = useContext(TeamContext);

  return (
    <>
      <Helmet title="Dashboard" />
      <section className="w-full h-full flex flex-col gap-8">
        <h1 className="text-red-vibrant font-bold text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <TotalNewsPublished activeTeamId={activeTeam?.id} />
              <TotalRecentViews activeTeamId={activeTeam?.id} />
              <LikeRate activeTeamId={activeTeam?.id} />
            </div>

            <NewsAndMembers activeTeamId={activeTeam?.id} />
          </div>
        </div>
      </section>
    </>
  );
}
