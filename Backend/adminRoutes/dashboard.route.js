const express = require("express");
const handleRecordDeletion = require("../controllers/deleteRecord.controller");
const handleDashboard = require("../adminControllers/dashboard.controller");
const { handleSellCar, getSoldCarDetails } = require("../adminControllers/sellcar.controller")
const { handleDeleteNotice, handleGetNotice } = require("../controllers/addNotice.controller")

const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");

const router = express.Router();

router.get("/", authenticateToken, authorizeEmployeeOrAdmin, handleDashboard);
// router.get("/" ,handleDashboard);

router.post("/sell-car", authenticateToken, authorizeEmployeeOrAdmin, handleSellCar);


router.get("/get-notice", handleGetNotice);
router.delete("/delete-notice", authenticateToken, authorizeEmployeeOrAdmin, handleDeleteNotice)
router.get("/sold-cars", authenticateToken, authorizeEmployeeOrAdmin, getSoldCarDetails)

module.exports = router;