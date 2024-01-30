import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import Title from "../components/Shared/Title";
import { Col, Row } from "react-bootstrap";
import Checkout from "../components/CartPage/Checkout";
import ItemsInCart from "../components/CartPage/ItemsInCart";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Actions";
import { toast } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  const updateCartHandler = async (product, quantity) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${product._id}`);
      if (data.countInStock < quantity) {
        toast.warn("Sorry. Product is out of stock");
        return;
      }
      ctxDispatch({ type: CART_ADD_ITEM, payload: { ...product, quantity } });
      toast.success("Product quantity updated");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  const removeProductHandler = async (product) => {
    try {
      ctxDispatch({ type: CART_REMOVE_ITEM, payload: { ...product } });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <div>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>
          <ItemsInCart
            cartItems={cartItems}
            updateCartHandler={updateCartHandler}
            removeProductHandler={removeProductHandler}
          />
        </Col>
        <Col md={4}>
          <Checkout cartItems={cartItems} checkoutHandler={checkoutHandler} />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
