import { ReactNode } from "react";

interface SimpleCardProps {
  title: string;
  text: string;
  subText?: string;
  icon: ReactNode;
}

export function SimpleCard({ title, text, subText, icon }: SimpleCardProps) {
  return (
    <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-base font-bold">{title}</h3>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{text}</span>
        <span className="text-xs text-black/70 dark:text-[#76899e]">
          {subText}
        </span>
      </div>
    </div>
  );
}
