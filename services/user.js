import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/authentication/jwtAuthentication.js";
import { logger } from "../utils/loggers/logger.js";
import statusCodes from "../utils/responseInfo/statusCodes.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: statusCodes.CONFLICT,
        jsonData: { message: "Email Already exists" },
      };
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = User.create({
      ...req.body,
      email,
      password: hashedPassword,
    });
    return {
      status: statusCodes.CREATED,
      jsonData: { message: "User created successfully", data: newUser },
    };
  } catch (error) {
    return {
      status: statusCodes.INTERNAL_SERVER_ERROR,
      jsonData: { message: error.message },
    };
  }
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
    return { status: 401, jsonData: { error: "Incorrect password" } };
  }
  const token = generateToken({ userId: user._id });
  return {
    status: 200,
    jsonData: { message: "Login successful", data: user, token: token },
  };
};

export const getProfile = async (req, res) => {
  const userId = req.query.userId;
  logger.warn(userId);
  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    logger.error(e);
    return { status: 404, jsonData: { message: "Failed" } };
  }
  logger.info("service ->" + user);

  return {
    status: 200,
    jsonData: {
      message: "Profile fetched Successfully",
      data: user,
    },
  };
};

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFlODk2MmY5MzYxNDljZGNiMTYxOWMiLCJpYXQiOjE2OTY1MDAyMjF9.Hh3zjPm6gs9pE4eJqiay-7tpw2HEdidplP8iCoDlHY4
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFlODk5NmY5MzYxNDljZGNiMTYxOWYiLCJpYXQiOjE2OTY1MDAyNzd9.QItrqqG1jiyV4UZQQxuTlfMLoNUZLE_tZ7YwcOPSkDE
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTFlODlhNGY5MzYxNDljZGNiMTYxYTIiLCJpYXQiOjE2OTY1MDAyOTh9.flo9FPcjafTsEUvED5IrwxHEYjQTU9DESZq093DiviY
*/
