import jwt from "jsonwebtoken";

const secret = "Ayush$123$";

const generateToken = (user) => {
  return jwt.sign(user, secret);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  jwt.verify(token.slice(7), secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decode.userId;
    next();
  });
};

export { generateToken, verifyToken };
