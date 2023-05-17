const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              errors: { message: "Sorry! This email is not registered.", field: "email" }
            });
          }
          if (!user.validatePassword(password)) {
            return done(null, false, {
              errors: { message: "Sorry! Password entered is incorrect", field: "password" }
            });
          }
          if (!user.verified) {
            return done(null, false, {
              errors: { message: "Email is not verified" }
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
