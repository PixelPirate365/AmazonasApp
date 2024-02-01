import React, { useState, useContext, useEffect } from "react";
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
    cart: { cartItems, shippingAddress },
  } = state;

  const [formValues, setFormValues] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const isShippingAddressExist = () => {
    return shippingAddress && Object.keys(shippingAddress).length > 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    try {
      ctxDispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: formValues,
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
    // Set the form values when shippingAddress exists
    if (isShippingAddressExist()) {
      setFormValues({
        ...formValues,
        ...shippingAddress,
      });
    }
  }, [cartItems.length, navigate, userInfo, shippingAddress]);

  return (
    <div>
      <Title title="Shipping" />
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
              value={formValues.fullName}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              required
              type="text"
              name="address"
              placeholder="Enter address"
              value={formValues.address}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              required
              type="text"
              name="city"
              placeholder="Enter city"
              value={formValues.city}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              required
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
              value={formValues.postalCode}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              required
              type="text"
              name="country"
              placeholder="Enter country"
              value={formValues.country}
              onChange={handleInputChange}
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
