import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addOrder,
  getOrderById,
  getOrdersByUser,
} from "../controllers/orderController.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, expressAsyncHandler(addOrder));
orderRouter.get("/:id", isAuth, expressAsyncHandler(getOrderById));
orderRouter.get("/", isAuth, expressAsyncHandler(getOrdersByUser));

export default orderRouter;
