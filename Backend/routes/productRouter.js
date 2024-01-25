import express from "express";
import {
  getProducts,
  getProductById,
    getProductByToken,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/token/:token", getProductByToken);

export default productRouter;
