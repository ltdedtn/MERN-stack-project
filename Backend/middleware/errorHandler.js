const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url},\t${req.headers.origin}`,
    "errors.log"
  );
  console.log(err.stack);

  const status = res.stausCode ? res.statusCode : 500;

  res.status(status);

  res.json({
    status,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = errorHandler;
