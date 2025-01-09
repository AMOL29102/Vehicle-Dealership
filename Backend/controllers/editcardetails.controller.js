
const db = require("../models/database");

async function handleEditCarDetails(req, res) {
    try {

        const { tablename, fieldToEdit, newValue, registernumber } = req.body;
        console.log(tablename, fieldToEdit, newValue, registernumber);

        // Use dynamic table and column names
        const query1 = `UPDATE ${tablename} SET ${fieldToEdit} = $1 WHERE registernumber = $2`;
        const values = [newValue, registernumber];

        await db.query(query1, values);

        res.status(200).send("Field Edited Successfully");

    } catch (error) {
        console.log(`${error} : Error occurred while editing fields`);
        res.status(500).send("An error occurred while editing fields");
    }
}

module.exports = {
    handleEditCarDetails
};
