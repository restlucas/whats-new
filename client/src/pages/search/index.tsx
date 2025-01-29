import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { buildQueryString, parseQueryString } from "../../utils/filters";

import { FetchResponse, useFetchNews } from "../../hooks/useFetchNews";

import { NewsList } from "./components/newsList";
import { categories, countries } from "@src/constants";

export type Filters = {
  category?: string;
  keyword?: string;
  country?: string;
  sortBy?: string;
  [key: string]: string | undefined;
};

const sortBy = [
  { value: "publishedAt", name: "Newest first" },
  { value: "relevance", name: "Relevance" },
  { value: "popularity", name: "Popularity" },
];

const Select = ({
  identifier,
  label,
  placeholder,
  value,
  options,
  handleChange,
}: {
  identifier: string;
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; name: string }[];
  handleChange: (category: string, targetValue: string) => void;
}) => {
  return (
    <label
      htmlFor="selectCategory"
      className="flex flex-col items-start justify-start gap-1"
    >
      <span className="font-bold">{label}</span>
      <select
        className="w-[200px] rounded-md p-2 dark:bg-tertiary shadow-md"
        value={value || ""}
        onChange={(e) => handleChange(identifier, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index: number) => {
          return (
            <div
              key={index}
              className={`relative h-[300px] w-full rounded-md p-4 border-4 dark:border-tertiary bg-center bg-no-repeat bg-cover flex items-center justify-start gap-4 text-white overflow-hidden bg-tertiary/20 dark:bg-tertiary animate-pulse`}
            />
          );
        })}
      </div>
    </div>
  );
};

export function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

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

  const { news, hasNextPage, fetching, error, fetchNextPage } = useFetchNews({
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

  const applyFilters = async () => {
    setIsFiltering(true);
    if (filters) {
      setSelectedFilters(() => {
        const newFilters = { ...filters };
        return newFilters;
      });

      navigate({
        pathname: location.pathname,
        search: buildQueryString(filters),
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsFiltering(false);
  };

  const seeMore = async () => {
    setIsLoading(true);
    await fetchNextPage();
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
          <Select
            identifier="category"
            label="Category"
            placeholder="Select a category"
            value={filters?.category || ""}
            options={categories}
            handleChange={handleFilterChange}
          />

          {/* Country select */}
          <Select
            identifier="country"
            label="Country"
            placeholder="Select a country"
            value={filters?.country || ""}
            options={countries}
            handleChange={handleFilterChange}
          />

          {/* Order by */}
          <Select
            identifier="sortBy"
            label="Order by"
            placeholder="Select an order"
            value={filters?.sortBy || ""}
            options={sortBy}
            handleChange={handleFilterChange}
          />

          {/* Apply button */}
          <button
            onClick={applyFilters}
            className={`w-[200px] h-[42px] rounded-md font-bold text-white bg-red-vibrant cursor-pointer duration-100 hover:bg-red-hover ${isFiltering ? "pointer-events-none cursor-not-allowed" : ""}`}
          >
            {isFiltering && fetching ? (
              <div className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-hover text-white">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            ) : (
              <span>Apply filters</span>
            )}
          </button>
        </div>

        {/* News list filtered */}
        <h3>Results: {news?.length}</h3>
        {fetching && news.length === 0 ? (
          <Skeleton />
        ) : (
          <NewsList news={news} error={error} />
        )}

        {hasNextPage && (
          <div className="flex items-center justify-center">
            {isLoading ? (
              <div className="w-[150px] h-10 rounded-md bg-red-hover cursor-not-allowed flex items-center justify-center">
                <div className="w-full h-10 flex items-center justify-center gap-4 cursor-pointer group bg-red-vibrant rounded-md duration-200 hover:bg-red-hover text-white">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              </div>
            ) : (
              <button
                onClick={seeMore}
                className="w-[150px] h-10 font-bold text-white rounded-md bg-red-vibrant duration-100 hover:bg-red-hover cursor-pointer"
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
