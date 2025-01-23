import { useFetchNews } from "@src/hooks/useFetchNews";
import { Clock } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { Card } from "@src/components/cards";
import { Link } from "react-router-dom";

export function GeneralNews({ country }: { country: string }) {
  const {
    news: generalNews,
    loading,
    error,
  } = useFetchNews({
    queryName: "generalNews",
    queryOptions: { category: "general", pageSize: 4 },
  });

  const mainArticle = generalNews.pop();
  const secondaryArticles = generalNews;

  if (loading)
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-start">
          <div className="w-[150px] h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-auto-rows-[minmax(0, 300px)] gap-12 items-start">
          {/* Main news */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-[min-content_1fr] h-full gap-2 lg:gap-10 overflow-hidden group">
            <div className="w-full lg:w-[500px] h-[300px] rounded-md bg-tertiary/20 dark:bg-tertiary" />
            <div className="flex flex-col gap-6">
              <div className="w-full h-10 rounded-md bg-tertiary/20 dark:bg-tertiary" />

              <div className="flex items-center justify-start gap-8">
                <div className="w-[150px] h-10 bg-tertiary/20 dark:bg-tertiary rounded-md" />
              </div>

              <div className="flex-1 text-secondary dark:text-secondary-dark flex flex-col gap-1">
                <div className="w-full h-10 bg-tertiary/20 dark:bg-tertiary rounded-md" />
                <div className="w-full h-10 bg-tertiary/20 dark:bg-tertiary rounded-md" />
                <div className="w-full h-10 bg-tertiary/20 dark:bg-tertiary rounded-md" />
                <div className="w-full h-10 bg-tertiary/20 dark:bg-tertiary rounded-md" />
              </div>
            </div>
          </div>

          {/* Other news */}
          {Array.from({ length: 3 }).map((_, index) => {
            return (
              <div key={index} className="h-[300px] w-full flex flex-col gap-2">
                <div className="h-[200px] w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="h-10 w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="h-[30px] w-full rounded-md bg-tertiary/20 dark:bg-tertiary" />
                <div className="h-[30px] w-[200px] rounded-md bg-tertiary/20 dark:bg-tertiary" />
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
          to="/search?category=general"
          className="font-bold bg-vibrant-red text-white text-sm rounded-md py-2 px-4"
        >
          General
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-auto-rows-[minmax(0, 300px)] gap-12 items-start">
        {/* Main news */}
        {mainArticle && (
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-[min-content_1fr] h-full gap-2 lg:gap-10 overflow-hidden group">
            <div
              className="overflow-hidden w-full lg:w-[500px] h-[300px] rounded-xl flex items-center justify-center bg-cover bg-center bg-no-repeat shadow-md"
              style={{
                backgroundImage: mainArticle.image
                  ? `url(${mainArticle.image})`
                  : `url(./assets/tech.jpg)`,
              }}
            />

            <div className="flex flex-col gap-6">
              <h2 className="font-bold text-3xl cursor-pointer duration-100 hover:underline">
                {mainArticle.title}
              </h2>

              <div className="flex items-center justify-start gap-8">
                <div className="flex items-center justify-start gap-2">
                  <Clock size={22} className="fill-text-primary" />
                  <span className="text-sm">
                    {dayjs(mainArticle.createdAt).format("DD MMMM, YYYY")}
                  </span>
                </div>
                <div className="flex items-center justify-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary" />
                  <span>
                    by{" "}
                    <span className="font-bold cursor-pointer duration-100 hover:underline">
                      {mainArticle.user.name}
                    </span>
                  </span>
                </div>
              </div>

              <p className="line-clamp-5 text-secondary dark:text-secondary-dark">
                {mainArticle.description}
              </p>
            </div>
          </div>
        )}

        {/* Other news */}
        {secondaryArticles &&
          secondaryArticles.map((article) => {
            return (
              <div key={article.id}>
                <Card
                  image={article.image}
                  title={article.title}
                  description={article.description}
                  date={dayjs(article.createdAt).format("DD MMMM, YYYY")}
                  author={article.user.name}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
