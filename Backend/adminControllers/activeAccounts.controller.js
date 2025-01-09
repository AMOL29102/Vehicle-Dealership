const db = require("../models/database");

const getActiveAccounts = async (req, res) => {
    try {
        const query = `SELECT * FROM users`;
        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching active accounts:", error);
        res.status(500).json({ error: "An error occurred while fetching active accounts." });
    }
};


async function deleteActiveAccount(req, res) {
    const { userId } = req.body;
    try {
        // Check if the user exists in the users table
        const userCheckQuery = `SELECT * FROM users WHERE userid = $1`;
        const userCheckResponse = await db.query(userCheckQuery, [userId]);

        if (userCheckResponse.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user from the users table
        const deleteQuery = `DELETE FROM users WHERE userid = $1`;
        await db.query(deleteQuery, [userId]);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete the account", error: error.message });
    }
}


module.exports = {getActiveAccounts, deleteActiveAccount}