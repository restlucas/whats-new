import {
  FetchNextPageOptions,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetchNews } from "../services/newsServices";

interface FetchOptions {
  queryName: string;
  queryOptions: any;
}

export interface News {
  id: string;
  image?: string;
  title: string;
  description: string;
  content: string;
  views: number;
  likes: number;
  country: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  user: {
    id: string;
    name: string;
  };
}

export interface FetchResponse {
  news: News[];
  error: string | null;

  loading: boolean;
  hasNextPage: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<any>;
}

export const useFetchNews = ({
  queryName,
  queryOptions,
}: FetchOptions): FetchResponse => {
  const { data, hasNextPage, isError, error, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryName, queryOptions],
      queryFn: async ({ pageParam = 1 }) => {
        return await fetchNews({
          ...queryOptions,
          page: pageParam,
        });
      },
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.nextPage ? lastPage.nextPage : undefined,
      initialPageParam: 1,
      staleTime: 600000, // 10 minutes
      gcTime: 1200000, // 20 minutes
    });

  return {
    news: data?.pages.flatMap((page) => page.data) ?? [],
    hasNextPage,
    loading: isFetching,
    error: isError ? (error?.message ?? "Error fetching news") : null,
    fetchNextPage,
  };
};
