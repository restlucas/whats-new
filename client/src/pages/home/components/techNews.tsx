import { HorizontalCard } from "@src/components/cards/horizontal";
import { News, useFetchNews } from "@src/hooks/useFetchNews";

export function TechNews() {
  const {
    news: technologyNews,
    loading,
    error,
  } = useFetchNews({
    queryName: "technologyNews",
    queryOptions: {
      category: "technology",
      pageSize: 6,
    },
  });

  if (loading)
    return (
      <div className="animate-pulse w-full bg-red-vibrant rounded-xl p-4 md:p-8 grid grid-cols-1 xl:grid-cols-2 grid-auto-rows-[minmax(0, 220px)] gap-4 md:gap-8">
        {Array.from({ length: 6 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className="bg-white dark:bg-tertiary shadow-md rounded-md p-4 grid grid-cols-[min-content_1fr] gap-4 h-[220px] group"
            >
              <div className="w-[188px] h-[188px] overflow-hidden flex items-center justify-center rounded-md bg-tertiary/20 dark:bg-tertiary" />
            </div>
          );
        })}
      </div>
    );

  if (error) return <p>Error on fetching tech news.</p>;

  return (
    <div className="w-full bg-red-vibrant rounded-xl p-4 md:p-8 grid grid-cols-1 xl:grid-cols-2 grid-auto-rows-[minmax(0, 220px)] gap-4 md:gap-8">
      {technologyNews.map((news: News, index: number) => {
        return (
          <div key={index}>
            <HorizontalCard
              image={news.image}
              slug={news.slug}
              title={news.title}
              description={news.description}
              date={news.createdAt}
              author={news.teamMember.user.name}
            />
          </div>
        );
      })}
    </div>
  );
}
