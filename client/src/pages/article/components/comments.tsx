import { ThumbsUp } from "@phosphor-icons/react";
import { User } from "@src/contexts/UserContext";
import { toggleCommentLike } from "@src/services/userServices";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewComment } from "./new-coment";
import { Article } from "@src/services/newsServices";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  likeCount: number;
  isLikedByUser: boolean;
}

interface CommentsProps {
  user: User;
  articleId: string;
  articleComments: Comment[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Article, Error>>;
}

export function Comments({
  user,
  articleId,
  articleComments,
  refetch,
}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(articleComments);

  const toggleLike = async (commentId: string, isLiked: boolean) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLikedByUser: !isLiked,
              likeCount: isLiked
                ? comment.likeCount - 1
                : comment.likeCount + 1,
            }
          : comment
      )
    );
    await toggleCommentLike(user.id, commentId, isLiked);
  };

  useEffect(() => {
    setComments(articleComments);
  }, [articleComments]);

  return (
    <div className="flex flex-col gap-6">
      {user && user.id ? (
        <NewComment userId={user.id} articleId={articleId} refetch={refetch} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 w-full h-auto rounded-md px-4 py-6 border border-tertiary/20 dark:border-tertiary shadow-lg">
          <h3 className="font-semibold">Make login to leave a comment!</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <Link
              to="/auth/reader"
              className="py-2 w-[150px] font-bold text-white rounded-md bg-red-vibrant duration-200 hover:bg-red-hover "
            >
              Login as a Reader
            </Link>
            <Link
              to="/auth/creator"
              className="py-2 w-[150px] font-bold text-white rounded-md bg-red-vibrant duration-200 hover:bg-red-hover "
            >
              Login as a Creator
            </Link>
          </div>
        </div>
      )}

      {comments &&
        comments.map((comment, index) => {
          return (
            <div
              className="w-full h-auto rounded-md p-4 border border-tertiary/20 dark:border-tertiary flex flex-col items-start gap-2 shadow-lg"
              key={index}
            >
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center justify-start gap-4">
                  <div
                    className={`rounded-full h-9 w-9 bg-tertiary/20 dark:bg-tertiary relative flex items-center justify-center overflow-hidden bg-cover bg-center`}
                    style={{
                      backgroundImage:
                        comment.user.image && `url(${comment.user.image})`,
                    }}
                  >
                    {!comment.user.image && (
                      <span className="text-sm font-semibold">
                        {comment.user.name
                          .split(" ")
                          .map((part) => part[0].toUpperCase())
                          .join("")
                          .slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-nowrap truncate sm:hidden">
                    {comment.user.name.split(" ")[0]}
                  </h3>
                  <h3 className="font-semibold text-lg text-nowrap truncate hidden sm:block">
                    {comment.user.name}
                  </h3>
                  <span className="text-xs">
                    {format(parseISO(comment.createdAt), "MM/dd/yyyy")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    user ? toggleLike(comment.id, comment.isLikedByUser) : null
                  }
                  className={`flex items-center justify-center gap-4 py-1 px-3 rounded-md  border duration-200 border-tertiary/20 dark:border-tertiary group  ${comment.isLikedByUser ? "border-red-vibrant bg-red-vibrant hover:bg-red-hover" : " hover:bg-red-vibrant"}`}
                >
                  <ThumbsUp
                    size={18}
                    weight={`${comment.isLikedByUser ? "fill" : "bold"}`}
                    className={`duration-200 ${comment.isLikedByUser ? "fill-white" : "group-hover:fill-white"}`}
                  />
                  <span
                    className={`font-semibold duration-200 group-hover:text-white ${comment.isLikedByUser && "text-white"}`}
                  >
                    {comment.likeCount}
                  </span>
                </button>
              </div>
              <p>{comment.content}</p>
            </div>
          );
        })}

      {/* {articleComments && articleComments.length > 0 && (
        <div className="flex items-center justify-center w-full">
          <button className="w-full md:w-1/6 rounded-md py-2 bg-red-vibrant duration-200 hover:bg-red-hover text-white font-bold">
            Load more
          </button>
        </div>
      )} */}
    </div>
  );
}
