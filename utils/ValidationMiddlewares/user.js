import {
  loginUserSchema,
  registerUserSchema,
} from "../joiValidators/userValidation.js";
import statusCodes from "../responseInfo/statusCodes.js";
import response from "../responseInfo/response.js";
import messages from "../responseInfo/messages.js";

export const verifyRegisterSchema = (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return response(res,statusCodes.BAD_REQUEST,{message: messages.BAD_REQUEST});
  }
  next();
};

export const verifyLoginSchema = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: messages.BAD_REQUEST,
    });
  }
  next();
};

