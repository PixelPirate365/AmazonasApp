import {
  USER_SIGNIN,
  USER_SIGNOUT,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../Actions";

export const storeReducer = (state, action) => {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: payload };
    }
    case USER_SIGNOUT: {
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    }
    case CART_ADD_ITEM: {
      const newItem = payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case SAVE_SHIPPING_ADDRESS: {
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: payload },
      };
    }
    case SAVE_PAYMENT_METHOD: {
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: payload },
      };
    }
    default:
      return state;
  }
};
