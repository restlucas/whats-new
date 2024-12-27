import { SimpleCard } from "@components/cards/simple";
import { Heart } from "@phosphor-icons/react";

export function LikeRate() {
  return (
    <SimpleCard
      title="Like rate"
      text="100 likes"
      subText="+20% from last month"
      icon={<Heart size={20} />}
    />
  );
}
