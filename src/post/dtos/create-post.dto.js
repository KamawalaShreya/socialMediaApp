import Joi from "joi";

export default Joi.object().keys({
  caption: Joi.string().optional(),
  files: Joi.optional(),
});
