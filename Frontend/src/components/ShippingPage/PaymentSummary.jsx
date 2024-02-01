import PropTypes from "prop-types";
import { Card, ListGroup, Row, Button, Col } from "react-bootstrap";
import Loading from "../Shared/Loading";

const PaymentSummary = ({
  loading,
  cart,
  status,
  submitOrderHandler,
  isDelivered,
}) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Payment Summary</Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Items Price:</Col>
              <Col>${cart.itemsPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Shipping Price:</Col>
              <Col>${cart.shippingPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Tax Price:</Col>
              <Col>${cart.taxPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Total Price:</Col>
              <Col>${cart.totalPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <Row>
          {status.toLower === "submitOrder" && (
            <Button
              variant="primary"
              onClick={submitOrderHandler}
              disabled={loading}
            >
              Submit
            </Button>
          )}
          {loading && <Loading />}
        </Row>
      </Card>
    </>
  );
};
PaymentSummary.propTypes = {
  cart: PropTypes.object,
  status: PropTypes.string,
  submitOrderHandler: PropTypes.func,
  loading: PropTypes.bool,
  isDelivered: PropTypes.bool,
};

export default PaymentSummary;
