const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../controllers/userRole-auth.js");

// Route for validating the token
router.post("/", authenticateToken, (req, res) => {
    res.status(200).send("Token is valid");
});

module.exports = router;
