const express = require("express");
const {addInvestment,getTotalAccountDetails,filterByMonthAndYear}  = require("../adminControllers/accountDetails.controller")
const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");

const router = express.Router();

router.get("/", authenticateToken, authorizeEmployeeOrAdmin, getTotalAccountDetails);
router.get('/filter', filterByMonthAndYear);
router.post("/addInvestment", authenticateToken, authorizeEmployeeOrAdmin, addInvestment);


module.exports = router;
