const errorHandler = (err, req, res, next) => {
  console.log("error", err.stack.red);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message,
  });
};

export default errorHandler;
