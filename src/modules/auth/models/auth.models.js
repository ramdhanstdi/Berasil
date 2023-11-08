const { prisma } = require("../../../core/helpers/prisma");

exports.registerModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.User.create({
      data,
    });
    results.success = user;
  } catch (error) {
    results.error = error;
    return results;
  }
};
