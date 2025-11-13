// class OpError extends Error {
//   constructor(statusCode, message) {
//     super(message);
//     this.statusCode = Number(statusCode);
//     this.message = message;
//     this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
//     this.isOperational = true;
//     if (Error.captureStackTrace) {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

//   sendRequest(res, isDev = false) {
//     res.status(this.statusCode).json({
//       status: this.status,
//       message: this.message,
//       error: isDev ? this : undefined,
//       trace: isDev ? this.stack : undefined,
//     });
//   }
// }

// module.exports = OpError;

//default = programming error /server error

//production

class NodeError extends Error {
  constructor(
    isOperational = false,
    message = "Internal server Error 💥💥💥",
    statusCode = 500
  ) {
    super(message);
    this.statusCode = Number(statusCode);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  sendResponse(res, error) {
    const isDev = process.env.NODE_ENV === "dev";
    res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
      error: isDev ? error : undefined,
      trace: isDev
        ? this.status === "error"
          ? error.stack
          : this.stack
        : undefined,
    });
  }
}

module.exports = NodeError;
