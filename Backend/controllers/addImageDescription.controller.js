const db = require("../models/database");

async function handleGetDescription(req, res) {
    try {
        // Fetching uniqueid and description from the imageDescription table
        const result = await db.query(`SELECT uniqueid, description FROM imageDescription`);

        // Extracting the unique IDs and descriptions as separate arrays
        const uniqueIds = result.rows?.map(row => row.uniqueid);
        const descriptions = result.rows?.map(row => row.description);

        console.log("Fetched unique IDs:", uniqueIds);
        console.log("Fetched descriptions:", descriptions);

        // Sending the response with both arrays
        res.json({
            uniqueids: uniqueIds,
            descriptions: descriptions
        });
    } catch (error) {
        console.log(`Error occurred while fetching data: ${error}`);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleAddDescription(req, res) {
    try {
        const { uniqueID, description } = req.body;
        // console.log(custName, custContact, custQuery,"Date : " + date);
        console.log("be : ", uniqueID);
        console.log("be : ", description);

        const query = `INSERT INTO imageDescription (uniqueid, description) VALUES ($1, $2)`;
        const values = [uniqueID, description];

        await db.query(query, values);
        res.status(201).send("Image Description query added");

    } catch (error) {
        console.log(`Error occurred while adding Image Description query: ${error}`);

        if (error.code === '23505') {
            res.status(400).json({ message: 'Duplicate entry. Image Description query already exists.' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

async function handleDeleteDescription(req, res) {
    const { serialnum, custcontact } = req.body;

    try {
        await db.query(`DELETE FROM customerQuery WHERE serialnum = $1 AND custcontact = $2`, [serialnum, custcontact]);
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}




module.exports = {
    handleGetDescription,
    handleAddDescription,
    handleDeleteDescription
};