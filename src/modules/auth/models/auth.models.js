const prisma = require("../../../core/helpers/prisma");
const bcrypt = require("bcrypt");

exports.registerModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.user.create({
      data,
    });
    results.success = user;
  } catch (error) {
    results.error = error;
    console.log(error);
    return results;
  }
};

exports.loginUserModel = async ({ email, password }) => {
  const results = {};
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      results.error = "User not found";
      return results;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      results.error = "Invalid password";
      return results;
    }

    results.success = user;
  } catch (error) {
    results.error = error;
    console.log(error);
  }

  return results;
};

