import data from '../data.js';
import User from '../models/User.js';
import Product from '../models/Product.js';


const seedData = async (req, res) => {
    await User.deleteMany();
    await Product.deleteMany();

    await User.insertMany(data.users);
    await Product.insertMany(data.products);
    res.send(data);
}; 
export default seedData;
