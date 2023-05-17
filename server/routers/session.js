const router = require("express").Router();
const auth = require("../services/auth.js");

router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/getUser", auth.getUser);

module.exports = router;
