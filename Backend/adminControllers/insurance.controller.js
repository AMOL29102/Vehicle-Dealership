const db = require("../models/database");
const cloudin = require('../controllers/cloud.controller');

async function handleInsuranceDetails(req, res) {
    const {
        registerNumber,
        insuranceCompany,
        insuranceNumber,
        insuranceValidity,
        insuranceStartDate,
        insuranceEndDate
    } = req.body; 
    
    // Check for missing input data
    if (!registerNumber || !insuranceCompany || !insuranceNumber || !insuranceValidity || !insuranceStartDate || !insuranceEndDate) {
        console.log(req.body);
        return res.status(400).send("The data you have entered is incorrect. Please check again.");
    }   
    
    // Check if any files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("Please upload the document(s) correctly.");
    }

    try {
        const documentUrls = [];

        // Loop through files and upload them to Cloudinary
        for (const doc of req.files) {
            const path = doc.path;
            const result = await cloudin(path); // Upload document to Cloudinary
            const docResult = result.secure_url;
            documentUrls.push(docResult); // Store secure URLs
        }

        // Check if documents were successfully uploaded
        if (documentUrls.length === 0) {
            return res.status(401).send("Error uploading the documents.");
        }

        // Insert data into the carinsurance table
        const query = `INSERT INTO carinsurance (registernum, insurancecompany, insurancenumber, insurancetenure, insurancestartdate, insuranceenddate, insurancedocuments) 
                       VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const values = [registerNumber, insuranceCompany, insuranceNumber, insuranceValidity, insuranceStartDate, insuranceEndDate, documentUrls];

        const result = await db.query(query, values);

        if (!result) {
            return res.status(500).send("An unexpected error has occurred while inserting data.");
        }

        return res.status(200).send("Documents entered successfully.");
    } catch (error) {
        console.error(`${error}: An error occurred`);
        return res.status(500).send("Unexpected error occurred.");
    }
}

async function handleGetInsuranceDetails(req,res) {
    const registernum = req.query.registernum;
    try{
        if(!registernum) {
            return res.status(400).send("Enter the correct value");
        }

        const query = `SELECT * FROM carinsurance WHERE registernum = $1`;
        const value = [registernum];
        const result = await db.query(query,value);

        if (result.rows.length === 0) {
            return res.status(404).send("The Car Insurance Details Do Not Exist");
        }
        
        const insuranceData = result.rows[0];
        return res.status(200).json({
            registernum: insuranceData.registernum,
            insurancecompany: insuranceData.insurancecompany,
            insurancenumber: insuranceData.insurancenumber,
            insurancetenure: insuranceData.insurancetenure,
            insurancestartdate: insuranceData.insurancestartdate,
            insuranceenddate: insuranceData.insuranceenddate,
            insurancedocuments: insuranceData.insurancedocuments
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
    
}


module.exports = {handleInsuranceDetails,
    handleGetInsuranceDetails
};