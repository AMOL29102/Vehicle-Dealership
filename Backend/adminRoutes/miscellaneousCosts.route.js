const express = require('express');
const router = express.Router();
const {
    addCost,
    getCurrentMonthCosts,
    getYearlyCost,
    getMonthlyCost,
    filterByMonthAndYear
} = require('../adminControllers/miscellaneousCosts.controller.js');

// POST request to add a cost
router.post('/add', addCost);

// GET request for current month costs
router.get('/current-month', getCurrentMonthCosts);

// GET request for yearly cost
router.get('/yearly', getYearlyCost);

// GET request for specific monthly cost
router.get('/monthly/:month/:year', getMonthlyCost);

// GET request to filter by specific month and year
router.get('/filter', filterByMonthAndYear);

module.exports = router;
