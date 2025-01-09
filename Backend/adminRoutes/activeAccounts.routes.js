const express = require("express");
const {getActiveAccounts, deleteActiveAccount} = require('../adminControllers/activeAccounts.controller.js')
const { authenticateToken, authorizeAdmin} = require("../controllers/userRole-auth.js");

const router = express.Router();

router.get("/getaccounts", authenticateToken, authorizeAdmin, getActiveAccounts);
router.delete("/deleteAccount", authenticateToken, authorizeAdmin, deleteActiveAccount);

module.exports = router;
