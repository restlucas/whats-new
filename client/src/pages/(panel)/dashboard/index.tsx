import { Helmet } from "react-helmet-async";
import { TotalNewsPublished } from "./components/totalNewsPublished";
import { TotalRecentViews } from "./components/totalRecentViews";
import { LikeRate } from "./components/likeRate";
import { LastFiveNewsPublished } from "./components/lastFiveNewsPublished";
import { NewsPendingApproval } from "./components/newsPendingApproval";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <section className="w-full h-full flex flex-col gap-8">
        <h1 className="text-red-vibrant font-bold text-2xl">Dashboard</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <TotalNewsPublished />
              <TotalRecentViews />
              <LikeRate />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <LastFiveNewsPublished />
              <NewsPendingApproval />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
