import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
app.use(cors()); //does nothing at the moment
app.use(express.json()); // parses JSONs
app.use(express.urlencoded({ extended: false })); // common practice for urlencoded
// these three lines are boilerplate
//routes:
app.post("/addUser", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, function () {
      console.log("listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("error: " + err.message);
  });
