const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Please provide a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 500,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message:
          "Password must be strong. Include uppercase, lowercase, numbers, and special characters.",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Generate JWT
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devTinder9334", {
    expiresIn: "7d",
  });
  return token;
};

// Validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  console.log(passwordInputByUser,user.password)
  return await bcrypt.compare(passwordInputByUser.trim(), user.password);
};

module.exports = mongoose.model("User", userSchema);
