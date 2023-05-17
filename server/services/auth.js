const passport = require("passport");
const UserService = require("./user");

const login = function (req, res, next) {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();
  if (!email || !password) {
    return res.status(422).json({
      error: "Email and password is required"
    });
  }
  req.body.user = { email, password };
  return passport.authenticate("local", { session: true }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      req.login(user.getUserDetails(), function () {
        return res.json({
          user: user.getUserDetails()
        });
      });
      return;
    }
    return res.status(400).send(info);
  })(req, res, next);
};

module.exports = {
  login: function (req, res, next) {
    return login(req, res, next);
  },
  logout: function (req, res) {
    req.logout();
    res.status(200).send({ message: "User logged out" });
  },
  getUser: async function (req, res) {
    if (req.isAuthenticated()) {
      let user = req.user;
      let latestUserDetails = await UserService.getUser(user?._id);
      res.status(200).send(latestUserDetails);
      return latestUserDetails;
    }
    res.status(400).send({ success: false, error: "Session not authenticated" });
  }
};
