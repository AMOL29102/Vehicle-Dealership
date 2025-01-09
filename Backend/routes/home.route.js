const express = require("express");
const handleHomePage = require("../controllers/home.controller.js");
// const {handleGetNotice } = require("../controllers/addNotice.controller")
const {handleGetImages,handleDeleteImage}  = require("../controllers/s3ImageFunctions.controller")

const router = express.Router();

router.get("/", handleHomePage); // This will call the updated handleHomePage function
// router.get("/get-notice", handleGetNotice);
router.get("/get-images", handleGetImages);
module.exports = router;
