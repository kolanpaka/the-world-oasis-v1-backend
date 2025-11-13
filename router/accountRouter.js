const express = require("express");
const protectMiddleware = require("./../middleware/protectMiddleware");
const accountControllers = require("./../controllers/accountControllers");
const multer = require("multer");
const storage = multer.memoryStorage(); // We upload directly to cloudinary from buffer
const upload = multer({ storage });

const router = express.Router();

router.use(protectMiddleware);

router.patch("/", upload.single("profile"), accountControllers.updateAccount);

router.patch("/update-password", accountControllers.updatePassword);

module.exports = router;
