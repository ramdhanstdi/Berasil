// Models
const { registerModel, loginUserModel } = require("../models/auth.models");

// Standar Response
const successResponse = require("../../../core/standardResponse/successResponse");
const errorResponse = require("../../../core/standardResponse/errorResponse");

//JWT
const jwt = require("jsonwebtoken");

// bcrypt
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const results = await registerModel(req.body);
  if (results?.error) {
    return errorResponse(results.error, res);
  }
  return successResponse(res, "Registration Success", null);
};

exports.loginUser = async (req, res) => {
  const results = await loginUserModel(req.body);
  if (results?.error) {
    return errorResponse(results.error, res);
  }
  if (results.success === null) {
    return successResponse(res, "User not found", null, null, 400);
  }

  const user = results?.success;

  // After Compare that will be generate user.id to token
  bcrypt
    .compare(req.body.password, user.password)
    .then((cpres) => {
      if (cpres) {
        const token = jwt.sign(
          { id: user.id },
          process.env.APP_KEY || "BERASIL",
          { expiresIn: "360d" }
        );
        return successResponse(res, "Login Success", {
          userId: user.id,
          name: user.profile.first_name,
          email: user.email,
          token,
        });
      }
      return successResponse(res, "Invalid password", null, null, 400);
    })
    .catch((e) => {
      return successResponse(res, "Invalid password", null, null, 400);
    });
};