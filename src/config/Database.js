const mongoose = require("mongoose");
const config = require("../config/default.json");

const connectDB = async () => {
  // console.log(config.mongoURI);
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
