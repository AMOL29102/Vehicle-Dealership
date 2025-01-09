const express = require("express");
const { handleUserRegistration } = require("../adminControllers/userRegistration.controller");
const { authenticateToken, authorizeAdmin,authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");
const router = express.Router();

router.get("/",(req,res)=>{
    res.json("Registration page")
})

router.post("/",authorizeEmployeeOrAdmin, handleUserRegistration);

module.exports = router;