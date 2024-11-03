const db = require("../models/database")
const cloudin = require('../controllers/cloud.controller');

// async function handleGetMaintainanceDetails(req, res) {
//     const registerNumber = req.query.registerNumber;
//     console.log("yeh le", registerNumber);

//     try {
//         //console.log(registerNumber);
//         if (!registerNumber) {
//             return res.status(400).send("Enter a car registration number");
//         }

//         const query = `SELECT * FROM maintainancedetails WHERE registernumber = $1`;
//         const value = [registerNumber];
//         const result = await db.query(query, value);

//         //console.log(result.rows[0]);
//         if (result.rows.length == 0) {
//             return res.status(400).send("The car does not exist in the system");
//         }

//         const query1 = `SELECT SUM(maintainancecost) FROM maintainancedetails WHERE registernumber = $1`;
//         const value1 = [registerNumber];
//         const totCost = await db.query(query1, value1);

//         const maintainanceDetails = result.rows[0];
//         const totalCost = totCost.rows[0];

//         return res.status(200).json({
//             registerNumber: maintainanceDetails.registernumber,
//             maintainanceType: maintainanceDetails.maintainancedetails,
//             maintainanceCost: maintainanceDetails.maintainancecost,
//             maintainancedate: maintainanceDetails.maintainancedate,
//             doneby: maintainanceDetails.maintainancedone,
//             maintainanceReceipt: maintainanceDetails.maintainancereceipt,
//             totalmaintainance: totalCost.sum,
//         });


//     } catch (error) {
//         return res.status(500).send("Internal Server Error")
//     }
// }
async function handleGetMaintainanceDetails(req, res) {
    const registerNumber = req.query.registerNumber;
    console.log("Received register number:", registerNumber);

    try {
        if (!registerNumber) {
            return res.status(400).send("Enter a car registration number");
        }

        // Query to get all maintenance records for the given register number
        const query = `SELECT * FROM maintainancedetails WHERE registernumber = $1`;
        const value = [registerNumber];
        const result = await db.query(query, value);

        // Check if there are any results
        if (result.rows.length === 0) {
            return res.status(400).send("The car does not exist in the system");
        }

        // Calculate total maintenance cost
        const query1 = `SELECT SUM(maintainancecost) AS sum FROM maintainancedetails WHERE registernumber = $1`;
        const value1 = [registerNumber];
        const totCost = await db.query(query1, value1);

        // Retrieve maintenance records
        const maintainanceDetails = result.rows; // This will be an array of records
        const totalCost = totCost.rows[0].sum; // Use 'sum' from the query result

        // Return the maintenance records along with the total cost
        return res.status(200).json({
            registerNumber: maintainanceDetails[0].registernumber,
            maintenanceRecords: maintainanceDetails.map(detail => ({
                maintainanceType: detail.maintainancedetails,
                maintainanceCost: detail.maintainancecost,
                maintainancedate: detail.maintainancedate,
                doneby: detail.maintainancedone,
                maintainanceReceipt: detail.maintainancereceipt,
            })),
            totalmaintainance: totalCost,
        });

    } catch (error) {
        console.error("Error fetching maintenance details:", error);
        return res.status(500).send("Internal Server Error");
    }
}



// async function handlePostMaintainanceDetails(req, res) {
//     const { registerNumber, maintainanceType, maintainanceCost, maintainancedate, doneby } = req.body;
//     if (!registerNumber || !maintainanceType || !maintainanceCost || !maintainancedate || !doneby) {
//         return res.status(404).send("Enter all the details correctly");
//     }

//     if (!req.files || req.files.length === 0) {
//         return res.status(400).send("Please upload the document(s) correctly.");
//     }
//     try {
//         const maintainanceReceipts = [];

//         for (const doc of req.files) {
//             const path = doc.path;
//             const result = await cloudin(path); // Upload document to Cloudinary
//             const docResult = result.secure_url;
//             maintainanceReceipts.push(docResult); // Store secure URLs
//         }

//         // Check if documents were successfully uploaded
//         if (maintainanceReceipts.length === 0) {
//             return res.status(401).send("Error uploading the documents.");
//         }

//         const query = `INSERT INTO maintainancedetails 
//                         (registernumber,maintainancecost,maintainancedetails,maintainancedate,maintainancereceipt,maintainancedone)
//                         VALUES ($1,$2,$3,$4,$5,$6)`;
//         const values = [registerNumber, maintainanceCost, maintainanceType, maintainancedate, maintainanceReceipts, doneby];
//         const result = await db.query(query, values);

//         if (result.rows.length == 0) {
//             return res.status(400).send("Error occured in entering the details");
//         }

//         res.status(200).send("Details Entered Successfully");


//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

async function handlePostMaintainanceDetails(req, res) {
    const { registerNumber, maintainanceType, maintainanceCost, maintainancedate, doneby } = req.body;

    // Check for missing fields
    if (!registerNumber || !maintainanceType || !maintainanceCost || !maintainancedate || !doneby) {
        return res.status(400).send("Enter all the details correctly");
    }

    // Check for uploaded files
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("Please upload the document(s) correctly.");
    }

    try {
        const maintainanceReceipts = [];

        // Upload documents to Cloudinary and store URLs
        for (const doc of req.files) {
            const path = doc.path;
            const result = await cloudin(path); // Upload document to Cloudinary
            const docResult = result.secure_url;
            maintainanceReceipts.push(docResult); // Store secure URLs
        }

        // Check if documents were successfully uploaded
        if (maintainanceReceipts.length === 0) {
            return res.status(400).send("Error uploading the documents.");
        }

        // Insert into the database
        const query = `INSERT INTO maintainancedetails 
                        (registernumber, maintainancecost, maintainancedetails, maintainancedate, maintainancereceipt, maintainancedone)
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        const values = [
            registerNumber,
            maintainanceCost,
            maintainanceType,
            maintainancedate,
            JSON.stringify(maintainanceReceipts), // Convert to JSON string
            doneby
        ];
        const result = await db.query(query, values);

        // Check if insertion was successful
        if (result.rowCount === 0) {
            return res.status(400).send("Error occurred in entering the details");
        }

        res.status(200).send("Details Entered Successfully");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    handleGetMaintainanceDetails,
    handlePostMaintainanceDetails
}