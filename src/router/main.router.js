const router = require("express").Router();

router.use("/auth", require("../modules/auth/router/auth.router"));

module.exports = router;
