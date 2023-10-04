import Joi from "joi";

const addQuestionSchema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().min(10).required()
})


export {addQuestionSchema};

