import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  fetchArticle,
  fetchNewsByTeam,
  fetchPaginateNews,
} from "../services/newsServices";

interface FetchOptions {
  queryName: string;
  queryOptions: {
    category?: string;
    pageSize?: number;
    sortBy?: string;
  };
}

export interface News {
  id: string;
  image?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  views: number;
  likes: number;
  country: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  teamMember: {
    user: {
      id: string;
      name: string;
    };
  };
}

export interface FilterProps {
  title: string;
  category: string;
  status: string;
}

export interface QueryResponse {
  data: News[];
  nextPage: number | null;
  total: number;
}

export interface FetchResponse {
  news: News[];
  error: string | null;

  loading: boolean;
  fetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<QueryResponse, unknown>, Error>
  >;
}

export const useFetchNews = ({
  queryName,
  queryOptions,
}: FetchOptions): FetchResponse => {
  const {
    data,
    hasNextPage,
    isError,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<QueryResponse, Error>({
    queryKey: [queryName, queryOptions],
    queryFn: async ({ pageParam = 1 }) => {
      if (typeof pageParam !== "number") {
        throw new Error("Invalid pageParam");
      }

      return await fetchPaginateNews({
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

  const news = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    news,
    hasNextPage,
    fetching: isFetching,
    loading: isLoading,
    error: isError ? (error?.message ?? "Error fetching news") : null,
    fetchNextPage,
  };
};

export const useFetchBasicNews = (
  teamId: string,
  page: number = 1,
  pageSize: number = 10,
  filters: FilterProps
) => {
  const queryOptions = { teamId, page, pageSize, filters };

  const shouldFetch = filters.title.length === 0 || filters.title.length > 3;

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["newsByTeam", queryOptions],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await fetchNewsByTeam(queryOptions);
    },
    enabled: teamId !== "" && shouldFetch,
    placeholderData: keepPreviousData,
    staleTime: 600000,
    gcTime: 1200000,
  });

  return {
    status,
    news: data,
    error,
    isFetching,
    refetch,
  };
};

export const useFetchArticle = ({ articleSlug }: { articleSlug: string }) => {
  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["newsByTeam", articleSlug],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await fetchArticle(articleSlug);
    },
    enabled: !!articleSlug,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return {
    status,
    article: data,
    error,
    isFetching,
    refetch,
  };
};
