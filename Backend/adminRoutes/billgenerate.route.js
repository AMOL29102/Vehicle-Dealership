// routes/billgenerate.route.js
const express = require('express');
const router = express.Router();
const  generateBill  = require('../adminControllers/billgenerate.controller.js');


router.post('/generate-bill', generateBill);

module.exports = router;
