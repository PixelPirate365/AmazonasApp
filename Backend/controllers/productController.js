import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.send(products);
    //res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getProductsByQuery = async (req, res) => {
  try {
    const { query } = req;
    const page = query.page || 1;
    const category = query.category || "";
    const rating = query.rating || "";
    const price = query.price || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const pageSize = query.pageSize || 6;

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter = rating && rating !== "all"
      ? { "rating.rate": { $gte: Number(rating) } }
      : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrderFilter =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
      ...priceFilter,
    })
      .sort(sortOrderFilter)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
      ...priceFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
