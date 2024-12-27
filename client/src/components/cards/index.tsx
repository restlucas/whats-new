import { Clock } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string | undefined;
  category?: string;
  title: string;
  description?: string;
  date?: string;
  author?: string;
}

export function Card({
  image,
  category,
  title,
  description,
  date,
  author,
}: CardProps) {
  return (
    <div className="flex flex-col gap-2 group">
      <div
        className="w-full h-[200px] flex items-center justify-center rounded-xl overflow-hidden relative bg-cover bg-center bg-no-repeat shadow-xl border-[1px] border-slate-200 dark:border-slate-700"
        style={{
          backgroundImage: image ? `url(${image})` : `url(./assets/photo.jpg)`,
        }}
      >
        {category && (
          <Link
            to={`/categories/${category.toLowerCase()}`}
            className="cursor-pointer shadow-md z-20 absolute top-2 left-2 w-[100px] text-sm flex items-center justify-center bg-vibrant-red rounded-md py-1 px-2 uppercase text-white font-bold"
          >
            {category}
          </Link>
        )}
      </div>

      <h3 className="font-bold text-lg cursor-pointer duration-100 hover:underline line-clamp-2">
        {title}
      </h3>
      {description && (
        <p className="line-clamp-2 text-secondary dark:text-secondary-dark text-sm">
          {description}
        </p>
      )}

      <div className="flex items-center justify-start gap-8">
        {date && (
          <div className="flex items-center justify-start gap-2">
            <Clock
              size={22}
              className="fill-secondary dark:fill-secondary-dark"
            />
            <span className="text-sm text-secondary dark:text-secondary-dark">
              {date}
            </span>
          </div>
        )}
        {author && (
          <div className="flex items-center justify-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary" />
            <span>
              by{" "}
              <span className="font-bold cursor-pointer duration-100 hover:underline">
                {author}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
