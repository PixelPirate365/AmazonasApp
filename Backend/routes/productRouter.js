import express from "express";
import {
  getProducts,
  getProductById,
  getProductByToken,
  getCategories,
  
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/categories", getCategories);
productRouter.get("/token/:token", getProductByToken);
productRouter.get("/:id", getProductById);


export default productRouter;
