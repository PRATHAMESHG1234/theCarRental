const express = require("express");

const bodyParser = require("body-parser");
const commenRoute = require("./src/v1/routes/Common.routes");
const loggerMiddleware = require("./src/middleware/LoggerMiddleware");
const connectDB = require("./src/config/Database");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", commenRoute);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server listening at port ${PORT}`);
});
