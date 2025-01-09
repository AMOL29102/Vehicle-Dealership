const express = require("express")
const {handleGetMaintainanceDetails,handlePostMaintainanceDetails} = require("../adminControllers/maintainance.controller")
const { authenticateToken, authorizeEmployeeOrAdmin,authorizeDriverOrEmployeeOrAdmin } = require("../controllers/userRole-auth");
const logResReq = require('../log.js')

const router = express.Router();

router.get("/",authenticateToken, authorizeEmployeeOrAdmin,handleGetMaintainanceDetails);

router.post("/",authenticateToken, authorizeDriverOrEmployeeOrAdmin, handlePostMaintainanceDetails);

module.exports = router;