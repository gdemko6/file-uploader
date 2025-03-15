const express = require("express");
const router = express.Router();
const { uploadFile, getUpload } = require("../controllers/uploadController");

router.get("/", getUpload);
router.post("/", uploadFile);

module.exports = router;