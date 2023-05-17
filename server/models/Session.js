const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  expires: {
    type: Date,
  },
  session: {
    type: Object
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: {
    createdAt: "cAt",
    updatedAt: "mAt"
  }
});

mongoose.model("Session", sessionSchema);