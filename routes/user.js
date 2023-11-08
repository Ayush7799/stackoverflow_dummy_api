import { Router } from "express";
import { loginController, registerController, getProfileController } from "../controller/user.js";
import { verifyLoginSchema, verifyRegisterSchema } from "../utils/ValidationMiddlewares/user.js";
const router = Router();

router
   .post("/register",verifyRegisterSchema ,registerController)
   .post("/login",verifyLoginSchema, loginController)
   .get("/get-profile",getProfileController);

export default router;

