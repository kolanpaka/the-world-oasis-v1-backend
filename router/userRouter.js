const express = require("express");
const userControllers = require("./../controllers/userControllers");
const router = express.Router();
const protectMiddleware = require("./../middleware/protectMiddleware");
const authorizationMiddleware = require("./../middleware/authorizationMiddleware");
const multer = require("multer");
const storage = multer.memoryStorage(); // We upload directly to cloudinary from buffer
const upload = multer({ storage });

router.use(protectMiddleware);

router.post(
  "/",
  authorizationMiddleware("spadmin", "admin"),
  userControllers.postUser
);

router.use(authorizationMiddleware("spadmin"));

router
  .route("/:id")
  .delete(userControllers.deleteUser)
  .patch(upload.single("profile"), userControllers.patchUser)
  .get(userControllers.getUser);

router.get("/", userControllers.getUsers);

module.exports = router;
