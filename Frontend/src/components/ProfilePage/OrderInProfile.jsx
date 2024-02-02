import { useContext, useState } from "react";
import { ListGroup, Row, Col, Button, Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";
import MessageBox from "../Shared/MessageBox";
import { Store } from "../../store";
import { useNavigate } from "react-router-dom";

const OrderInProfile = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userOrders } = state;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const navigateToOrderDetails = (order) => {
    setSelectedOrder(order);
    navigate(`/order/${order._id}`);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <div>
      <ListGroup>
        <h2>My Orders</h2>
        {userOrders.length === 0 ? (
          <MessageBox variant="info">You have no orders</MessageBox>
        ) : (
          userOrders.map((order, index) => (
            <ListGroup.Item className="list-group-item-primary" key={order._id}>
              <Row className="d-flex align-items-center">
                <Col md={1}>
                  <strong>#{index + 1}</strong>
                </Col>
                <Col md={2}>
                  <strong>{order.createdAt.substring(0, 10)}</strong>
                </Col>
                <Col md={2}>
                  <strong>Total price: ${order.itemsPrice}</strong>
                </Col>
                <Col md={2}>
                  <MessageBox variant={order.isPaid ? "success" : "danger"}>
                    <strong>{order.isPaid ? "Paid" : "Not Paid"}</strong>
                  </MessageBox>
                </Col>
                <Col md={2}>
                  <MessageBox
                    variant={order.isDelivered ? "success" : "danger"}
                  >
                    {" "}
                    <strong>
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </strong>
                  </MessageBox>
                </Col>
                <Col md={2}>
                  <Button
                    className="btn-info"
                    onClick={() => {
                      handleButtonClick(order);
                    }}
                  >
                    <strong>Shipping Details</strong>
                  </Button>
                </Col>
                <Col md={1}>
                  <Button
                    onClick={() => {
                      navigateToOrderDetails;
                    }}
                  >
                    <i className="fa fa-info-circle"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h5>Shipping Address</h5>
                <p>
                  <strong>FullName:</strong> {selectedOrder.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong> {selectedOrder.shippingAddress.address}
                  <br />
                  <strong>City:</strong> {selectedOrder.shippingAddress.city}
                  <br />
                  <strong>PostalCode:</strong> {selectedOrder.shippingAddress.postalCode}
                  <br />
                  <strong>Country:</strong> {selectedOrder.shippingAddress.country}
                  <br />
                </p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
OrderInProfile.propTypes = {
  userOrders: PropTypes.array,
};
export default OrderInProfile;
