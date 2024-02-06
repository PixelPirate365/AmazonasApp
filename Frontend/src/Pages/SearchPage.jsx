import { useState, useReducer, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RATINGS, PRICES } from "../constants";
import { searchPageReducer } from "../reducers/searchPageReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { GET_ERROR, GET_SUCCESS, GET_REQUEST } from "../Actions";

const initialState = {
  loading: true,
  products: [],
  pages: 1,
  countProducts: 0,
  error: "",
};

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "all";
  const price = searchParams.get("price") || "all";
  const rating = searchParams.get("rating") || "all";
  const order = searchParams.get("order") || "newest";
  const page = searchParams.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(searchPageReducer, initialState);

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
          `/api/v1/products?category=${category}&query=${query}&price=${price}&rating=${rating}&order=${order}&page=${page}`
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_ERROR, payload: getError(error) });
      }
    };
    getProducts();
  }, [category, query, price, rating, order, page]);

  return <div>SearchPage</div>;
};

export default SearchPage;
