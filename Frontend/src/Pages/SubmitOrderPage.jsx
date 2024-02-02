import { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import CheckoutSteps from "../components/ShippingPage/CheckoutSteps";
import Title from "../components/Shared/Title";
import { toast } from "react-toastify";
import { getError } from "../utils";
import OrderSummary from "../components/ShippingPage/OrderSummary";
import PaymentSummary from "../components/ShippingPage/PaymentSummary";
import axios from "axios";

const SubmitOrderPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, []);
  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
          user: userInfo._id,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      ctxDispatch({ type: "CLEAR_CART" });
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      console.error(error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0) // check later
  );

  cart.taxPrice = round2(0.15 * cart.itemsPrice);

  cart.shippingPrice = cart.itemsPrice > 50 ? round2(0.05) : round2(0.02);

  cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

  return (
    <div>
      <Title title="Place Order" />
      <CheckoutSteps isStep1 isStep2 isStep3 isStep4 />

      <h1 className="my-4 text-center">Order Details</h1>
      <Row>
        <Col md={8}>
          <OrderSummary cart={cart} status={"submitOrder"} />
        </Col>
        <Col md={4}>
          <PaymentSummary
            loading={loading}
            submitOrderHandler={submitOrderHandler}
            status={"submitOrder"}
            cart={cart}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrderPage;
