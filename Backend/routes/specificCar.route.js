const express = require("express");
const handleSpecifiPage = require("../controllers/specificCar.controller.js");
const { authenticateToken, authorizeEmployeeOrAdmin,authorizeDriverOrEmployeeOrAdmin } = require("../controllers/userRole-auth");

router = express.Router();

router.get("/:registernumber",authorizeDriverOrEmployeeOrAdmin, handleSpecifiPage);

module.exports = router;