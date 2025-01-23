import { SimpleCard } from "@src/components/cards/simple";
import { ArticleNyTimes } from "@phosphor-icons/react";

export function TotalNewsPublished() {
  return (
    <SimpleCard
      title="Total news published"
      text="100 news"
      subText="+20% from last month"
      icon={<ArticleNyTimes size={20} />}
    />
  );
}
