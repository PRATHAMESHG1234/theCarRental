const { validationResult } = require("express-validator");
const {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NO_CONTENT,
  HTTP_OK,
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
} = require("../../config/Constants");
const AuthHelper = require("../../helpers/Auth.helpers");
const userService = require("../services/User.services");
/**
 * Retrieve all users and send a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {JSON} - contains all user data
 * @throws {Object} - An error object if an error occurs during the operation.
 * @since 25-12-23 - Created on 25-12-23 by Prathamesh Ghorpade.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(HTTP_OK).json(users);
  } catch (error) {
    console.error("Error in getAllUsers controller:", error);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Retrieve a user by ID and send a JSON response.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {Object} - An error object if an error occurs during the operation.
 * @returns {Object|JSON} - JSON response containing user data or error details.
 * @since 25-12-23 - Created on 25-12-23 by Prathamesh Ghorpade.
 */
const getUserByID = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation error", details: errors.array() });
    }
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(HTTP_NO_CONTENT)
        .json({ error: "User ID not provided" });
    }

    const user = await userService.getUserByID(userId);

    if (user) {
      res.status(HTTP_OK).json(user);
    } else {
      res.status(HTTP_NO_CONTENT).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in getUserByID controller:", error);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Create a new user, hash the password, and send a JSON response with a JWT token.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @throws {Object} - An error object if an error occurs during the operation.
 * @returns {Object} - JSON response containing user creation success message and token.
 * @property {string} message - A success message indicating that the user was created successfully.
 * @property {string} token - JWT token generated for the new user.
 * @since 25-12-23 - Created on 25-12-23 by Prathamesh Ghorpade.
 */
const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation error", details: errors.array() });
    }
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(HTTP_BAD_REQUEST).json({
        error: "Name, email, phone, password, and role are required fields.",
      });
    }

    // Hash the password
    const hashedPassword = await AuthHelper.hashPassword(password);

    // Create a new user with the hashed password
    const newUserId = await userService.createUser(
      name,
      email,
      phone,
      hashedPassword,
      role
    );

    // Generate a JWT token
    const token = AuthHelper.generateToken(newUserId);

    res
      .status(HTTP_CREATED)
      .json({ message: "user craeted successfully", token });
  } catch (err) {
    console.error("Error in createUser controller:", err);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

/**
 * Update a user's information and send a JSON response with the updated user data.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - No explicit return value.
 * @throws {Object} - An error object if an error occurs during the operation.
 * @returns {Object} - JSON response containing the updated user data.
 * @since 25-12-23 - Created on 25-12-23 by Prathamesh Ghorpade.
 */
const updateUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation error", details: errors.array() });
    }
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(HTTP_NO_CONTENT)
        .json({ error: "User ID not provided" });
    }

    const { name, email, phone, password, role } = req.body;

    const updatedUser = userService.updateUser(userId, {
      name,
      email,
      phone,
      password,
      role,
    });

    if (updatedUser) {
      res.status(HTTP_OK).json(updatedUser);
    } else {
      res.status(HTTP_NO_CONTENT).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error in updateUser controller:", err);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
/**
 * delete a user's information.
 *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - No explicit return value.
 * @throws {Object} - An error object if an error occurs during the operation.
 * @since 25-12-23 - Created on 25-12-23 by Prathamesh Ghorpade.
 */
const deleteUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation error", details: errors.array() });
    }
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(HTTP_NO_CONTENT)
        .json({ error: "User ID not provided" });
    }

    const deletedUser = userService.deleteUser(userId);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(HTTP_NO_CONTENT).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error in deleteUser controller:", err);
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
