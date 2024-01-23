import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.send(products);
    //res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getProducts;
