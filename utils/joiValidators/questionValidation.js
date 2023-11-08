import Joi from "joi";

const addQuestionSchema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().min(1).required()
})


export {addQuestionSchema};

