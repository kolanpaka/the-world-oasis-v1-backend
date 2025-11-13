const express = require("express");
const cabinControllers = require("./../controllers/cabinControllers");
const protectMiddleware = require("./../middleware/protectMiddleware");
const authorizationMiddleware = require("./../middleware/authorizationMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage(); // We upload directly to cloudinary from buffer
const upload = multer({ storage });

const router = express.Router();

router.use(protectMiddleware);

router.get("/", cabinControllers.getCabins);
router.get("/:id", cabinControllers.getCabin);

router.use(authorizationMiddleware("admin", "spadmin"));

router.post("/", upload.single("cabin_image"), cabinControllers.postCabin);

router
  .route("/:id")
  .put(cabinControllers.putCabin)
  .patch(upload.single("cabin_image"), cabinControllers.patchCabin)
  .delete(cabinControllers.deleteCabin);

module.exports = router;
