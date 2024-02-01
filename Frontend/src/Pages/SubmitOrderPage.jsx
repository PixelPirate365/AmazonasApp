import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/ShippingPage/CheckoutSteps";
import Title from "../components/Shared/Title";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Link } from "react-router-dom";
import axios from "axios";

const SubmitOrderPage = () => {
  const { state, dispatch } = useContext(Store);
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
      // Post request addOrder
      // Delete cartItems from state and localStorage
      // go to OrderDetails page /#id of order
    } catch (error) {
      toast.error(getError(error));
    }
    finally {
      setLoading(false);
    }
  };
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0) // check later
  );
  cart.taxPrice = round2(0.15 * itemsPrice);
  cart.shippingPrice = itemsPrice > 50 ? round2(0.05) : round2(0.02);
  cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;
  return (
    <div>
      <Title title="Place Order" />
      
    </div>
  );
};

export default SubmitOrderPage;
