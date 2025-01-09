const express = require("express");
const handleSpecifiPage = require("../controllers/specificCar.controller");
const handleRecordDeletion = require("../controllers/deleteRecord.controller");
const db = require("../models/database");
const { authenticateToken, authorizeEmployeeOrAdmin } = require("../controllers/userRole-auth");


DeleteRecordRoute = express.Router();

DeleteRecordRoute.get("/",  (req, res) => {
    res.send("Delete page")
})

// DeleteRecordRoute.post("/",authenticateToken, authorizeEmployeeOrAdmin, async (req, res) => {
//     console.log(req.query);
//     const registernumber = req.query.registernumber;
//     const carResult = await db.query('SELECT * FROM cardetails WHERE registernumber = $1', [registernumber]);
//     const car = carResult.rows[0];

//     // Fetch images related to the car
//     const imageResult = await db.query('SELECT * FROM images WHERE carnumber = $1', [registernumber]);
//     const images = imageResult.rows;

//     // Fetch owner details
//     const ownerResult = await db.query('SELECT * FROM ownerdetails WHERE registernumber = $1', [registernumber]);
//     const owner = ownerResult.rows[0];

//     // Fetch insurance details
//     const insuranceResult = await db.query('SELECT * FROM carinsurance WHERE registernumber = $1', [registernumber]);
//     const insurance = insuranceResult.rows[0];

//     // Return the results as a JSON object
//     res.json({
//         car,
//         images,
//         owner,
//         insurance
//     });
//     res.send(`Entered registered number is : ${registernumber}`)
// });

DeleteRecordRoute.delete("/car",async (req, res) => {
    try {
        const regisNum = req.query.deletedID;
        console.log(regisNum)
        const query = `delete from cardetails where registernumber =($1)`;
        const values = [regisNum];
        await db.query(query, values);

        return res.status(200).send("Record deleted successfully");
    }
    catch (error) {
        console.log(`Error occured while executig the queries : ${error}`);
        return res.status(400).send(`Error in deletion : ${error}`);

    }

})


//DeleteRecordRoute.delete("/:registernumber/",handleRecordDeletion);

module.exports = DeleteRecordRoute;