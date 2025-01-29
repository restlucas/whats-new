import {
  fetchLastNewsAndTopMembers,
  fetchStatistics,
} from "@src/services/statisticsServices";
import { useQuery } from "@tanstack/react-query";

export interface TopUsers {
  id: string;
  name: string;
  totalNews: number;
  totalViews: number;
}

export interface LastFiveNews {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  views: number;
  _count: {
    likes: number;
  };
}

interface FetchResponse {
  statistics: {
    lastFiveNews: LastFiveNews[];
    topUsers: TopUsers[];
  };
  fetching: boolean;
  loading: boolean;
  error: string | null;
}

export const useStatistics = (
  queryName: string,
  teamId: string
): FetchResponse => {
  const {
    data: total,
    isError,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryName, teamId],
    queryFn: async () => {
      return await fetchStatistics(teamId, queryName);
    },
    enabled: !!teamId,
    staleTime: 600000, // 10 minutes
    gcTime: 1200000, // 20 minutes
  });

  return {
    statistics: total?.data,
    fetching: isFetching,
    loading: isLoading,
    error: isError ? (error?.message ?? "Error fetching statistics") : null,
  };
};

export const useLastNewsAndTopMembers = (teamId: string): FetchResponse => {
  const {
    data: total,
    isError,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["lastNewsAndMembers", teamId],
    queryFn: async () => {
      return await fetchLastNewsAndTopMembers(teamId);
    },
    enabled: !!teamId,
    staleTime: 600000, // 10 minutes
    gcTime: 1200000, // 20 minutes
  });

  return {
    statistics: total?.data,
    fetching: isFetching,
    loading: isLoading,
    error: isError ? (error?.message ?? "Error fetching statistics") : null,
  };
};
