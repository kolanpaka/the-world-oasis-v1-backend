const express = require("express");
const authentication = require("./../controllers/authentication");
const protectMiddleware = require("./../middleware/protectMiddleware");

const router = express.Router();

router.post("/signIn", authentication.signIn);

router.post("/signUp", authentication.signUp);

router.use(protectMiddleware);

router.post("/signOut", authentication.signOut);

module.exports = router;
