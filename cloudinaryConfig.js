const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // No disk, only in memory

cloudinary.config({
  cloud_name: "dvwmujx8u",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { upload, cloudinary };
