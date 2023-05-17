const debug = require("debug")("tracey:app");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const VerificationToken = mongoose.model("VerificationTokens");
const moment = require("moment");
const EmailService = require("./email.js");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const restifyErrors = require("restify-errors");
const logger = require("../lib/logger");

let UserService = {
  registerUser: async function (userBody, password) {
    let user = new User(userBody);
    try {
      user.setPassword(password);
    } catch (err) {
      if (err.name === "TypeError") {
        return {
          status: 400,
          error: { errors: { password: { message: "Password is mandatory" } } }
        };
      }
      return { status: 500, error: "Internal Server Error" };
    }
    try {
      await user.save();
      let tokenData = await this.generateVerificationToken({ userId: user._id, type: "CONFIRM_EMAIL", days: 2 });
      console.log(`user id :${user._id}, token:${tokenData.token}`);
      if (!tokenData.success) {
        throw tokenData.message;
      }
      console.log(user);
      this.sendEmailVerificationToken({ user, token: tokenData.token });
      return {
        status: 200,
        user: user.getUserDetails()
      };
    } catch (err) {
      logger.error(err);
      return { status: 400, error: err };
    }
  },

  getUser: async function (userId) {
    try {
      let user = await User.findById({ _id: mongoose.Types.ObjectId(userId) });
      if (user) {
        return { status: 200, user: user.getUserDetails() };
      }
      return { status: 404, ...new restifyErrors.ResourceNotFoundError(userId) };
    } catch (err) {
      debug(err);
      return { status: 500, message: "Internal Server Error" };
    }
  },
  generateVerificationToken: async function ({ userId, type = "CONFIRM_EMAIL", days = 2 }) {
    let tokenDoc = new VerificationToken({
      userId: userId,
      type: type,
      expiresAt: moment().add(days, "days").toDate()
    });
    try {
      await tokenDoc.save();
      return { success: true, token: tokenDoc.token };
    } catch (err) {
      logger.error(err);
      return { success: false, message: "Internal Server Error" };
    }
  },
  sendEmailVerificationToken: async function ({ user, token }) {
    debug("Sending email to ", user.email, "with token", token);
    let verificationUrl = `${process.env.APP_HOST}/verify-email`;
    let template = ejs.compile(fs.readFileSync(path.join(__dirname, "../", "views/emailTemplates/verifyEmail.ejs"), "utf-8"));
    let renderedHTML = template({
      verificationUrl: verificationUrl,
      user: user,
      token: token
    });
    await EmailService.sendVerificationEmail({
      name: user.name,
      email: user.email,
      html: renderedHTML
    });
  },
  verifyEmail: async function (userId, token) {
    try {
      let tokenDoc = await VerificationToken.findOne({ userId: mongoose.Types.ObjectId(userId), type: "CONFIRM_EMAIL" });
      let isTokenExpired = moment(tokenDoc && tokenDoc.expiresAt).isBefore(moment());
      if (!tokenDoc || !(tokenDoc.token === token) || isTokenExpired) {
        if (tokenDoc && isTokenExpired) {
          VerificationToken.findByIdAndRemove({
            _id: mongoose.Types.ObjectId(tokenDoc._id)
          });
        }
        return {
          status: 400,
          verified: false,
          message: "Token is invalid or expired"
        };
      }
      let user = await User.findById(userId);
      let response = {
        verified: true,
        user: user
      };
      if (user.verified) {
        response.message = "Account already verified";
      } else {
        await User.updateOne({ _id: user._id }, { verified: true });
        response.message = "Account successfully verified";
      }
      await VerificationToken.findByIdAndRemove({
        _id: mongoose.Types.ObjectId(tokenDoc._id)
      });
      response.status = 200;
      return response;
    } catch (err) {
      debug(err);
      return { status: 500, message: "Internal Server Error" };
    }
  }
};

module.exports = UserService;
