import { SimpleCard } from "@src/components/cards/simple";
import { Heart } from "@phosphor-icons/react";
import { useStatistics } from "@src/hooks/useStatistics";

export function LikeRate({
  activeTeamId,
}: {
  activeTeamId: string | undefined;
}) {
  const { statistics, fetching } = useStatistics(
    "likeRate",
    activeTeamId || ""
  );

  return (
    <SimpleCard
      title="Like rate"
      amount={statistics}
      prefix="likes"
      fetching={fetching}
      subText="+20% from last month"
      icon={<Heart size={20} />}
    />
  );
}
