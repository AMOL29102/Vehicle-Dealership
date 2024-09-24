const express = require("express");
const handleCarDetails = require("../controllers/cardetails");

router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("Displayed");
});

router.post("/",handleCarDetails);

module.exports = router;