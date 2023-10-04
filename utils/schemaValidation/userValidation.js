import Joi from "joi";

const registerUserSchema = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    email : Joi.string().regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
    password : Joi.string().min(8).required()
})

const loginUserSchema = Joi.object({
    email : Joi.string().regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
    password : Joi.string().min(8).required()
})

export {registerUserSchema, loginUserSchema}