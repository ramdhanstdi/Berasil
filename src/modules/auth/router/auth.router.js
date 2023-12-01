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

//(24-11-2023)
auth.post(
  "/login",
  //authValidation,
  validationMiddleware,
  authController.loginUser
);
//===

module.exports = auth;
