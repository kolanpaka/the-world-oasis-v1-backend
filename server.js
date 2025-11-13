process.on("uncaughtException", function (error) {
  console.log(
    "ENDING THE PROCESS EVEN BEFORE SERVER AND DB CONNECTION ARRANGED"
  );
  console.log(error.message);
  if (!process.isDbStarted) process.exit(0);
});

process.on("unhandledRejection", (reason) => {
  console.log(
    "ENDING THE PROCESS EVEN BEFORE SERVER AND DB CONNECTION ARRANGED"
  );
  console.log(reason);
  if (!process.isDbStarted) process.exit(0);
});

const connectDB = require("./connectDB");
const mongoose = require("mongoose");
const cleanUp = require("./utils/cleanUp");
const app = require("./app");

async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.isDbStarted = true;

    // Also app-level error handlers
    process.on("uncaughtException", (err) => {
      console.error(err);
      cleanUp(server, mongoose.connection);
    });

    process.on("unhandledRejection", (reason) => {
      console.error(reason);
      cleanUp(server, mongoose.connection);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();
