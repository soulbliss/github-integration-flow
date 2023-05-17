var express = require("express");
var router = express.Router();

const userRouter = require("../routers/user");
const sessionRouter = require("../routers/session");

router.use("/user", userRouter);
router.use("/session", sessionRouter);

module.exports = router;