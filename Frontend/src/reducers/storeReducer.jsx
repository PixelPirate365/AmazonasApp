import { USER_SIGNIN,USER_SIGNOUT } from "../Actions";

export const storeReducer = (state, action) => {
  switch (action.type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: action.payload };
    }
    case USER_SIGNOUT: {
      return { ...state, userInfo: null };
    }
    default:
      return state;
  }
};