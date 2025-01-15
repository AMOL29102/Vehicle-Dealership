const db = require("../models/database");

async function handleChangePassword(req, res) {
    try {
        // Sum up the selling price from soldcarDetails

        const {oldPassword , newPassword} = req.body;

        const query1 = `SELECT userpassword FROM users WHERE userdesignation = $1`;
        const Designation = "Admin";

        const result1 = await db.query(query1,[Designation]);
        // console.log("+++",result1.rows[0].userpassword);

        if (result1.rows.length === 0 || result1.rows[0].userpassword != oldPassword) {
            return res.status(501).json({ message: 'Wrong Old Password' });
        }

        const query = `UPDATE users SET userpassword = $1 WHERE userdesignation = $2 `;

        const result = await db.query(query,[newPassword,Designation]);


        res.status(200).json({ message:"Password Changed Sucessfully." });
    } catch (error) {
        console.error("Error in changing password", error.message);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { handleChangePassword };