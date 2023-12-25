const router = require("express").Router();

const UserRoutes = require("./User.routes");
router.use("/api", UserRoutes);

module.exports = router;
