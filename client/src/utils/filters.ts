export const parseQueryString = (search: string) => {
  const urlParams = new URLSearchParams(search);
  const params: Record<string, string> = {};

  urlParams.forEach((value, key) => {
    if (value) {
      params[key] = value;
    }
  });

  return params;
};

export const buildQueryString = (filters: any) => {
  const urlParams = new URLSearchParams();
  for (const key in filters) {
    if (filters[key]) {
      urlParams.set(key, filters[key]);
    }
  }
  return urlParams.toString();
};
