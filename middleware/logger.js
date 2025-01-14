// @desc Logger Middleware

const logger = (req, res, next) => {
  req.hello = "hello world";
  console.log(
    `${req.method} ${req.url} ${req.path} ${req.hostname} ${req.ip} ${req.hello} ${req.protocol} ${req.secure} ${req.originalUrl}`
  );
  next();
};

export default logger;
