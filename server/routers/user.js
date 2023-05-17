const router = require("express").Router();
const UserService = require("../services/user");

router.post("/verify_email", async (req, res) => {
  let { userId, token } = req.body;
  let response = await UserService.getUser(userId);
  let user = response && response.user;
  if (user && user.verified) {
    return res.status(200).json({
      success: true,
      redirectUrl: "/signin?message=tokenverified"
    });
  }
  response = await UserService.verifyEmail(userId, token);
  if (response.status === 200) {
    return res.status(200).json({
      success: true,
      redirectUrl: `/signin?message=tokenverified`
    });
  } else {
    return res.status(200).json({
      success: true,
      redirectUrl: "/signin?message=tokeninvalid"
    });
  }
});

router.post("/", (req, res) => {
  const password = req.body.password || null;
  UserService.registerUser(req.body, password).then(result => {
    return res.status(result.status).send(result);
  });
});

module.exports = router;
