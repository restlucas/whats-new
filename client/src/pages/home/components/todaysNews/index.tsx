import { GeneralNews } from "./generalNews";
import { HealthNews } from "./healthNews";

export function TodaysNews() {
  return (
    <div className="grid grid-cols-1 min-[1400px]:grid-cols-[1fr_min-content] items-start gap-12">
      <GeneralNews />

      <HealthNews />
    </div>
  );
}
