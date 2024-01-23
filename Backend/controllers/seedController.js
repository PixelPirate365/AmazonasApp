import data from "../data.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const seedData = async (req, res) => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await User.insertMany(data.users);
    await Product.insertMany(data.products);
    res.send(data);
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default seedData;
