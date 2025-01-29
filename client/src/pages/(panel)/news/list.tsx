import { Input } from "@src/components/input";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CirclesFour,
  Eye,
  Funnel,
  PencilSimple,
  PlusCircle,
  Trash,
  X,
} from "@phosphor-icons/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TeamContext } from "@src/contexts/TeamContext";
import { format, parseISO } from "date-fns";
import { useFetchBasicNews } from "@src/hooks/useFetchNews";
import { Link } from "react-router-dom";
import { removeNews } from "@src/services/newsServices";

interface FilterProps {
  title: string;
  category: string;
  status: string;
}

interface NewsProps {
  id: string;
  category: string;
  title: string;
  slug: string;
  createdAt: string;
}

interface ListOptions {
  pageSize: number;
  currentPage: number;
  totalNews: number;
  totalPages: number;
}

const clientUrl = import.meta.env.VITE_WHATSNEW_CLIENT_URL;

const categories = [
  "world",
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "games",
];

const resultsPerPage = [10, 30, 50, 100];

// Buttons
const FilterButton = ({
  filterName,
  filterDefaultValue,
  filterValues,
  handleChange,
}: {
  filterName: string;
  filterDefaultValue: string;
  filterValues: string[];
  handleChange: (filterName: string, filterValue: string) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showValues, setShowValues] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowValues(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="relative">
      <button
        onClick={() => setShowValues(!showValues)}
        className={`flex items-center justify-center gap-3  h-9 px-3 text-sm font-semibold border border-dashed border-tertiary/20 dark:border-tertiary rounded-md cursor-pointer duration-100  ${filterDefaultValue !== "" ? "bg-red-vibrant text-white hover:bg-red-hover" : "hover:bg-tertiary/10 dark:hover:bg-tertiary"}`}
      >
        {filterDefaultValue ? (
          <Funnel size={18} weight="bold" />
        ) : (
          <PlusCircle size={18} weight="bold" />
        )}
        <span className="capitalize">{filterDefaultValue || filterName}</span>
      </button>

      {showValues && (
        <div className="animate-fade-yaxis absolute z-[100] top-full mt-1 left-0 flex flex-col border border-tertiary/20 dark:border-tertiary rounded-md bg-light dark:bg-dark">
          {filterValues.map((value: string, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handleChange(filterName, value);
                  setShowValues(false);
                }}
                className="text-start font-semibold px-3 w-[150px] h-9 rounded-md hover:bg-tertiary/5 hover:dark:bg-tertiary/60 capitalize"
              >
                {value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ResultsPerPageButton = ({
  pageSize,
  handleSize,
}: {
  pageSize: number;
  handleSize: (newPageSize: number) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showAmountNewsPerPage, setShowAmountNewsPerPage] =
    useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowAmountNewsPerPage(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="flex flex-1 md:flex-0 items-center justify-start md:justify-center gap-2 relative"
    >
      <span className="">Results per page</span>
      <button
        onClick={() => setShowAmountNewsPerPage(!showAmountNewsPerPage)}
        className="w-14 py-1 flex items-center justify-center gap-2 border border-tertiary/20 dark:border-tertiary rounded-md"
      >
        <span>{pageSize}</span>
        <CaretDown size={16} />
      </button>

      {showAmountNewsPerPage && (
        <div className="animate-fade-yaxis absolute z-[100] top-full mt-1 right-0 flex flex-col border border-tertiary/20 dark:border-tertiary rounded-md bg-light dark:bg-dark ">
          {resultsPerPage.map((amount: number, index: number) => {
            return (
              <button
                onClick={() => handleSize(amount)}
                key={index}
                className="py-1 w-14 rounded-md hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
              >
                {amount}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NewsOptions = ({
  newsId,
  linkSlug,
  refetchNews,
}: {
  newsId: string;
  linkSlug: string;
  refetchNews: () => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  const deleteNews = async (newsId: string) => {
    const areYouSure = confirm(`Do you really want to delete the news?`);

    if (areYouSure) {
      const response = await removeNews(newsId);

      if (response.status === 200) {
        alert("News delete successfully");
        refetchNews();
      }
    }
    setShowOptions(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        type="button"
        className="flex items-center justify-center h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary"
      >
        <CirclesFour size={16} weight="bold" />
      </button>

      {showOptions && (
        <div className="animate-fade-xaxis absolute z-[100] right-full top-0 mr-1 flex flex-col border border-tertiary/20 dark:border-tertiary rounded-md bg-light dark:bg-dark ">
          <Link
            target="_blank"
            to={`${clientUrl + "article/" + linkSlug}`}
            className="flex items-center justify-between gap-4 px-3 py-2 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            <span className="font-semibold">Go to</span>
            <Eye size={16} weight="bold" />
          </Link>
          {/* <button className="flex items-center justify-between gap-4 px-3 py-2 hover:bg-tertiary/20 dark:hover:bg-tertiary">
            <span className="font-semibold">Edit</span>
            <PencilSimple size={16} weight="bold" />
          </button> */}
          <Link
            to={`edit?linkSlug=${linkSlug}`}
            className="flex items-center justify-between gap-4 px-3 py-2 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            <span className="font-semibold">Edit</span>
            <PencilSimple size={16} weight="bold" />
          </Link>
          <button
            onClick={() => deleteNews(newsId)}
            className="flex items-center justify-between gap-4 px-3 py-2 hover:bg-tertiary/20 dark:hover:bg-tertiary"
          >
            <span className="font-semibold">Delete</span>
            <Trash size={16} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
};

// Table components
const LoadingRow = () => (
  <tr className="w-full">
    <td className="w-full py-6 font-semibold" colSpan={5}>
      <div className="w-full flex items-center justify-center gap-4">
        <span className="text-sm">Checking team</span>
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-vibrant border-t-transparent" />
      </div>
    </td>
  </tr>
);

const ErrorRow = () => (
  <tr className="w-full">
    <td className="w-full text-center py-6 font-semibold" colSpan={5}>
      Error on fetching news
    </td>
  </tr>
);

const SkeletonRows = ({ pageSize }: { pageSize: number }) =>
  Array.from({ length: pageSize }).map((_, index) => (
    <tr key={index}>
      <td className="animate-pulse p-3 border-y border-tertiary/20 dark:border-tertiary">
        <div className="h-8 w-[70px] bg-tertiary/20 dark:bg-tertiary rounded-md" />
      </td>
      <td className="animate-pulse p-3 border-y border-tertiary/20 dark:border-tertiary">
        <div className="h-8 w-[400px] bg-tertiary/20 dark:bg-tertiary rounded-md" />
      </td>
      <td className="animate-pulse p-3 border-y border-tertiary/20 dark:border-tertiary">
        <div className="h-8 w-[100px] bg-tertiary/20 dark:bg-tertiary rounded-md" />
      </td>
      <td className="animate-pulse p-3 border-y border-tertiary/20 dark:border-tertiary">
        <div className="h-8 w-[80px] bg-tertiary/20 dark:bg-tertiary rounded-md" />
      </td>
      <td className="animate-pulse p-3 border-y border-tertiary/20 dark:border-tertiary w-full">
        <div className="h-8 w-8 bg-tertiary/20 dark:bg-tertiary rounded-md" />
      </td>
    </tr>
  ));

const NewsRows = ({
  news,
  refetchNews,
}: {
  news: NewsProps[];
  refetchNews: () => void;
}) =>
  news.map((article) => (
    <tr
      key={article.id}
      className="text-sm hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
    >
      <td className="border-y border-tertiary/20 dark:border-tertiary p-3">
        <div className="flex items-center justify-start">
          <div className="font-semibold border-[1px] border-tertiary/20 dark:border-tertiary rounded-md py-1 px-4 capitalize">
            {article.category}
          </div>
        </div>
      </td>
      <td className="border-y text-nowrap border-tertiary/20 dark:border-tertiary p-3 font-semibold cursor-pointer duration-100 hover:underline">
        <Link target="_blank" to={`${clientUrl + "article/" + article.slug}`}>
          {article.title}
        </Link>
      </td>
      <td className="border-y border-tertiary/20 dark:border-tertiary p-3 text-nowrap">
        {format(parseISO(article.createdAt), "MM/dd/yyyy")}
      </td>
      <td className="border-y border-tertiary/20 dark:border-tertiary p-3">
        Published
      </td>
      <td className="border-y border-tertiary/20 dark:border-tertiary p-3">
        <NewsOptions
          newsId={article.id}
          linkSlug={article.slug}
          refetchNews={refetchNews}
        />
      </td>
    </tr>
  ));

const EmptyRow = () => (
  <tr className="w-full">
    <td className="w-full text-center py-6 font-semibold" colSpan={5}>
      No news found 😪
    </td>
  </tr>
);

export function List() {
  const { activeTeam, loading } = useContext(TeamContext);

  const [filters, setFilters] = useState<FilterProps>({
    title: "",
    category: "",
    status: "",
  });

  const [options, setOptions] = useState<ListOptions>({
    pageSize: resultsPerPage[0],
    currentPage: 1,
    totalNews: 0,
    totalPages: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    setFilters((prevState: FilterProps) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilter = (filterName: string, filterValue: string) => {
    setFilters((prevState) => ({
      ...prevState,
      [filterName]: filterValue,
    }));
  };

  const handlePageChange = (direction: string) => {
    let page = options.currentPage;

    switch (direction) {
      case "first": {
        page = 1;
        break;
      }

      case "prev": {
        page = page > 1 ? page - 1 : 1;
        break;
      }

      case "next": {
        page = page === options.totalPages ? page : page + 1;
        break;
      }

      default: {
        page = options.totalPages;
        break;
      }
    }

    setOptions((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setOptions((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  };

  const {
    news,
    isFetching,
    error,
    refetch: refetchNews,
  } = useFetchBasicNews(
    activeTeam?.id || "",
    options.currentPage,
    options.pageSize,
    filters
  );

  const newsByTeam = news?.data.news;

  useEffect(() => {
    if (activeTeam !== null && news) {
      setOptions((prevState) => ({
        ...prevState,
        totalNews: news.data.totalNews,
        totalPages: news.data.totalPages,
      }));
    }
  }, [news]);

  return (
    <div>
      <h2 className="font-bold mb-10">A list of all your news</h2>

      <div className="w-full flex flex-col gap-6">
        {/* Filters */}
        <div className="flex gap-4 items-center justify-start flex-wrap">
          <div className="w-[300px]">
            <Input
              id="title"
              name="title"
              value={filters.title || ""}
              placeholder="Filter news..."
              handleChange={handleChange}
            />
          </div>
          <FilterButton
            filterName="category"
            filterDefaultValue={filters.category}
            filterValues={categories}
            handleChange={handleFilter}
          />
          <button
            onClick={() => setFilters({ category: "", status: "", title: "" })}
            className="relative h-9 px-3 text-sm font-semibold border-tertiary/20 dark:border-tertiary rounded-md flex items-center justify-center gap-3 cursor-pointer duration-100 hover:bg-tertiary/10 dark:hover:bg-tertiary"
          >
            <span>Reset </span>
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-scroll xl:overflow-hidden border border-tertiary/20 dark:border-tertiary rounded-md">
          <table className="w-full border-collapse rounded-md">
            <thead>
              <tr className="text-sm font-bold w-full overflow-x-scroll text-left rtl:text-right">
                <th className="p-3 w-[10%]">Category</th>
                <th className="p-3 w-[60%]">Title</th>
                <th className="p-3 w-[10%]">Created At</th>
                <th className="p-3 w-[10%]">Status</th>
                <th className="p-3 w-[10%]"></th>
              </tr>
            </thead>
            <tbody>
              {loading && <LoadingRow />}
              {error && <ErrorRow />}
              {isFetching && <SkeletonRows pageSize={options.pageSize} />}
              {!loading && !error && !isFetching && newsByTeam && (
                <NewsRows news={newsByTeam} refetchNews={refetchNews} />
              )}
              {!loading && !error && !isFetching && !newsByTeam?.length && (
                <EmptyRow />
              )}
            </tbody>
          </table>
        </div>

        {/* Footer options */}
        <div className="flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between text-sm font-semibold gap-4">
          <span>
            Showing {options.pageSize} results of {options.totalNews}
          </span>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-12">
            <ResultsPerPageButton
              pageSize={options.pageSize}
              handleSize={handlePageSizeChange}
            />
            {/* <div className="flex flex-1 md:flex-0 items-center justify-start md:justify-center gap-2 relative">
              <span className="">Results per page</span>
              <button
                onClick={() => setShowAmountNewsPerPage(!showAmountNewsPerPage)}
                className="w-14 py-1 flex items-center justify-center gap-2 border border-tertiary/20 dark:border-tertiary rounded-md"
              >
                <span>{options.pageSize}</span>
                <CaretDown size={16} />
              </button>

              {showAmountNewsPerPage && (
                <div className="animate-fade-yaxis absolute top-full mt-1 right-0 flex flex-col border border-tertiary/20 dark:border-tertiary rounded-md bg-light dark:bg-dark ">
                  {resultsPerPage.map((amount: number, index: number) => {
                    return (
                      <button
                        onClick={() => handlePageSizeChange(amount)}
                        key={index}
                        className="py-1 w-14 rounded-md hover:bg-tertiary/5 hover:dark:bg-tertiary/60"
                      >
                        {amount}
                      </button>
                    );
                  })}
                </div>
              )}
            </div> */}

            <span className="text-center w-full sm:w-auto">
              Page {options.currentPage} of {options.totalPages}
            </span>

            <div className="w-full sm:w-auto flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => handlePageChange("first")}
                className={`flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary ${options.currentPage === 1 ? "pointer-events-none cursor-not-allowed disabled opacity-20" : ""}`}
              >
                <CaretDoubleLeft size={14} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => handlePageChange("prev")}
                className={`flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary ${options.currentPage === 1 ? "pointer-events-none cursor-not-allowed disabled opacity-20" : ""}`}
              >
                <CaretLeft size={14} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => handlePageChange("next")}
                className={`flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary ${options.currentPage === options.totalPages ? "pointer-events-none cursor-not-allowed disabled opacity-20" : ""}`}
              >
                <CaretRight size={14} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => handlePageChange("last")}
                className={`flex items-center justify-center border border-tertiary/20 dark:border-tertiary h-8 w-8 rounded-md duration-100 hover:bg-tertiary/20 dark:hover:bg-tertiary ${options.currentPage === options.totalPages ? "pointer-events-none cursor-not-allowed disabled opacity-20" : ""}`}
              >
                <CaretDoubleRight size={14} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
