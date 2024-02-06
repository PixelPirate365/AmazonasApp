import React, { useEffect, useContext } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useReducer } from "react";
import { orderPageReducer } from "../reducers/orderPageReducer";
import Loading from "../components/Shared/Loading";
import MessageBox from "../components/Shared/MessageBox";
import { useParams } from "react-router-dom";
import Title from "../components/Shared/Title";
import { GET_ERROR, GET_SUCCESS, GET_REQUEST } from "../Actions";
import { toast } from "react-toastify";
import { getError } from "../utils";

import { Store } from "../store";
import OrderDetails from "../components/Shared/OrderDetails";

const initialState = { loading: true, error: "", data: [] };

const OrderDetailsPage = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    orderPageReducer,
    initialState
  );
  const { order } = data;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // Fetch order details from the database
    const fetchOrderDetails = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(`/api/v1/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error(getError(error));
        dispatch({ type: GET_ERROR, payload: getError(error) });
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <>
      <Title title="Order Details" />
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <h2>Order Number: {order._id}</h2>
                <ListGroup.Item>
                  <h2>Shipping Details</h2>
                  <p></p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Details</h2>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup variant="flush">
                    <OrderDetails order={order} />
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default OrderDetailsPage;
