const db = require("../models/database")
const { getObjectURL, listImagesInFolder } = require("../amazonS3/s3config"); 


// async function handleGetMaintainanceDetails(req, res) {
//     const registernumber = req.query.registernumber;
//     console.log("yeh le", registernumber);

//     try {
//         //console.log(registernumber);
//         if (!registernumber) {
//             return res.status(400).send("Enter a car registration number");
//         }

//         const query = `SELECT * FROM maintainancedetails WHERE registernumber = $1`;
//         const value = [registernumber];
//         const result = await db.query(query, value);

//         //console.log(result.rows[0]);
//         if (result.rows.length == 0) {
//             return res.status(400).send("The car does not exist in the system");
//         }

//         const query1 = `SELECT SUM(price) FROM maintainancedetails WHERE registernumber = $1`;
//         const value1 = [registernumber];
//         const totCost = await db.query(query1, value1);

//         const maintainanceDetails = result.rows[0];
//         const totalCost = totCost.rows[0];

//         return res.status(200).json({
//             registernumber: maintainanceDetails.registernumber,
//             description: maintainanceDetails.maintainancedetails,
//             price: maintainanceDetails.price,
//             maintainanceDate: maintainanceDetails.maintainanceDate,
//             role: maintainanceDetails.maintainancedone,
//             maintainanceReceipt: maintainanceDetails.maintainancereceipt,
//             totalmaintainance: totalCost.sum,
//         });


//     } catch (error) {
//         return res.status(500).send("Internal Server Error")
//     }
// }
async function handleGetMaintainanceDetails(req, res) {
    const registernumber = req.query.registernumber;
    console.log("Received register number:", registernumber);

    try {
        if (!registernumber) {
            return res.status(400).send("Enter a car registration number");
        }

        // Query to get all maintenance records for the given register number
        const query = `SELECT * FROM maintainancedetails WHERE registernumber = $1`;
        const value = [registernumber];
        const result = await db.query(query, value);

        // Check if there are any results
        if (result.rows.length === 0) {
            return res.status(201).send("The car does not exist in the system");
        }

        // Calculate total maintenance cost
        const query1 = `SELECT SUM(maintainancecost) AS sum FROM maintainancedetails WHERE registernumber = $1`;
        const value1 = [registernumber];
        const totCost = await db.query(query1, value1);

        // Retrieve maintenance records
        const maintainanceDetails = result.rows; // This will be an array of records
        const totalCost = totCost.rows[0].sum; // Use 'sum' from the query result


        // S3 folder structure for images (e.g., regisNum/VehicleImages/)
        const maintainanceFolder = `${registernumber}/MaintenanceDoc/`;

        // Fetch image keys from the S3 folder
        const maintainanceDocsKeys = await listImagesInFolder(maintainanceFolder);
        console.log(`Image Keys for ${registernumber}: ${maintainanceDocsKeys}`);

        // Generate signed URLs for other images, starting from 1
        const maintainanceDocsPromises = maintainanceDocsKeys.map(async (key, index) => {
            return await getObjectURL(key); // Generate URL for each image key
        });

       // Wait for all other image promises to resolve
const maintainanceDocs = await Promise.all(maintainanceDocsPromises);

// Create maintenanceRecords array
const maintenanceRecords = maintainanceDetails.map((detail, index) => ({
    description: detail.maintainancedetails,
    price: detail.maintainancecost,
    maintainanceDate: detail.maintainancedate,
    role: detail.maintainancedone,
    maintainanceReceipt: maintainanceDocs[index], // Use index to get corresponding element from maintainanceDocs
}));


        // Return the maintenance records along with the total cost
        return res.status(200).json({
            registernumber: maintainanceDetails[0].registernumber,
            maintenanceRecords: maintenanceRecords,
            totalmaintainance: totalCost,
        });

    } catch (error) {
        console.error("Error fetching maintenance details:", error);
        return res.status(500).send("Internal Server Error");
    }
}



// async function handlePostMaintainanceDetails(req, res) {
//     const { registernumber, description, price, maintainanceDate, role } = req.body;
//     if (!registernumber || !description || !price || !maintainanceDate || !role) {
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
//                         (registernumber,price,maintainancedetails,maintainanceDate,maintainancereceipt,maintainancedone)
//                         VALUES ($1,$2,$3,$4,$5,$6)`;
//         const values = [registernumber, price, description, maintainanceDate, maintainanceReceipts, role];
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
    const {registernumber,description,price,role,maintainanceDate} = req.body;
    console.log( req.body);

    // Check for missing fields
    if (!registernumber || !description || !price || !maintainanceDate || !role) {
        return res.status(400).send("Enter all the details correctly");
    }

  

    try {
        const temp = "";
        let nextIndex = 0; // Start with 0 if no records exist

        // Query to get the highest maintenance number or default to 0 if it doesn't exist
        const qr = `SELECT COALESCE(MAX(maintainanceNumber), 0) AS maxNumber FROM maintainancedetails WHERE registernumber = $1`;
        const val = [registernumber];
        const result1 = await db.query(qr, val);
        
        if (result1.rows.length > 0) {
            nextIndex = result1.rows[0].maxnumber + 1; // Increment by 1 for the next index
        }
        
        // Insert into the database
        const query = `INSERT INTO maintainancedetails 
                        (registernumber, maintainancecost, maintainancedetails, maintainancedate, maintainancereceipt, maintainancedone,maintainanceNumber)
                        VALUES ($1, $2, $3, $4, $5, $6,$7)`;
        const values = [
            registernumber,
            price,
            description,
            maintainanceDate,
            temp, // Convert to JSON string
            role,
            nextIndex
        ];
        const result = await db.query(query, values);

        // Check if insertion was successful
        if (result.rowCount === 0) {
            return res.status(400).send("Error occurred in entering the details");
        }

        return res.status(200).json({nextIndex});

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    handleGetMaintainanceDetails,
    handlePostMaintainanceDetails
}