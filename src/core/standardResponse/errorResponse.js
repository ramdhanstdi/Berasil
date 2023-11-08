const successResponse = require("./successResponse");

const handleError = (msg, param, location = "body") => [msg, param, location];

const errorResponse = (err, res) => {
  if (err.code === "P2002" && err.meta.target[0] === "email") {
    const resErr = handleError("Email Already Use", "email");
    return successResponse(res, "Username sudah digunakan", resErr, null, 400);
  }

  // Add more error from DB here

  return successResponse(res, "Internal Server Error", null, null, 500);
};

module.exports = errorResponse;
