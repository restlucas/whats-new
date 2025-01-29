import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NewsForm, NewsProps } from "./components/form";
import { fetchArticle } from "@src/services/newsServices";
import { Helmet } from "react-helmet-async";

export function Edit() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const linkSlug = queryParams.get("linkSlug");

  const [loading, setLoading] = useState<boolean>(true);
  const [filledForm, setFilledForm] = useState<NewsProps>({
    title: "",
    description: "",
    category: "",
    content: "",
  });

  const fetchEditArticle = async (linkSlug: string) => {
    const response = await fetchArticle(linkSlug);
    const data = {
      title: response.title,
      description: response.description,
      category: response.category,
      content: response.content,
    };

    setFilledForm(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  useEffect(() => {
    if (linkSlug) {
      fetchEditArticle(linkSlug);
    }
  }, [linkSlug]);

  if (loading) {
    return (
      <div>
        <Helmet title="Edit article" />
        <h1 className="text-red-vibrant font-bold text-2xl mb-10">
          Editing news
        </h1>
        <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full flex flex-col gap-1">
              <div className="h-7 w-[100px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="h-8 w-full bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="h-7 w-[100px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              <div className="h-8 w-full bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
            </div>
            <div className="md:row-start-2 md:col-span-2">
              <div className="w-full flex flex-col gap-1">
                <div className="h-7 w-[100px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="h-8 w-full bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </div>
            </div>
            <div className="md:row-start-3 col-span-full flex flex-col gap-1">
              <div className="w-full flex flex-col gap-1">
                <div className="h-7 w-[100px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                <div className="h-[200px] w-full bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-red-vibrant font-bold text-2xl mb-10">
        Editing news
      </h1>
      <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-2 mb-20">
        <NewsForm
          slug={linkSlug as string}
          action={"put"}
          filledForm={filledForm}
        />
      </div>
    </div>
  );
}
