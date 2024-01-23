import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = ({ _id, name, email }) => {
  return jwt.sign(
    { _id: _id, name: name, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
