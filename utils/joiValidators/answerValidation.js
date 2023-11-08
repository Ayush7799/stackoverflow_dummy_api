import Joi from "joi";

const addAnswerSchema = Joi.object({
    userId: Joi.string().required(),
    questionId: Joi.string().required(),
    content: Joi.string().min(10).required()
})


export {addAnswerSchema};

