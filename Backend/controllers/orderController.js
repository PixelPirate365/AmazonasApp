import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

const addOrder = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (req.body.orderItems && req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    res.send({order: order});
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.send({orders:orders});
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});
export { addOrder, getOrderById, getOrdersByUser };
