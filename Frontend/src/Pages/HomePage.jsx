import { useEffect, useReducer } from "react";
import Title from "../components/Shared/Title";
import { homePageReducer } from "../reducers/homePageReducer";
import Loading from "../components/Shared/Loading";
import MessageBox from "../components/Shared/MessageBox";
import Products from "../components/HomePage/Products";
import { GET_ERROR, GET_REQUEST, GET_SUCCESS } from "../Actions";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";

// rafce shortcut
const initialState = { loading: true, error: "", data: [] };
const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const { loading, error, data } = state;
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const {data} = await axios.get("/api/v1/products");
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: GET_ERROR, payload: getError(error) });
      }
    };
    getProducts();
  }, []);


  return (
    <div>
      <Title title="HomePage" />
      <div className="backgroundHomePage">
        <img
          style={{ width: "100%" }}
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg"
          alt="BackgroundHomePage"
        />
      </div>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Products products={data}></Products>
        )}
      </div>
    </div>
  );
};

export default HomePage;
