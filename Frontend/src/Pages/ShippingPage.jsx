import { useState, useContext, useEffect } from "react";
import Title from "../components/Shared/Title";
import ShippingModel from "../models/ShippingModel";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import CheckoutSteps from "../components/ShippingPage/CheckoutSteps";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const shipping = new ShippingModel(
      fullName,
      address,
      city,
      postalCode,
      country
    );
    console.log(shipping);
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfo, cartItems.length]);

  return (
    <div>
      <Title title="Shipping Page" />
      <CheckoutSteps isStep1={true} isStep2={true} isStep3={false} isStep4={false}/>
    </div>
  );
};

export default ShippingPage;
