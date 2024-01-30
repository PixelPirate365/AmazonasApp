import { PropTypes } from "prop-types";
import MessageBox from "../Shared/MessageBox";
import { Link } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";

const ItemsInCart = ({
  cartItems,
  updateCartHandler,
  removeProductHandler,
}) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox variant="info">
          Cart is empty. <Link to="/">Go Shopping</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="d-flex align-items-center">
                <Col md={3}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded img-thumbnail"
                    style={{border:"none"}}
                  />
                </Col>
                <Col md={5}>
                  <Link to={`/product/${item.token}`}>
                    <strong>{item.title}</strong>
                  </Link>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => {
                      updateCartHandler(item, item.quantity - 1);
                    }}
                    name="minusButton"
                    disabled={item.quantity === 1}
                    variant="light"
                  >
                    <i className="fa fa-minus-circle"></i>
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    onClick={() => {
                      updateCartHandler(item, item.quantity + 1);
                    }}
                    name="plusButton"
                    disabled={item.quantity === item.countInStock}
                    variant="light"
                  >
                    <i className="fa fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    variant="light"
                    onClick={() => removeProductHandler(item)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  removeProductHandler: PropTypes.func,
};
export default ItemsInCart;
