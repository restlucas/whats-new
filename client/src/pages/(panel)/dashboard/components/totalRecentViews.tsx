import { SimpleCard } from "@src/components/cards/simple";
import { Eye } from "@phosphor-icons/react";

export function TotalRecentViews() {
  return (
    <SimpleCard
      title="Total recent views"
      text="100 views"
      subText="+20% from last month"
      icon={<Eye size={20} />}
    />
  );
}
