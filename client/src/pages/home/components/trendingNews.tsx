import { Link } from "react-router-dom";
import { Card } from "../../../components/cards";
import { Clock } from "@phosphor-icons/react";
import { News, useFetchNews } from "../../../hooks/useFetchNews";
import dayjs from "dayjs";

export function TrendingNews() {
  const {
    news: trendingNews,
    loading,
    error,
  } = useFetchNews({
    queryName: "trendingNews",
    queryOptions: { sortBy: "likes", pageSize: 5 },
  });

  if (loading)
    return (
      <div className="anime-pulse grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[300px] items-start gap-10">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index === 1) {
            return (
              <div
                key={index}
                className="col-start-1 row-start-1 md:col-start-auto md:row-start-auto xl:col-span-2 md:row-span-2 w-full flex flex-col gap-4"
              >
                <div className="h-[356px] w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="h-10 w-[200px] rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="mt-auto flex flex-col gap-2">
                  <div className="h-10 w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                  <div className="h-10 w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                  <div className="h-10 w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="h-[300px] w-full flex flex-col gap-2">
                <div className="h-[200px] w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="mt-auto h-10 w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="h-[30px] w-[200px] rounded-md bg-tertiary/20 dark:bg-tertiary" />
              </div>
            );
          }
        })}
      </div>
    );

  if (error) return <p>Error on fetching trending news.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[300px] items-start gap-10">
      {trendingNews?.map((article: News, index: number) => {
        if (index === 1) {
          return (
            <div
              key={index}
              className="col-start-1 row-start-1  md:col-start-auto md:row-start-auto xl:col-span-2 md:row-span-2 w-full flex flex-col gap-4"
            >
              <div
                className="h-[356px] w-full rounded-md overflow-hidden flex items-center justify-center relative group shadow-xl bg-cover bg-center"
                style={{
                  backgroundImage: article.image
                    ? `url(${article.image})`
                    : `url(./assets/photo.jpg)`,
                }}
              />
              <div className="flex items-center justify-start gap-8">
                <div className="flex items-center justify-start gap-2">
                  <Clock size={22} className="fill-text-primary" />
                  <span className="text-sm">
                    {dayjs(article.createdAt).format("DD MMMM, YYYY")}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary" />
                  <span>
                    by{" "}
                    <span className="font-bold cursor-pointer duration-100 hover:underline">
                      {article.user.name}
                    </span>
                  </span>
                </div>
              </div>
              <h2 className="font-bold text-4xl cursor-pointer duration-100 hover:underline">
                {article.title}
              </h2>
              <p className="line-clamp-4">{article.description}</p>
            </div>
          );
        } else {
          return (
            <Card
              key={index}
              image={article.image}
              title={article.title}
              date={dayjs(article.createdAt).format("DD MMMM, YYYY")}
              author={article.user.name}
            />
          );
        }
      })}
    </div>
  );
}
