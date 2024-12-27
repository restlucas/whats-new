import { Link } from "react-router-dom";
import { News, useFetchNews } from "../../../../hooks/useFetchNews";
import dayjs from "dayjs";

export function HealthNews({ country }: { country: string }) {
  const {
    news: healthNews,
    loading,
    error,
  } = useFetchNews({
    queryName: "healthNews",
    queryOptions: { category: "health", pageSize: 6 },
  });

  if (loading)
    return (
      <div className="animate-pulse flex flex-col gap-4">
        <div className="flex items-center justify-start">
          <div className="w-[150px] h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
        </div>

        <div className="p-2 flex flex-col w-full xl:w-[300px] rounded-md border border-tertiary/20 dark:border-tertiary divide-y dark:divide-tertiary">
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <div
                key={index}
                className="p-3 w-full xl:h-[100px] flex flex-col gap-2 rounded-md"
              >
                <div className="hidden xl:block w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="hidden xl:block w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="hidden xl:block w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />

                <div className="w-full flex items-center justify-between gap-4 xl:hidden">
                  <div className="w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
                  <div className="w-[200px] h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );

  if (error) return <p>Error on fetching todays general news.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start">
        <Link
          to="/search?category=health"
          className="font-bold bg-vibrant-red text-white text-sm rounded-md py-2 px-4"
        >
          Health
        </Link>
      </div>

      <div className="overflow-hidden p-2 flex flex-col w-full xl:w-[300px] rounded-md border border-tertiary/20 dark:border-tertiary divide-y dark:divide-tertiary">
        {healthNews.map((news: News, index: number) => {
          return (
            <Link
              to=""
              key={index}
              className="p-3 w-full text-lg font-bold line-clamp-1 xl:line-clamp-4 cursor-pointer duration-100 hover:underline overflow-hidden grid gap-4 items-start grid-cols-[1fr_min-content]"
            >
              <span className="">{news.title}</span>
              <div className="flex items-center justify-end gap-4 text-nowrap xl:hidden ">
                <span className="text-sm">
                  {dayjs(news.createdAt).format("DD MMMM, YYYY")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
