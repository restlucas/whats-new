import { ShareNetwork, ThumbsUp } from "@phosphor-icons/react";
import { useArticle } from "@src/hooks/useArticle";
import { format, parseISO } from "date-fns";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Comments } from "./components/comments";
import { User, UserContext } from "@src/contexts/UserContext";

export function Article() {
  const { user } = useContext(UserContext);
  const { slug } = useParams();
  const { likedNews, toggleArticleLike } = useContext(UserContext);

  const { article, isLoading, error, refetch, incrementArticleViews } =
    useArticle(slug || "", user ? user.id : "");

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Link copied!");
      })
      .catch((err) => {
        console.error("Error on copy link: ", err);
      });
  };

  useEffect(() => {
    if (slug) {
      incrementArticleViews(slug);
    }
  }, [slug, incrementArticleViews]);

  if (isLoading)
    return (
      <section className="w-full h-auto space-y-6">
        <div className="mx-auto max-w-[1000px] py-5 mb-12 flex flex-col items-start gap-20">
          <article className="w-full flex flex-col items-start gap-6">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-12 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="w-[200px] h-12 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-7 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="w-full h-7 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="w-full h-7 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="w-[200px] h-6 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="w-[150px] h-4 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
            </div>

            <div className="overflow-hidden w-full h-[300px] rounded-xl bg-tertiary/20 dark:bg-tertiary animate-pulse" />

            <div className="w-full flex flex-col gap-8">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  <div key={index} className="w-full flex flex-col gap-2">
                    <div className="w-full h-5 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                    <div className="w-full h-5 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                    <div className="w-full h-5 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                    <div className="w-1/2 h-5 bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    );
  if (error)
    return (
      <section className="w-full flex-1 flex items-center justify-center">
        <div className="w-[400px] h-auto rounded-md border border-tertiary/20 dark:border-tertiary p-4 text-center shadow-lg">
          <h1 className="font-bold text-xl">
            An error occured during fetching article
          </h1>
          <h3 className="font-semibold mb-4">Try again later!</h3>
          <Link
            to="/"
            className="text-red-vibrant font-bold duration-200 hover:underline"
          >
            Get back
          </Link>
        </div>
      </section>
    );

  if (article) {
    return (
      <>
        <Helmet title={`${article?.title}`} />
        <section className="w-full h-auto space-y-6">
          <div className="mx-auto max-w-[1000px] py-5 mb-12 flex flex-col items-start gap-20">
            <article className="w-full flex flex-col items-start gap-6">
              <h1 className="font-bold text-5xl">{article?.title}</h1>
              <h3 className="text-xl">{article?.description}</h3>

              <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex flex-col">
                  <p className="font-bold">
                    by{" "}
                    <span className="text-red-vibrant cursor-pointer duration-200 hover:underline">
                      {article?.teamMember.user.name}
                    </span>
                  </p>
                  <span className="text-sm font-semibold">
                    {format(
                      parseISO(article?.createdAt as string),
                      "MM/dd/yyyy HH:mm"
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {user && (
                    <button
                      onClick={() => {
                        if (article) {
                          toggleArticleLike(
                            likedNews.includes(article.id) ? "remove" : "add",
                            user.id,
                            article.id
                          );
                        }
                      }}
                      className={`flex items-center justify-center h-10 w-10 rounded-md duration-200 ${
                        article && likedNews.includes(article.id)
                          ? "bg-red-vibrant hover:bg-red-hover text-white group"
                          : "border duration-200 border-tertiary/20 dark:border-tertiary hover:border-red-vibrant hover:bg-red-vibrant group"
                      }`}
                    >
                      <ThumbsUp
                        size={18}
                        weight={
                          article && likedNews.includes(article.id)
                            ? "fill"
                            : "bold"
                        }
                        className="duration-200 group-hover:fill-white"
                      />
                    </button>
                  )}
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-4 rounded-md px-4 py-2 border border-tertiary/20 dark:border-tertiary duration-200 hover:border-red-vibrant hover:bg-red-vibrant group"
                  >
                    <span className="text-sm font-semibold duration-200 group-hover:text-white">
                      Share article
                    </span>
                    <ShareNetwork
                      size={18}
                      weight="bold"
                      className="duration-200 group-hover:fill-white"
                    />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden w-full h-[300px] rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src={article.image}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  alt="Image description"
                />
              </div>

              <div
                className="flex flex-col gap-3"
                dangerouslySetInnerHTML={{ __html: article?.content as string }}
              />
            </article>

            {/* Comments section */}
            <div className="w-full flex flex-col gap-8 border-t-[1px] border-tertiary/20 dark:border-tertiary py-8">
              <h2 className="text-3xl font-bold text-red-vibrant">
                Comments ({article.comments.length})
              </h2>

              <Comments
                user={user as User}
                refetch={refetch}
                articleId={article.id}
                articleComments={article.comments}
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  return <p>Error fetching article</p>;
}
