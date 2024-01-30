import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "../Actions";

export const cartPageReducer = (state, action) => {
  switch (action.type) {
    case GET_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case GET_SUCCESS: {
        return { ...state, loading: false};
      }
    default:
      return state;
  }
};