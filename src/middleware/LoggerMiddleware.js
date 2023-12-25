const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`${timestamp} - ${method} ${url}`);

  next();
};

module.exports = loggerMiddleware;
