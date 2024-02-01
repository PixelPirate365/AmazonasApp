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
export const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer xxx => xxx
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
}
