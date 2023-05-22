var express = require("express");
var router = express.Router();

const userRouter = require("../routers/user");
const sessionRouter = require("../routers/session");
const oauthRouter = require("../routers/oauth");
const integrationRouter = require("../routers/integration");

router.use("/user", userRouter);
router.use("/oauth", oauthRouter);
router.use("/integration", integrationRouter);
router.use("/session", sessionRouter);

module.exports = router;