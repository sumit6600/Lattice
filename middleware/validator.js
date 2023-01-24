const joi = require("@hapi/joi");

//--------------------------------------------------------Validator---------------------------------------------------------------------------------
const schema = {
  user: joi.object({
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    mobile: joi
      .number()
      .integer()
      .min(1000000000)
      .message("Invalid mobile number")
      .max(9999999999)
      .message("Invalid mobile number")
      .required(),
    address: joi.string().min(10).required(),
    password: joi
      .string()
      //   .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .pattern(new RegExp(/(?=.*?[A-Z])/))
      .message("At least one Uppercase")
      .pattern(new RegExp(/(?=.*?[a-z])/))
      .message("At least one lowercase")
      .pattern(new RegExp(/(?=.*?[0-9])/))
      .message("At least one number")
      .pattern(new RegExp(/(?=.*?[#?!@$%^&*-])/))
      .message("At least one special charachter")
      .required(),
  }),
};

module.exports = schema;
