export const getError = (error) => {
    if (error.response && error.response.data) {
      return error.response.data.message || "Something went wrong";
    }
    return error.message || "Something went wrong";
  };