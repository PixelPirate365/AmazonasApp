import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.send(products);
    //res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      // It's not a valid ObjectId, do something here
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const product = await Product.findById(id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getProductByToken = async (req, res) => {
  try {
    const { token } = req.params;
    const product = await Product.findOne({ token: token });
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
