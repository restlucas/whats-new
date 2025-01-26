import {
  Article,
  fetchArticle,
  incrementViews,
} from "@src/services/newsServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useArticle = (slug: string, userId: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<Article>({
    queryKey: ["newsByTeam", slug, userId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await fetchArticle(slug, userId);
    },
    enabled: !!slug,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { mutate: incrementArticleViews } = useMutation<void, Error, string>({
    mutationFn: incrementViews,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["article", slug],
      });
    },
  });

  return { article: data, isLoading, error, refetch, incrementArticleViews };
};
