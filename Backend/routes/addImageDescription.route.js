const express = require("express");
const {handleAddDescription,handleGetDescription} = require("../controllers/addImageDescription.controller.js");
const { authenticateToken, authorizeEmployeeOrAdmin,authorizeDriverOrEmployeeOrAdmin } = require("../controllers/userRole-auth.js");


router = express.Router();

router.get("/",authenticateToken, authorizeDriverOrEmployeeOrAdmin,handleGetDescription);
router.post("/",authenticateToken, authorizeDriverOrEmployeeOrAdmin,handleAddDescription);

module.exports = router;