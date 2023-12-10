// Express Validator
const { body } = require("express-validator");

// Bcrypt
const bcrypt = require("bcrypt");

const authValidation = [
  body("name").notEmpty().withMessage("Name must be filled").escape(),
  body("email").notEmpty().isEmail().withMessage("Wrong Email Format").escape(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be min 6 characters")
    .escape()
    .customSanitizer(async (val, { req }) => {
      // Implement bcrypt for hashing password
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

module.exports = authValidation;
