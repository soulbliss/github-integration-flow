const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("../lib/utils");
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is mandatory"],
      validate: utils.emailValidators
    },
    hash: String,
    salt: String,
    verified: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: [true, "Name is mandatory"]
    },
    phoneNo: String
  },
  {
    timestamps: {
      createdAt: "cAt",
      updatedAt: "mAt"
    }
  }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};
UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};
UserSchema.methods.getUserDetails = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    phoneNo: this.phoneNo,
    verified: this.verified
  };
};
mongoose.model("User", UserSchema);
