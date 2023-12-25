const router = require("express").Router();
const AuthMiddleware = require("../../middleware/Auth.middleware");
const validationMiddleware = require("../../middleware/Validation.middleware");
const UserController = require("../controllers/User.controller");

router.get("/users", UserController.getAllUsers);
router.get(
  "/users/:userId",
  [validationMiddleware.validateUserId],
  UserController.getUserByID
);
router.post(
  "/users",
  [validationMiddleware.validateCreateUser],
  UserController.createUser
);
router.put(
  "/users/:userId",
  [validationMiddleware.validateUpdateUser, AuthMiddleware.verifyToken],
  UserController.updateUser
);
router.delete(
  "/users/:userId",
  [validationMiddleware.validateDeleteUser, AuthMiddleware.verifyToken],
  UserController.deleteUser
);

module.exports = router;
