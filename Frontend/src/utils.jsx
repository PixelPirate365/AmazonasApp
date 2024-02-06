export const getError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || "Something went wrong";
  }
  return error.message || "Something went wrong";
};
export const getFilterUrl = (searchFromUrl, filter, skipPathName) => {
  const searchParams = new URLSearchParams(searchFromUrl);
  const defaultParams = {
    category: "all",
    query: "all",
    price: "all",
    rating: "all",
    order: "newest",
    page: 1,
  };

  const params = new URLSearchParams(
    Object.keys(defaultParams).reduce((acc, key) => {
      acc[key] = filter[key] || searchParams.get(key) || defaultParams[key];
      return acc;
    }, {})
  ).toString();

  const link = `${skipPathName ? "" : "/search?"}${params}`;
  return link;
};
