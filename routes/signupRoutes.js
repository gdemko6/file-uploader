const express = require("express");
const router = express.Router();
signupController = require("../controllers/signupController");

router.get("/", signupController.getSignup);

module.exports = router;