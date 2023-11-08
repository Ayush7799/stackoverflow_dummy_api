import User from "../models/userSchema.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../utils/joiValidators/userValidation.js";
import { getProfile, login, register } from "../services/user.js";
import { logger } from "../utils/loggers/logger.js";
import statusCodes from "../utils/responseInfo/statusCodes.js";
import messages from "../utils/responseInfo/messages.js";
import response from "../utils/responseInfo/response.js";

export const registerController = async (req, res) => {
  try {
    const resObj = await register(req, res);
    return response(res,resObj.status,resObj.jsonData);
  } catch (error) {
    return response(res,statusCodes.INTERNAL_SERVER_ERROR,{ message: messages.INTERNAL_SERVER_ERROR });
  }
}

export const loginController = async (req, res) => {
  try {
    const resObj = await register(req, res);
    return response(res,resObj.status,resObj.jsonData);
  } catch (error) {
    return response(res,statusCodes.INTERNAL_SERVER_ERROR,{ message: messages.INTERNAL_SERVER_ERROR });
  }
};

export const getProfileController = async (req, res) => {
  let resObj;
  try {
     resObj = await getProfile(req, res);
    // return response(res,resObj.status,resObj.jsonData);
  } catch (error) {
    return response(res,statusCodes.INTERNAL_SERVER_ERROR,{ message: messages.INTERNAL_SERVER_ERROR });
  }
  // if (!resObj.jsonData.data) return res.render("404");
  return res.render("index", { jsonData: resObj.jsonData.data });
  // return res.status(resObj.status).json(resObj.jsonData);
};
