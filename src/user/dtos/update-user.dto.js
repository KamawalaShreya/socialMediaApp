import Joi from "joi";

export default Joi.object().keys({
  fullName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  profileImage: Joi.string().optional(),
  bio: Joi.string().optional(),
});
