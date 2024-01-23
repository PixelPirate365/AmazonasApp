import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "../Shared/Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <Card className='product-card'>
      <Link to={`/product/${product.token}`}>
        <Card.Img className="card-img-top" src={product.image} variant="top" alt="Product image" />
      </Link>
      <Card.Body className="card-body">
        <Link to={`/product/${product.token}`}>
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>
        <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
        <Card.Text as="h3">${product.price}</Card.Text>
        {product.countInStock > 0 ? (
          <Button className='btn-primary'>Add to Cart</Button>
        ) : (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
Product.propTypes = { product: PropTypes.object };
export default Product;
