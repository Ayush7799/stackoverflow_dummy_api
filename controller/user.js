import User from "../models/userSchema.js";
import { generateToken } from "../services/jwtAuthentication.js";

export const register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.json({ message: "Email Already exists" });
    return;
  }
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json({ message: "User registered Succesfully", data: newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const token = generateToken(user.id);
  return res.json({ message: "Succesfully signed in", data: user, token });
};
