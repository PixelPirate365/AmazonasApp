 import { ListGroup, Row, Col } from "react-bootstrap";
import MessageBox from "./MessageBox";



const OrderDetails = ({ order }) => {
  return (
    <div>
      {" "}
      {order && order.orderItems && order.orderItems.length > 0 ? (
        order.orderItems.map((item) => (
          <ListGroup.Item key={item._id}>
            <Row>
              <Col md={2}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid rounded img-thumbnail"
                />
              </Col>
              <Col>
                <strong>{item.title}</strong>
              </Col>
              <Col md={3}>
                <strong>
                  {item.quantity} x ${item.price} = $
                  {item.quantity * item.price}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      ) : (
        <MessageBox variant="info">No items in the order</MessageBox>
      )}
    </div>
  );
};

export default OrderDetails;
