const { body, param } = require("express-validator");

const validateUserId = param("userId")
  .isMongoId()
  .withMessage("Invalid user ID");

const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("role").isIn(["user", "admin"]).withMessage("Invalid role"),
];

const validateUpdateUser = [
  validateUserId,
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("phone").optional().notEmpty().withMessage("Phone number is required"),
  body("password").optional().notEmpty().withMessage("Password is required"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
];

const validateDeleteUser = validateUserId;

module.exports = {
  validateCreateUser,
  validateDeleteUser,
  validateUpdateUser,
  validateUserId,
};
