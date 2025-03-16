const express = require("express");
const router = express.Router();
const { uploadFile, getUpload } = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

router.get("/", getUpload);
router.post("/", upload.single('file-upload'), uploadFile);

module.exports = router;