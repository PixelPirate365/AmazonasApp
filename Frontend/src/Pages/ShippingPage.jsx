import { useContext, useEffect } from "react";
import Title from "../components/Shared/Title";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import CheckoutSteps from "../components/ShippingPage/CheckoutSteps";
import { Container, Form, Button } from "react-bootstrap";
import { SAVE_SHIPPING_ADDRESS } from "../Actions";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      ctxDispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data,
      });
      navigate("/payment");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [cartItems.length, navigate, userInfo]);

  return (
    <div>
      <Title title="Shipping Page" />
      <CheckoutSteps isStep1 isStep2 />
      <Container className="small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              required
              type="text"
              name="fullName"
              placeholder="Enter full name"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              placeholder="Enter address"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              required
              type="text"
              name="city"
              placeholder="Enter city"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              required
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              required
              type="text"
              name="country"
              placeholder="Enter country"
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ShippingPage;
