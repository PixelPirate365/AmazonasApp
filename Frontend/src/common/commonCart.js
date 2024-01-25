import axios from "axios";
import { toast } from "react-toastify";
import { CART_ADD_ITEM } from "../Actions";
import { getError } from "../utils";

export const addToCartHandler = async (product, cartItems, ctxDispatch) => {
  const existItem = cartItems.find((item) => item._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({ type: CART_ADD_ITEM, payload: { ...product, quantity } });
    toast.success("Product added to cart");
  } catch (error) {
    getError(error);
  }
};
