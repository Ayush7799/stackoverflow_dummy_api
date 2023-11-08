import Joi from "joi";

const addCommentSchema = Joi.object({
    userId: Joi.string().required(),
    questionId: Joi.string().required(),
    answerId: Joi.string().required(),
    content: Joi.string().min(10).required()
})


export {addCommentSchema};