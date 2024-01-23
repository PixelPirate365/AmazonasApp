import { useEffect, useReducer } from "react";
import Title from "../components/Shared/Title";
import { homePageReducer } from "../reducers/homePageReducer";
import axios from "axios";
// rafce shortcut
const initialState = { loading: true, error: "", data: [] };
const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/products"
        );
        dispatch({ type: "GET_SUCCESS", payload: data});
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      
        dispatch({ type: "GET_ERROR", payload: error.message });
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Title title="HomePage" />
      HomePage
    </div>
  );
};

export default HomePage;
