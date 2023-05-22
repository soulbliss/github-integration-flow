const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GitHubUserRepoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    githubUserId: {
      type: Number
    },
    repos: {
      type: Array
    },
    applicationId: {
      type: Number
    }
  },
  {
    timestamps: {
      createdAt: "cAt",
      updatedAt: "mAt"
    }
  }
);

mongoose.model("GitHubUserRepo", GitHubUserRepoSchema);
