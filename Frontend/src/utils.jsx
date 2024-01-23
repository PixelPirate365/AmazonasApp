const getError = (error) => {
    if (error.message && error.response.data.message) {
        return error.response.data.message;
    } else {
        return error.message;
    }
};

export { getError };
