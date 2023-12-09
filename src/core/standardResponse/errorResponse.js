const successResponse = require("./successResponse");
const errResponse = (res, msg) => {
  let success = true;

  const data = {
    success,
    message: msg,
  };

  return res.json(data);
};

const handleError = (msg, param, location = "body") => [msg, param, location];

const errorResponse = (err, res) => {
  if (err.code === "P2002" && err.meta.target[0] === "username") {
    const resErr = handleError("Username Already Use", "username");
    return errResponse(res, "Username already used");
  }
  if (err.code === "P2002" && err.meta.target[0] === "email") {
    const resErr = handleError("Email Already Use", "email");
    return errResponse(res, "Email already registered");
  }

  // Add more error from DB here

  return successResponse(res, "Internal Server Error", null, null, 500);
};

module.exports = errorResponse;
