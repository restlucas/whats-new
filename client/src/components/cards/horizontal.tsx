import { ArrowRight, Clock } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface HorizontalCardProps {
  image?: string;
  title: string;
  description: string;
  date?: string;
  author: string;
}

export function HorizontalCard({
  image,
  title,
  description,
  date,
  author,
}: HorizontalCardProps) {
  return (
    <div className="bg-white dark:bg-dark shadow-md rounded-md p-4 grid grid-cols-[min-content_1fr] gap-4 h-[220px] group">
      <div
        className={`w-[188px] h-[188px] overflow-hidden flex items-center justify-center rounded-md bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: image ? `url(${image})` : `url(./assets/tech.jpg)`,
        }}
      />
      <div className="flex flex-col gap-4">
        <h5 className="font-bold text-xl cursor-pointer duration-100 hover:underline line-clamp-2">
          {title}
        </h5>
        <p className="line-clamp-3 text-primary dark:text-secondary-dark">
          {description}
        </p>
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="flex items-center justify-start gap-2 text-sm">
            <span className="line-clamp-1">
              by <span className="font-bold">{author}</span>
            </span>
          </div>
          <Link
            to=""
            className="text-sm font-bold uppercase flex items-center justify-end gap-2 duration-100 hover:text-red hover:fill-red"
          >
            <ArrowRight size={20} weight="bold" />
            <span className="text-nowrap">Read more</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
