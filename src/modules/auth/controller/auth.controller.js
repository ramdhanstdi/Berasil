const { registerModel } = require("../models/auth.models");
const successResponse = require("../../../core/standardResponse/successResponse");
const errorResponse = require("../../../core/standardResponse/errorResponse");

exports.registerUser = async (req, res) => {
  const results = await registerModel(req.body);
  if (results.error) {
    return errorResponse(results.error, res);
  }
  return successResponse(res, "Register Success", results.success);
};
