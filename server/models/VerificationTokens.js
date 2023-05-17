const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const verificationTokenSchema = new Schema(
  {
    token: {
      type: String,
      default: function () {
        return crypto.randomBytes(16).toString("hex");
      }
    },
    type: {
      type: String,
      required: true,
      enum: ["CONFIRM_EMAIL"]
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    expiresAt: Date
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: "cAt",
      updatedAt: "mAt"
    }
  }
);

mongoose.model("VerificationTokens", verificationTokenSchema);
