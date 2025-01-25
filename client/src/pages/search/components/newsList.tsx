import { Clock } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { News } from "@src/hooks/useFetchNews";
import { FetchNextPageOptions } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface NewsItem {
  title: string;
  description: string;
  url: string;
}

interface NewsListProps {
  news: News[];
  error: string | null;
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<any>;
  hasNextPage?: boolean;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
}

export const NewsList = ({ news, error }: NewsListProps) => {
  if (error) return <p>Error on fetch news list.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article: News, index: number) => {
          return (
            <Link
              to={`/article/${article.slug}`}
              key={index}
              className={`relative h-[300px] w-full rounded-md p-4 border-4 dark:border-tertiary bg-center bg-no-repeat bg-cover flex items-center justify-start gap-4 text-white overflow-hidden`}
              style={{
                backgroundImage: article.image
                  ? `url(${article.image})`
                  : `url(./assets/tech.jpg)`,
              }}
            >
              <div className="shadow-xl absolute top-0 left-0 py-2 px-4 backdrop-blur-sm bg-red-hover flex items-center justify-center gap-6 rounded-br-md text-xs">
                <div className="flex items-center justify-start gap-2">
                  <Clock size={16} weight="bold" />
                  <span className="">
                    {dayjs(article.createdAt).format("DD MMM, YYYY")}
                  </span>
                </div>
                <span className="">
                  by{" "}
                  <span className="font-bold">
                    {article.teamMember.user.name}
                  </span>
                </span>
              </div>

              <div className="shadow-xl absolute bottom-0 left-0 right-0 h-[120px] py-2 px-3 backdrop-blur-sm bg-slate-700 cursor-pointer group">
                <h3 className="font-bold text-xl mb-4 line-clamp-1 duration-100 group-hover:underline">
                  {article.title}
                </h3>
                <p className="text-sm line-clamp-3">{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
