const Joi = require("joi");

const createProductValidation = Joi.object({
  title: Joi.string().required().min(5),
  description: Joi.string().required().min(15),
  price: Joi.number().min(5).required(),
  discount: Joi.number()
});

const updateProductValidation = Joi.object({
  title: Joi.string().min(5),
  description: Joi.string().min(15),
  price: Joi.number().min(5),
  discount: Joi.number()
});


module.exports = {
  createProductValidation,
  updateProductValidation
}