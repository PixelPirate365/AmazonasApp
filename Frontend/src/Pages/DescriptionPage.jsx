import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "../store";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Loading from "../components/Shared/Loading";
import MessageBox from "../components/Shared/MessageBox";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useReducer } from "react";
import { descriptionPageReducer } from "../reducers/descriptionPageReducer";
import { GET_ERROR, GET_SUCCESS, GET_REQUEST } from "../Actions";
import ProductDescription from "../components/DescriptionPage/ProductDescription";
import CartDescription from "../components/DescriptionPage/CartDescription";
import { addToCartHandler } from "../common/commonCart";
import Title from "../components/Shared/Title";

const initialState = { loading: true, error: "", data: [] };

const DescriptionPage = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    descriptionPageReducer,
    initialState
  );
  const params = useParams();
  const {token} = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cartItems } = state.cart;
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(
          `/api/v1/products/token/${token}`
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: GET_ERROR, payload: getError(error) });
      }
    };
    getProduct();
  }, []);
  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch);
    navigate("/cart");
  };

  return (
    <div>
      <Title title={data.title} />
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={data.image} alt={data.title}></img>
            </Col>
            <Col md={3}>
              <ProductDescription {...data} />
            </Col>
            <Col md={3}>
              <CartDescription data={data} addToCart={addToCart}/>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DescriptionPage;
