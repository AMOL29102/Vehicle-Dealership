const express = require("express");
const handleCarDetails = require("../controllers/cardetails");

router = express.Router();

router.get("/",(req,res)=>{
    return res.render("carDetails");
});

router.post("/",handleCarDetails);

module.exports = router;