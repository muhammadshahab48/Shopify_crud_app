const Joi = require("joi");

const userSignupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

const resetPasswordValidation = Joi.object({
  oldPassword: Joi.string().min(5).required(),
  newPassword: Joi.string().min(5).required()
});

module.exports = {
  userSignupValidation,
  userLoginValidation,
  resetPasswordValidation
}