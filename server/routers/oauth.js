const router = require("express").Router();
const axios = require("axios");
const { getGithubAppToken } = require("../services/githubAppToken");
const GitHubService = require("../services/github");

router.post("/callback", async (req, res) => {
  const { authorizationCode, installationId } = req.body;
  const JWTAcessToken = getGithubAppToken();

  try {
    // Make a request to GitHub's OAuth token URL
    const response = await axios.post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${JWTAcessToken}`,
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );

    const repositories = await axios.get("https://api.github.com/installation/repositories", {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    req.session.installationId = installationId;
    await GitHubService.updateRepositoryDetailsForUser({
      repositoryInfo: repositories.data,
      applicationId: installationId,
      userId: req.session.passport.user
    });
    return res.status(200).json({
      success: true,
      redirectUrl: "/dashboard"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: { message: `Error exchanging authorization code for access token: ${error}` }
    });
  }
});

module.exports = router;
