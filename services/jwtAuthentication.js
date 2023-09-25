import jwt from "jsonwebtoken";

const secret = "Ayush$123$";

const generateToken = (user) => {
  return jwt.sign(user, secret);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decode;
    next();
  });
};

export { generateToken, verifyToken };
