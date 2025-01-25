import { ReactNode, useEffect, useState } from "react";

interface SimpleCardProps {
  title: string;
  amount: number | undefined;
  prefix: string;
  subText?: string;
  icon: ReactNode;
  fetching: boolean;
}

export function SimpleCard({
  title,
  fetching,
  amount,
  prefix,
  subText,
  icon,
}: SimpleCardProps) {
  const [displayedAmount, setDisplayedAmount] = useState(0);

  useEffect(() => {
    if (!fetching && amount && amount > 0) {
      const duration = 2000; // 2 seconds
      const increment = amount / (duration / 10); // Update each 10ms
      let currentAmount = 0;

      const interval = setInterval(() => {
        currentAmount += increment;
        if (currentAmount >= amount) {
          setDisplayedAmount(amount);
          clearInterval(interval);
        } else {
          setDisplayedAmount(Math.floor(currentAmount));
        }
      }, 10);

      return () => clearInterval(interval);
    }
  }, [fetching, amount]);

  if (fetching || !amount)
    return (
      <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="w-[120px] h-6 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-[90px] h-8 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
          <div className="w-[120px] h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
        </div>
      </div>
    );
  return (
    <>
      <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-base font-bold">{title}</h3>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            {displayedAmount + " " + prefix}
          </span>
          <span className="text-xs text-black/70 dark:text-[#76899e]">
            {subText}
          </span>
        </div>
      </div>
    </>
  );
}
