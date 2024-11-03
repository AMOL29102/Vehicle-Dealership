const express = require("express");
const handleHomePage = require("../controllers/home.controller.js");

const router = express.Router();

router.get("/",handleHomePage)

module.exports = router;