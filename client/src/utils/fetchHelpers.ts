export interface QueryOptions {
  category?: string;
  keyword?: string;
  country?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
  lang?: string;
}

export const buildQueryParams = (options: QueryOptions = {}) => {
  const { category, sortBy, pageSize, page = 1 } = options;

  return {
    ...(category && { category }),
    ...(sortBy && { sortBy }),
    page: page ?? 1,
    size: pageSize ?? 10,
  };
};

// export const buildQueryParams = (options: QueryOptions) => {
//   const {
//     category,
//     keyword: q,
//     country,
//     sortBy,
//     pageSize,
//     page,
//     lang,
//   } = options;

//   return {
//     ...(category && { category }),
//     ...(q && { q }),
//     ...(country && { country }),
//     ...(sortBy && { sortBy }),
//     ...(lang && { lang }),
//     _page: page ?? 1,
//     _per_page: pageSize ?? 10,
//     country: "us",
//   };
// };
