const express = require("express");
const {handleEditCarDetails} = require("../controllers/editcardetails.controller.js");
const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");


router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("edited");
});

router.post("/",authenticateToken, authorizeEmployeeOrAdmin,handleEditCarDetails);

module.exports = router;