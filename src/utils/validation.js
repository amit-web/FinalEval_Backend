const validator = require("validator");

const userValidationSignup = (userData) => {
  const { name, emailId, password, confirmPassword } = userData;

  if (!name) {
    throw new Error("Name is not correct!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough! It should contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.");
  } else if (password !== confirmPassword) {
    throw new Error("Password and Confirm Password do not match!");
  }
};

module.exports = {
  userValidationSignup
};
