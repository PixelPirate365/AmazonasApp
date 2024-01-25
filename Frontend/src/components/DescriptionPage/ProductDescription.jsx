import { ListGroup } from "react-bootstrap";
import Rating from "../Shared/Rating";
import { propTypes } from "react-bootstrap/esm/Image";
import Product from "../HomePage/Product";

const ProductDescription = ({ title, rating, price, description }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h3>{title}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} numReviews={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${price}</ListGroup.Item>
      <ListGroup.Item>Description: {description}</ListGroup.Item>
    </ListGroup>
  );
};
ProductDescription.propTypes = {
  title: propTypes.string,
  rating: propTypes.object,
  price: propTypes.number,
  description: propTypes.string,
};

export default ProductDescription;
