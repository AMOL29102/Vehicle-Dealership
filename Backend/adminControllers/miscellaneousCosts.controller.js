const db = require('../models/database.js');  // Assumes you have a `db` module to handle database connections

// Add a new miscellaneous cost
const addCost = async (req, res) => {
    const { cost, description, date } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO miscellaneous_costs (cost, description, date) VALUES ($1, $2, $3) RETURNING *`,
            [cost, description, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding cost:", error);
        res.status(500).json({ error: "An error occurred while adding cost" });
    }
};

// Get costs for the current month
const getCurrentMonthCosts = async (req, res) => {
    const currentMonth = new Date().getMonth() + 1;  // JavaScript months are 0-indexed
    const currentYear = new Date().getFullYear();

    try {
        const result = await db.query(
            `SELECT * FROM miscellaneous_costs WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2`,
            [currentMonth, currentYear]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error retrieving current month costs:", error);
        res.status(500).json({ error: "An error occurred while retrieving costs" });
    }
};

// Get total cost for the current year
const getYearlyCost = async (req, res) => {
    const currentYear = new Date().getFullYear();

    try {
        const result = await db.query(
            `SELECT SUM(cost) AS yearly_total FROM miscellaneous_costs WHERE EXTRACT(YEAR FROM date) = $1`,
            [currentYear]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error retrieving yearly cost:", error);
        res.status(500).json({ error: "An error occurred while retrieving yearly cost" });
    }
};

// Get monthly cost for a specific month and year
const getMonthlyCost = async (req, res) => {
    const { month, year } = req.params;

    try {
        const result = await db.query(
            `SELECT SUM(cost) AS monthly_total FROM miscellaneous_costs WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2`,
            [month, year]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error retrieving monthly cost:", error);
        res.status(500).json({ error: "An error occurred while retrieving monthly cost" });
    }
};

// Filter costs by specific month and year
const filterByMonthAndYear = async (req, res) => {
    const { month, year } = req.query;
  
    try {
        // Fetch costs for the filtered month and year
        const result = await db.query(
            `SELECT * FROM miscellaneous_costs WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2`,
            [month, year]
        );
  
        // Log the result to ensure costs are fetched correctly
        // console.log("Fetched Costs:", result.rows);
  
        // Fetch the total cost for the filtered month and year
        const totalCostResult = await db.query(
            `SELECT SUM(cost::DECIMAL) AS totalCost FROM miscellaneous_costs WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2`,
            [month, year]
        );

        // Log the raw result of the total cost query
        // console.log("Total Cost Query Result:", totalCostResult);

        // Convert total cost to a number (parse the string as a float)
        const totalCost = parseFloat(totalCostResult.rows[0]?.totalcost) || 0;

        // Log the final total cost
        // console.log("Final Total Cost:", totalCost);

        res.json({
            costs: result.rows || [], // Ensure costs is always an array
            totalCost: totalCost, // Ensure total cost is a number
        });
    } catch (error) {
        console.error("Error filtering costs:", error);
        res.status(500).json({ error: "An error occurred while filtering costs" });
    }
};

  

module.exports = {
    addCost,
    getCurrentMonthCosts,
    getYearlyCost,
    getMonthlyCost,
    filterByMonthAndYear
};
