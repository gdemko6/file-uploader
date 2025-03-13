const express = require("express");
const router = express.Router();
signupController = require("../controllers/signupController");

router.get("/", signupController.getSignup);
router.post("/", signupController.signUpUser);

module.exports = router;