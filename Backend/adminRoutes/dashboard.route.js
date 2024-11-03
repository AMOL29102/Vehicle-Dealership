const express = require("express");
const handleRecordDeletion = require("../controllers/deleteRecord.controller");
const handleDashboard = require("../adminControllers/dashboard.controller");
const { authenticateToken, authorizeAdmin } = require("../controllers/userRole-auth");

const router = express.Router();

// router.get("/" ,authenticateToken,authorizeAdmin,handleDashboard);
router.get("/" ,handleDashboard);


module.exports = router;