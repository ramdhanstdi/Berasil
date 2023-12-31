const prisma = require("../../../core/helpers/prisma");

exports.registerModel = async (data) => {
  const results = {};
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        username: data.name,
        profile: { create: { first_name: data.name } },
      },
      select: { username: true },
    });
    results.success = user;
  } catch (error) {
    console.log(error);
    results.error = error;
  }
  return results;
};

exports.loginUserModel = async ({ email }) => {
  const results = {};
  let whereCondition;

  if (email.includes("@")) {
    whereCondition = { email };
  } else {
    whereCondition = { username: email };
  }

  try {
    const user = await prisma.user.findFirst({
      where: whereCondition,
      select: {
        id: true,
        password: true,
        email: true,
        profile: { select: { first_name: true } },
      },
    });

    results.success = user;
  } catch (error) {
    results.error = error;
  }

  return results;
};
