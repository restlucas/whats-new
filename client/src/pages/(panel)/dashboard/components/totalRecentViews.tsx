import { SimpleCard } from "@src/components/cards/simple";
import { Eye } from "@phosphor-icons/react";
import { useStatistics } from "@src/hooks/useStatistics";

export function TotalRecentViews({
  activeTeamId,
}: {
  activeTeamId: string | undefined;
}) {
  const { statistics, fetching } = useStatistics(
    "recentViews",
    activeTeamId || ""
  );

  return (
    <SimpleCard
      title="Total recent views"
      amount={statistics}
      prefix="views"
      fetching={fetching}
      subText="+20% from last month"
      icon={<Eye size={20} />}
    />
  );
}
