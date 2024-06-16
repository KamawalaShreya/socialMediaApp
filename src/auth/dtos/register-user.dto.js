import Joi from "joi";

export default Joi.object().keys({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Confirm password does not match" }),
  profileImage: Joi.string().optional(),
  bio: Joi.string().optional(),
});
