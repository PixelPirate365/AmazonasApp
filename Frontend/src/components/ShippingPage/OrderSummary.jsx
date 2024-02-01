import PropTypes from "prop-types";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import MessageBox from "../Shared/MessageBox";
import { Link, useNavigate } from "react-router-dom";

const OrderSummary = ({ cart, status, isDelivered }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title as="h4">Shipping Address</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
            <strong>Address:</strong> {cart.shippingAddress.address} <br />
            <strong>City:</strong> {cart.shippingAddress.city} <br />
            <strong>Postal Code:</strong> {cart.shippingAddress.postalCode}{" "}
            <br />
            <strong>Country:</strong> {cart.shippingAddress.country} <br />
          </Card.Text>
          {status === "submitOrder" ? (
            <></>
          ) : isDelivered ? (
            <MessageBox variant="success">Delivered</MessageBox>
          ) : (
            <MessageBox variant="danger">Not Delivered</MessageBox>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title as="h4">Payment Method</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="d-flex align-items-center my-3 me-2 ms-4">
            <strong>Paying Method: {cart.paymentMethod}</strong> 
          </Card.Text>
          {status === "submitOrder" ? (
            <div className="d-flex align-items-center my-3 me-2 ms-4">
            <Button
              variant="outline-secondary"
              id="button-edit-payment-method"
              onClick={() => navigate("/payment")}
            >
             Edit Payment Method
            </Button> :
          </div>
          ) : status === "detailsUnpaid" ? (
            <MessageBox variant="danger">Not Paid</MessageBox>
          ) : (
            <MessageBox variant="success">Paid</MessageBox>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header>
          <Card.Title as="h4">Items</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cart.cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={3}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded img-thumbnail"
                    />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item.token}`}>
                      <strong>{item.title}</strong>
                    </Link>
                  </Col>
                  <Col md={2}>
                    <strong>
                      Quantity: <span>{item.quantity}</span>
                    </strong>
                  </Col>
                  <Col md={2}>
                    <strong>
                      Price: <span>${item.price}</span>
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {status === "submitOrder" && (
            <div className="d-flex align-items-center my-3 me-2 ms-4">
              <Button
                variant="outline-secondary"
                id="button-edit-items"
                onClick={() => navigate("/cart")}
              >
                Edit Items
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
OrderSummary.propTypes = {
  cart: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  isDelivered: PropTypes.bool,
};
export default OrderSummary;
