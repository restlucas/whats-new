import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { buildQueryString, parseQueryString } from "../../utils/filters";

import { FetchResponse, useFetchNews } from "../../hooks/useFetchNews";
import { categories } from "../../components/header";

import * as Flag from "country-flag-icons/react/3x2";
import { NewsList } from "./components/newsList";

type Filters = {
  category?: string;
  keyword?: string;
  country?: string;
  sortBy?: string;
  [key: string]: string | undefined; // Adiciona uma assinatura de índice
};

const countries = [
  {
    value: "br",
    name: "Brazil",
  },
  {
    value: "ca",
    name: "Canada",
  },
  { value: "cn", name: "China" },
  { value: "es", name: "Spain" },
  {
    value: "fr",
    name: "France",
  },
  {
    value: "gb",
    name: "United Kingdom",
  },
  { value: "it", name: "Italy" },
  {
    value: "ru",
    name: "Russia",
  },
  {
    value: "us",
    name: "United States",
  },
];

const sortBy = [
  { value: "publishedAt", name: "Newest first" },
  { value: "relevance", name: "Relevance" },
  { value: "popularity", name: "Popularity" },
];

export function Categories() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<Filters | undefined>(
    parseQueryString(location.search)
  );
  const [selectedFilters, setSelectedFilters] = useState<Filters | undefined>(
    parseQueryString(location.search)
  );

  // const {
  //   news,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  // } = useFetchNews({
  //   queryName: "search",
  //   queryParams: { ...selectedFilters, pageSize: 6 },
  //   queryType: "infinite",
  // }) as FetchInfiniteResponse;

  const { news, hasNextPage, loading, error, fetchNextPage } = useFetchNews({
    queryName: "search",
    queryOptions: { ...selectedFilters, pageSize: 6 },
  }) as FetchResponse;

  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters: Filters = { ...filters };

    if (value === "") {
      delete newFilters[filterName];
    } else {
      newFilters[filterName] = value;
    }

    setFilters(newFilters);
  };

  const applyFilters = () => {
    if (filters) {
      setSelectedFilters((prevFilters) => {
        const newFilters = { ...filters };
        return newFilters;
      });

      navigate({
        pathname: location.pathname,
        search: buildQueryString(filters),
      });
    }
  };

  const seeMore = async () => {
    setIsLoading(true);
    fetchNextPage();
    setIsLoading(false);
  };

  return (
    <>
      <Helmet title="Search" />
      <section className="w-full space-y-6">
        <h1 className="font-bold text-4xl mb-14">
          <span className="text-title">#Searching</span> News
        </h1>

        {/* Filter */}
        <div className="z-999 w-full rounded-md flex flex-wrap items-end justify-start gap-6">
          {/* Category select */}
          <label
            htmlFor="selectCategory"
            className="flex flex-col items-start justify-start gap-1"
          >
            <span className="font-bold">Category</span>
            <select
              className="w-[200px] rounded-md p-2 dark:bg-tertiary"
              value={filters?.category || ""}
              onChange={(e) => handleFilterChange("category", e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Keyword input */}
          {/* <label
            htmlFor="keyWord"
            className="flex flex-col items-start justify-start gap-1"
          >
            <span className="font-bold">Keyword</span>
            <input
              className="w-[200px] rounded-md p-2 dark:bg-tertiary"
              type="text"
              placeholder="Keyword"
              value={filters?.keyword || ""}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
            />
          </label> */}

          {/* Country select */}
          <label
            htmlFor="keyWord"
            className="flex flex-col items-start justify-start gap-1"
          >
            <span className="font-bold">Country</span>
            <select
              className="w-[200px] rounded-md p-2 dark:bg-tertiary"
              value={filters?.country || ""}
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              <option value="">Select a country</option>
              {countries.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Order by */}
          <label
            htmlFor="keyWord"
            className="flex flex-col items-start justify-start gap-1"
          >
            <span className="font-bold">Order by</span>
            <select
              className="w-[200px] rounded-md p-2 dark:bg-tertiary"
              value={filters?.sortBy || ""}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="">Select an order</option>
              {sortBy.map((option, index) => {
                return (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>

          {/* Apply button */}
          <button
            onClick={applyFilters}
            className="w-[200px] h-[42px] rounded-md font-bold text-white bg-vibrant-red cursor-pointer duration-100 hover:bg-vibrant-red/60"
          >
            Apply filters
          </button>
        </div>

        {/* News list filtered */}
        <h3>Results: {news?.length}</h3>
        <NewsList news={news} error={error} />

        {hasNextPage && (
          <div className="flex items-center justify-center">
            {loading ? (
              <div className="w-[150px] h-10 rounded-md bg-vibrant-red/50 cursor-not-allowed flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-dark animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <button
                onClick={seeMore}
                className="w-[150px] h-10 font-bold text-white rounded-md bg-vibrant-red duration-100 hover:bg-vibrant-red/50 cursor-pointer"
              >
                See more
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
