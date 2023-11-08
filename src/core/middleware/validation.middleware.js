// Helper Response
const successResponse = require("../standardResponse/successResponse");

// Express Validator
const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return successResponse(res, "Data not filled", error.array(), null, 400);
  }
  next();
};

module.exports = validationMiddleware;
