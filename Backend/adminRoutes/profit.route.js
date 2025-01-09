const express = require("express")
const { authenticateToken, authorizeAdmin } = require("../controllers/userRole-auth");
const {calculateProfit, calculateMonthlyProfit} = require("../adminControllers/profit.controller.js")

const router = express.Router();


router.get("/",authenticateToken, authorizeAdmin,calculateProfit);
router.get("/monthly",authenticateToken, authorizeAdmin,calculateMonthlyProfit);


module.exports = router;