import User from "../models/userSchema.js";
import {
  loginUserSchema, registerUserSchema,
} from "../utils/schemaValidation/userValidation.js";
import { login, register } from "../services/user.js";

export const registerController = async (req, res) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return res.json({
      message: "Invalid Credentials Format",
      error: error.message,
    });
  }
  const resObj = await register(req,res);
  return res.status(resObj.status).json(resObj.jsonData);
};

export const loginController = async (req, res) => {
  const validation = loginUserSchema.validate(req.body);
  if (validation.error) {
    return res.json({
      message: "Invalid Credentials Format",
      error: validation.error.details,
    });
  }
    // find user on the basis of their unique entity and after that compare the password if entity is valid

  const resObj = await login(req,res);
  return res.status(resObj.status).json(resObj.jsonData); 
};
