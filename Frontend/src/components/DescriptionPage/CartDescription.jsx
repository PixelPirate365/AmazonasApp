import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import PropTypes from "prop-types";
const CartDescription = ({ data, addToCart }) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col md={6}>Price: </Col>
              <Col md={6}>${data.price}</Col>
            </Row>
            <Row>
              <Col md={6}>Status:</Col>
              <Col md={6}>
                {data.countInStock > 0 ? (
                  <Badge bg="success"> In Stock</Badge>
                ) : (
                  <Badge bg="danger"> Not in Stock</Badge>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          {data.countInStock > 0 && (
            <ListGroup.Item>
              <div className="d-grid">
                <Button onClick={() => addToCart(data)} variant="primary">
                  Add to Cart
                </Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
CartDescription.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

export default CartDescription;
