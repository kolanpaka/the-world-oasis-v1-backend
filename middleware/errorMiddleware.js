const NodeError = require("../utils/nodeError");

// function errorMiddleware(err, req, res, next) {
//   if (err.name === "CastError") {
//     err = new OpError(400, `Invalid Id ${err.value}`);
//   }

//   if (err.name === "ValidationError") {
//     err = new OpError(400, err.message);
//   }

//   if (err.isOperational) {
//     err.sendRequest(res, process.env.NODE_ENV === "dev");
//   } else {
//     res.status(500).json({
//       status: "error",
//       statusCode: 500,
//       message:
//         process.env.NODE_ENV === "dev"
//           ? err.message
//           : "Internal server Error 💥💥💥",
//       trace: process.env.NODE_ENV === "dev" ? err.stack : undefined,
//     });
//   }
// }

function errorMiddleware(err, req, res, next) {
  let nodeError = err;

  if (err.name === "CastError") {
    nodeError = new NodeError(true, `Invalid Id ${err.value}`, 400);
  }

  if (err.name === "ValidationError") {
    nodeError = new NodeError(true, err.message, 400);
  }

  if (err.code === 11000) {
    let errorMessage = `${Object.keys(err.keyValue)[0]} already registered.`;

    if (Object.keys(err.keyValue)[0] === "userName") {
      errorMessage = "username already taken!!";
    } else if (Object.keys(err.keyValue)[0] === "email") {
      errorMessage = "email already registered. please login...";
    }
    nodeError = new NodeError(true, errorMessage, 400);
  }

  if (err.name === "JsonWebTokenError") {
    nodeError = new NodeError(true, err.message, 401);
  }

  if (err.name === "TokenExpiredError") {
    nodeError = new NodeError(
      true,
      "Session got expired please login again..",
      401
    );
  }

  if (!(nodeError instanceof NodeError)) {
    nodeError = new NodeError();
  }

  nodeError.sendResponse(res, err);
}

module.exports = errorMiddleware;
