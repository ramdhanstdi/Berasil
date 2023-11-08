// Express
const auth = require("express").Router();

const validationMiddleware = require("../../../core/middleware/validation.middleware");
// Constroller
const authController = require("../controller/auth.controller");
const authValidation = require("../validation/auth.validation");

auth.post(
  "/register",
  authValidation,
  validationMiddleware,
  authController.registerUser
);

module.exports = auth;
