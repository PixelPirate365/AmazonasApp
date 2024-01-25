import { ListGroup } from "react-bootstrap";
import Rating from "../Shared/Rating";
import PropTypes from "prop-types";



const ProductDescription = ({ title, rating, price, description }) => {

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h3 style={{ wordWrap: "break-word" }}>{title}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating rating={rating.rate} numReviews={rating.count} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${price}</ListGroup.Item>
      <ListGroup.Item>
        <p style={{ wordWrap: "break-word" }} className="lead">
          Description: {description}
        </p>
      </ListGroup.Item>
    </ListGroup>
  );
};
ProductDescription.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default ProductDescription;
