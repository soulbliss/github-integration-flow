var SibApiV3Sdk = require("sib-api-v3-sdk");
const logger = require("../lib/logger");
var defaultClient = SibApiV3Sdk.ApiClient.instance;

const canSendEmail = () => {
  return process.env.EMAIL_SWITCH === "ON";
};

module.exports = {
  sendEmail: function (config) {
    if (canSendEmail()) {
      let { to, from, subject, text, html, senderName = "Software Engineer Challenge" } = config;
      let emailConfig = { subject, to, sender: { email: from, name: senderName }, htmlContent: html, textContent: text };
      logger.info("Sending email through send in blue");
      return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(emailConfig).then(
        function (data) {
          logger.info("API called successfully. Returned data: " + JSON.stringify(data));
        },
        function (error) {
          logger.error(`Error in send mail ${JSON.stringify(error)}`);
        }
      );
    }
  },
  canSendEmail: canSendEmail,
  sendVerificationEmail({name, email, html}) {
    let to = [
      {
        email: email,
        name: name
      }
    ];
    let from = "deepak.garasangi@gmail.com";
    let subject = "Verification Email Assignment";
    this.sendEmail({ to, from, subject, html });
  },
  connect: function () {
    if (canSendEmail()) {
      var apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.SENDBLUE_API_KEY;
    }
  }
};
