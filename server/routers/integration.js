const router = require("express").Router();
const GitHubService = require("../services/github");

router.get("/github/getListOfRepositoriesForUser", async (req, res) => {
  const userId = req.session.passport.user;
  if (userId) {
    let response = await GitHubService.getListOfRepositoriesForUser(userId);
    res.status(200).json(response);
  }
  return {
    status: 400,
    error: { errors: { message: "User data not present" } }
  };
});

router.post("/github/webhook", async (req, res) => {
  let action = req.body.action;
  let response = res.status(200).json({
    success: true
  });
  if (action === "deleted") {
    await GitHubService.deleteInstalledApp(req.body.installation.id);
  }
  return response;
});

module.exports = router;
