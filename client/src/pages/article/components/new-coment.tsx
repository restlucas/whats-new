import { Article, makeComment } from "@src/services/newsServices";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

interface NewCommentProps {
  userId?: string;
  articleId?: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Article, Error>>;
}

export function NewComment({ userId, articleId, refetch }: NewCommentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await makeComment(
      userId as string,
      articleId as string,
      comment
    );

    alert(response.data.message);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setComment("");
    refetch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-4 w-full h-auto rounded-md px-4 py-6 border border-tertiary/20 dark:border-tertiary shadow-lg"
    >
      <h3 className="font-semibold">Leave a comment:</h3>

      <textarea
        id="comment"
        name="comment"
        value={comment}
        className="w-full rounded-md p-2 resize-none dark:bg-[#3c4856]"
        onChange={(e) => setComment(e.target.value)}
        cols={5}
        required
      />

      <div className="w-full flex items-center justify-end">
        <button
          type="submit"
          className={`h-10 w-[150px] font-bold text-white rounded-md bg-red-vibrant duration-200 hover:bg-red-hover flex items-center justify-center ${loading ? "pointer-events-none cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <span>Comment</span>
          )}
        </button>
      </div>
    </form>
  );
}
