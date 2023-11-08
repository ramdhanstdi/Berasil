// Express Validator
const { body } = require("express-validator");

// Bcrypt
const bcrypt = require("bcrypt");

const authValidation = [
  body("email").notEmpty().isEmail().withMessage("Wrong Email Format").escape(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password Must be min 6 character")
    .escape()
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

module.exports = authValidation;
