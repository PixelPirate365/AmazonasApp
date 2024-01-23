import { useEffect, useReducer } from "react";
import Title from "../components/Shared/Title";
import { homePageReducer } from "../reducers/homePageReducer";
import Loading from "../components/Shared/Loading";
import axios from "axios";
// rafce shortcut
const initialState = { loading: true, error: "", data: [] };
const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const { loading, error, data } = state;
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/products"
        );
        dispatch({ type: "GET_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "GET_ERROR", payload: error });
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
        {loading ? <Loading /> : error ? <MessageBox /> : <div>nice</div>}
      </div>
    </div>
  );
};

export default HomePage;
