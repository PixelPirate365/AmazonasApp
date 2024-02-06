import { useState, useReducer, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { RATINGS, PRICES } from "../constants";
import { searchPageReducer } from "../reducers/searchPageReducer";
import { getFilterUrl } from "../utils";
import { Row, Col, Button } from "react-bootstrap";
import Rating from "../components/Shared/Rating";
import Loading from "../components/Shared/Loading";
import MessageBox from "../components/Shared/MessageBox";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { GET_ERROR, GET_SUCCESS, GET_REQUEST } from "../Actions";
import Title from "../components/Shared/Title";
import Product from "../components/HomePage/Product";
import { LinkContainer } from "react-router-bootstrap";

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("pricemin") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(searchPageReducer, { loading: true, error: "" });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/products/categories");
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    getCategories();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: GET_REQUEST });
        const { data } = await axios.get(
          `/api/v1/products/search?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        console.log(data);
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_ERROR, payload: getError(error) });
      }
    };
    getProducts();
  }, [category, query, price, rating, order, page]);

  return (
    <div>
      <Title title="Search Page" />
      <Row>
        <Col md={3}>
          <div>
            <h3>Categories:</h3>

            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={getFilterUrl(search, { category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item}>
                  <Link
                    to={getFilterUrl(search, { category: item })}
                    className={category === item ? "text-bold" : ""}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Prices:</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={getFilterUrl(search, { price: "all" })}
                >
                  Any
                </Link>
              </li>
              {PRICES.map((item) => (
                <li key={item.value}>
                  <Link
                    to={getFilterUrl(search, { price: item.value })}
                    className={price === item.value ? "text-bold" : ""}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Ratings:</h3>
            <ul>
              <li className="mb-2">
                <Link
                  className={"all" === rating ? "text-bold" : ""}
                  to={getFilterUrl(search, { rating: "all" })}
                >
                  Any
                </Link>
              </li>
              {RATINGS.map((item) => (
                <li key={item.name} className="mb-2">
                  <Link
                    to={getFilterUrl(search, { rating: item.rating })}
                    className={rating === item.rating ? "text-bold" : ""}
                  >
                    <Rating rating={item.rating} caption={" "} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <Loading />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && ` for "${query}"`}
                    {category !== "all" && ` in "${category}"`}
                    {price !== "all" && ` with price "${price}"`}
                    {rating !== "all" && ` with rating "${rating}" & up`}
                    {query !== "all" ||
                    category !== "all" ||
                    price !== "all" ||
                    rating !== "all" ? (
                      <Button
                        className="mx-2"
                        variant="light"
                        onClick={() => {
                          navigate(
                            getFilterUrl(search, {
                              query: "all",
                              category: "all",
                              price: "all",
                              rating: "all",
                              order: "newest",
                              page: 1,
                            })
                          );
                        }}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl(search, { order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={{
                      pathname: "/search",
                      search: getFilterUrl(search, { page: x + 1 }, true),
                    }}
                  >
                    <Button
                      className={
                        Number(page) === x + 1 ? "highlight-current-page" : ""
                      }
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
