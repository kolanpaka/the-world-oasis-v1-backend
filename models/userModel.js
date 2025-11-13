const mongoose = require("mongoose");
const NodeError = require("./../utils/nodeError");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userName: {
    type: String,
    required: [true, "username is required"],
    minlength: [3, "username must have atleast 3 characters"],
    maxlength: [15, "username shouldn't exceed the 15 character length"],
    unique: true,
    validate: [
      {
        validator: function (value) {
          return /^[a-zA-Z0-9._]+$/.test(value);
        },
        message: "username allows letters, digits, dot, underscore",
      },
      {
        validator: function (value) {
          return /^[a-zA-Z][a-zA-Z0-9._]*$/.test(value);
        },
        message: "username must starts with letter",
      },
      {
        validator: function (value) {
          return /^(?!.*[._]{2})[a-zA-Z][a-zA-Z0-9._]{2,29}$/.test(value);
        },
        message: "No Consecutive Dots or Underscores are allowed",
      },
    ],
  },

  email: {
    type: String,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
  },

  password: {
    type: String,
    minlength: [6, "password length should atleast 6 character"],
    maxlength: [18, "password shouldn't 18 characters length"],
    required: [true, "Password is required."],
    validate: [
      {
        validator: function (v) {
          return /(?=.*\d)/.test(v);
        },
        message: "Password must contain at least one number (0–9).",
      },
      {
        validator: function (v) {
          return /(?=.*[A-Z])/.test(v);
        },
        message: "Password must contain at least one uppercase letter (A–Z).",
      },
      {
        validator: function (v) {
          return /(?=.*[a-z])/.test(v);
        },
        message: "Password must contain at least one lowercase letter (a–z).",
      },
      {
        validator: function (v) {
          return /(?=.*[@$!%*?&])/.test(v);
        },
        message:
          "Password must contain at least one special character (@$!%*?&).",
      },
      {
        validator: function (v) {
          return !/\s/.test(v);
        },
        message: "Password must not contain spaces.",
      },
    ],
  },

  role: {
    type: String,
    enum: {
      values: ["user", "admin", "spadmin"],
      message: "Invalid Role configuration",
    },
    default: "user",
  },
  country: {
    type: String,
    required: [
      function (value) {
        return value && this.role === "user";
      },
      "user should enter the country to prepare the required dishes",
    ],
  },
  countryCode: {
    type: String,
    required: [
      function (value) {
        return value && this.role === "user";
      },
      "user should enter the country to prepare the required dishes",
    ],
  },
  profile: {
    type: String,
    default:
      "https://res.cloudinary.com/dvwmujx8u/image/upload/v1762516185/default-user_zqkklf.jpg",
  },
  status: {
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "Invalid status configuration",
    },
    default: "active",
  },
});

userSchema.methods.encryptPassword = async function () {
  const hashPassword = await bcrypt.hash(this.password, 12);
  return hashPassword;
};

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.pre("save", async function (next) {
  try {
    this.password = await this.encryptPassword();
    next();
  } catch (error) {
    next(new NodeError(true, "unable to encrypt the user password", 500));
  }
});

//Examples for virtuals
// userSchema.virtual("sessionKeys", {
//   ref: "session",
//   localField: "_id",
//   foreignField: "userId",
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
