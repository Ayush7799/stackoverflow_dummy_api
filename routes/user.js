import { Router } from "express";
import { register, login } from "../services/user.js";
import { loginController, registerController } from "../controller/user.js";
const router = Router();

router
   .post("/register", registerController)
   .post("/login", loginController);

export default router;

/*
User1 --> 
eyJhbGciOiJIUzI1NiJ9.NjUxMTE0YzNlNTQ0ODJkZDE3YzhkZTM2.AZIl7uV94kk4zYRMKe08EgOZTVYFhvUUjweHTh_dk5M

User2 --> 
eyJhbGciOiJIUzI1NiJ9.NjUxMTE1MzBlNTQ0ODJkZDE3YzhkZTNj.aY97HSqi2fAOyF6G20PJ6HAEoRkKVy23fB5YO7bR4u8
User3 --> 
eyJhbGciOiJIUzI1NiJ9.NjUxMTI1ZjAwZjNlOGE1Y2NjOWYxNDgy.LajUVrRARqvdNp4Mfw-SGVFHgurF9Sml9gyB-W9dTkI

User4 --> 
eyJhbGciOiJIUzI1NiJ9.NjUxMTI1ZmUwZjNlOGE1Y2NjOWYxNDg1.B49CIjaTu7BSGR5B-9EfIV3XfSJTDugI11cH87p3Kz4

User5 --> 
eyJhbGciOiJIUzI1NiJ9.NjUxMTI2MDYwZjNlOGE1Y2NjOWYxNDg4.Q1p-zacGMT5LZ59NLl0sZBEGDpvAMOqkbPtXeynaoG8

*/
