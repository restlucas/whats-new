import { LastFiveNewsPublished } from "./components/lastFiveNewsPublished";
import { LikeRate } from "./components/likeRate";
import { NewsPendingApproval } from "./components/newsPendingApproval";
import { TotalNewsPublished } from "./components/totalNewsPublished";
import { TotalRecentViews } from "./components/totalRecentViews";

export function Overview() {
  return (
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
  );
}
