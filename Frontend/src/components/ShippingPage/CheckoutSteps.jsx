import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

const CheckoutSteps = ({ isStep1, isStep2, isStep3, isStep4 }) => {
  return (
    <Row className="checkout-steps">
      <Col className={isStep1 ? "active" : ""}>Sign In</Col>
      <Col className={isStep2 ? "active" : ""}>Shipping</Col>
      <Col className={isStep3 ? "active" : ""}>Payment</Col>
      <Col className={isStep4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
};

CheckoutSteps.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};
export default CheckoutSteps;
