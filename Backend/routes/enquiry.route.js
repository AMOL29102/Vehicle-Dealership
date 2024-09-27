const express = require("express");
const handleEnquiry = require("../controllers/customerQuery.controller.js");

const router = express.Router();

router.get("/",handleEnquiry.handleGetQuery)
router.post("/", handleEnquiry.handleNewCustomerQuery)
router.delete('/', handleEnquiry.handleDeleteCustomerQuery);

module.exports = router;