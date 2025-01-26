import axiosInstance from "@src/lib/axios";

export const updateProfile = async (data: {
  userId: string;
  name: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axiosInstance.put("/user", data);

    return {
      code: response.status,
      message: response.data.message,
      data: response.data.user,
    };
  } catch (error) {
    console.error("Error on update profile:", error);
    throw new Error("Failed to update profile");
  }
};

export const fetchLikes = async (userId: string) => {
  try {
    const response = await axiosInstance.get("/user/likes", {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw new Error("Failed to fetch likes");
  }
};

export const toggleLike = async (
  handle: string,
  userId: string,
  newsId: string
) => {
  const method = handle === "remove" ? "delete" : "post";

  try {
    if (method === "delete") {
      return await axiosInstance.delete("/user/like", {
        data: { userId, newsId },
      });
    }

    return await axiosInstance.post("/user/like", {
      userId,
      newsId,
    });
  } catch (error) {
    console.error("Error creating like:", error);
    throw new Error("Failed to create like");
  }
};

export const toggleCommentLike = async (
  userId: string,
  commentId: string,
  isLiked: boolean
) => {
  const method = isLiked ? "delete" : "post";
  try {
    if (method === "delete") {
      return await axiosInstance.delete("/user/like/comment", {
        data: { userId, commentId },
      });
    }

    return await axiosInstance.post("/user/like/comment", {
      userId,
      commentId,
    });
  } catch (error) {
    console.error("Error creating like:", error);
    throw new Error("Failed to create like");
  }
  // try {
  //   const method = isLiked ? "delete" : "post";
  //   const response = await axiosInstance[method](`/apicomments/${commentId}/like`, {
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId }),
  //   });

  //   if (response.ok) {
  //     // Atualize o estado do comentário específico
  //     setComments((prevComments) =>
  //       prevComments.map((comment) =>
  //         comment.id === commentId
  //           ? {
  //               ...comment,
  //               likeCount: isLiked
  //                 ? comment.likeCount - 1
  //                 : comment.likeCount + 1,
  //               isLikedByUser: !isLiked,
  //             }
  //           : comment
  //       )
  //     );
  //   } else {
  //     console.error("Failed to toggle like");
  //   }
  // } catch (error) {
  //   console.error("Error toggling like:", error);
  // }
};

export const validateToken = async (token: string) => {
  return await axiosInstance.post("/users/validate-token", { token });
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post("/users/reset-password", {
    token,
    newPassword,
  });

  return response;
};
