import { PropTypes } from "prop-types";
import { Card, ListGroup, Button } from "react-bootstrap";

const Checkout = ({ cartItems, checkoutHandler }) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) items
            </h2>
            $
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid gap-2">
              <Button
                onClick={() => checkoutHandler()}
                disabled={cartItems.length === 0}
                type="button"
              >
                Proceed to Checkout
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  checkoutHandler: PropTypes.func,
};

export default Checkout;
