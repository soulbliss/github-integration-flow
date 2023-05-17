const emailValidators = [
  {
    validator: function (email) {
      const self = this;
      return new Promise(function (resolve, reject) {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return reject("Email is invalid");
        }
        return self.constructor.findOne({ email: email }).exec(function (err, user) {
          if (err) {
            reject(err);
          } else if (user) {
            if (self.id === user.id) {
              return resolve(true);
            }
            return resolve(false);
          } else {
            return resolve(true);
          }
        });
      });
    },
    message: "Email already exists"
  },
  {
    validator: function (email) {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return false;
      }
      return true;
    },
    message: "Email is invalid"
  }
];

module.exports = {
  emailValidators
};
