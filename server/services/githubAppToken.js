const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKeyPath = __dirname + "/githubPrivateKey.pem";
const { GITHUB_APP_ID_VALUE } = process.env;

const expiryTime = 9 * 60;

module.exports = {
  getGithubAppToken: function () {
    const pem = fs.readFileSync(privateKeyPath, "utf8");
    const timestamp = Math.floor(Date.now() / 1000);

    const payload = {
      iat: timestamp,
      exp: timestamp + expiryTime,
      iss: GITHUB_APP_ID_VALUE
    };

    const token = jwt.sign(payload, pem, { algorithm: "RS256" });
    return token;
  }
};
