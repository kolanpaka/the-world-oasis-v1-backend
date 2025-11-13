const mongoose = require("mongoose");
const hideFieldsPlugin = require("./plugins/hideFieldsPlugin");
mongoose.plugin(hideFieldsPlugin);

// mongodb://localhost:27017/the-world-oasis
async function connectDB() {
  try {
    // await mongoose.connect(
    //   `${process.env.LOCAL_DB_CONNECTION}/${process.env.DB_NAME}`
    // );

    await mongoose.connect(
      `${process.env.CLOUD_DB_CONNECTION}/${process.env.DB_NAME}`
    );
    console.log("connected to the MONGODB SERVER READY TO GO >>>");
  } catch (error) {
    throw new Error(
      `connection unsuccessful due to following error : ${error.message}`
    );
  }
}

module.exports = connectDB;
