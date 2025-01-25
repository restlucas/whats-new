import { SimpleCard } from "@src/components/cards/simple";
import { ArticleNyTimes } from "@phosphor-icons/react";
import { useStatistics } from "@src/hooks/useStatistics";

export function TotalNewsPublished({
  activeTeamId,
}: {
  activeTeamId: string | undefined;
}) {
  const { statistics, fetching } = useStatistics(
    "publishedNews",
    activeTeamId || ""
  );

  return (
    <SimpleCard
      title="Total news published"
      amount={statistics}
      prefix="news"
      fetching={fetching}
      subText="+20% from last month"
      icon={<ArticleNyTimes size={20} />}
    />
  );
}
