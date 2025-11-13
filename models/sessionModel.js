const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  key: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

/* create a TTL(Time-To-Live indexes are designed to handle automatic deletion for many documents at once) index in Mongoose: */

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("session", sessionSchema);

module.exports = Session;
