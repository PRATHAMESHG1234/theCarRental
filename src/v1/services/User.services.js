const { User } = require("../models/User.model");

const getAllUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (err) {
    console.error("Error in getAllUsers service:", err);
    throw new Error("Error in getAllUsers service");
  }
};

const getUserByID = async (userId) => {
  try {
    const user = await User.findById(userId);

    return user;
  } catch (err) {
    console.error("Error in getUserByID service:", err);
    throw new Error("Error in getUserByID service");
  }
};

const createUser = async (name, email, phone, password, role) => {
  try {
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }

    const newUser = await User({
      name,
      email,
      phone,
      password,
      role,
    });

    const user = await newUser.save();
    return user._id;
  } catch (err) {
    console.error("Error in createUser service:", err);
    throw new Error("Error in createUser service");
  }
};
const updateUser = async (userId, { name, email, phone, password, role }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        password: password || undefined,
        role: role || undefined,
      },
      { new: true }
    );

    return updatedUser;
  } catch (err) {
    console.error("Error in updateUser service:", err);
    throw new Error("Error in updateUser service");
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    return deletedUser;
  } catch (err) {
    console.error("Error in deleteUser service:", err);
    throw new Error("Error in deleteUser service");
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
