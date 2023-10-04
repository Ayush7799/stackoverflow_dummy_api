import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/authentication/jwtAuthentication.js";

export const register = async (req, res) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 409, jsonData: { message: "Email Already exists" } };
  }
  const password = req.body.password;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = User.create({...req.body,email,password: hashedPassword});
  return { status: 201, jsonData: { message: "User created successfully", data: newUser } };
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: 400,
      jsonData: {
        message: "Invalid email",
      },
    };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { status: 401, jsonData: { error: 'Incorrect password' }};
  }
  const token = generateToken({userId: user._id});
  return {status: 200, jsonData:{ message: 'Login successful', data: user, token: token }};
};
