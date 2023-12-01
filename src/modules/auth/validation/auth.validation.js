// Express Validator
const { body } = require("express-validator");

// Bcrypt
const bcrypt = require("bcrypt");

//JWT
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET_KEY = "dsbfedqweqkalsbe21u3333eoifked";

const { loginUserModel } = require("../models/auth.models");

const authValidation = [
  body("email").notEmpty().isEmail().withMessage("Wrong Email Format").escape(),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password Must be min 6 characters")
    .escape()
    .customSanitizer(async (val, { req }) => {
      // Implement bcrypt for hashing password
      const hash = await bcrypt.hash(val, 10);
      req.body.password = hash; // Save the hashed password in the request body for later use
      return hash;
    }),

  body("email").custom(async (val, { req }) => {
    // Generate JWT token using the hashed password and email
    const token = jwt.sign({ email: val, password: req.body.password }, JWT_SECRET_KEY, { expiresIn: "1h" });
    return true;
  }),

];

module.exports = authValidation;
