const express = require("express");
const handleDeleteCarDetails = require("../controllers/deleteRecord.controller.js");

router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("Delete page");
});

router.post("/deleteCarDetails/:registrationnumber",handleDeleteCarDetails);

module.exports = router;