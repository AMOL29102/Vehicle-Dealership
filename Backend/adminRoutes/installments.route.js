const express = require("express");

const {addInstallments, getInstallments} = require('../adminControllers/installment.controller.js')
const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");
const logResReq = require('../log.js')


const router = express.Router();

router.post("/", logResReq(), addInstallments);
router.get("/",logResReq(), getInstallments);

module.exports = router