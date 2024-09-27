const db = require("../models/database");

async function handleCarDetails(req, res) {
  try {
    if (!req.body) {
      throw new Error("Request body is empty");
    }

    const {
      registrationNumber,
      vehicleName,
      brandName,
      insuranceCompany,
      policyNumber,
      policyTenure,
      ownerName,
      ownerPhone,
      ownerEmail,
      ownerAddress,
      carColor,
      carPrice,
      carType, 
      fuel
    } = req.body;

    // Log the received data
    // //console.log("Received data:", req.body);

    // Validate individual fields
    if (!registrationNumber || registrationNumber.trim() === "") {
      throw new Error("Registration number is required");
    }

    // Check if registration number already exists
    const query = `SELECT * FROM cardetails WHERE registernumber = $1`;
    const values = [registrationNumber];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      throw new Error("Registration number already exists. Please enter a unique registration number.");
    }

    if (!vehicleName || vehicleName.trim() === "") {
      throw new Error("Vehicle name is required");
    }

    if (!brandName || brandName.trim() === "") {
      throw new Error("Brand name is required");
    }

    if (!insuranceCompany || insuranceCompany.trim() === "") {
      throw new Error("Insurance company is required");
    }

    if (!policyNumber || policyNumber.trim() === "") {
      throw new Error("Policy number is required");
    }

    if (!policyTenure || policyTenure.trim() === "") {
      throw new Error("Policy tenure is required");
    }

    if (!ownerName || ownerName.trim() === "") {
      throw new Error("Owner name is required");
    }

    if (!ownerPhone || ownerPhone.trim() === "") {
      throw new Error("Owner phone is required");
    }

    if (!ownerEmail || ownerEmail.trim() === "") {
      throw new Error("Owner email is required");
    }

    if (!ownerAddress || ownerAddress.trim() === "") {
      throw new Error("Owner address is required");
    }

    if (!carColor || carColor.trim() === "") {
      throw new Error("Car color is required");
    }

    if (!carPrice || carPrice <= 0) {
      throw new Error("Car price is required and must be a positive number");
    }

    if (!carType || carType.trim() === "") {
      throw new Error("Car type is required");
    }

    // Insert car details
    const query2 = `INSERT INTO cardetails (registernumber, carname, carmake, carcompany, carcolor, carprice, fuel) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values2 = [registrationNumber, vehicleName, carType, brandName, carColor, carPrice, fuel];
    await db.query(query2, values2);
    //console.log("Car details inserted:", values2);

    // Insert insurance details
    const query3 = `INSERT INTO carinsurance (registernumber, companyname, policynum, policytenure) VALUES ($1, $2, $3, $4)`;
    const values3 = [registrationNumber, insuranceCompany, policyNumber, policyTenure];
    await db.query(query3, values3);
    //console.log("Insurance details inserted:", values3);

    // Insert owner details
    const query4 = `INSERT INTO ownerdetails (ownername, ownerphone, owneremail, owneraddress, registernumber) VALUES ($1, $2, $3, $4, $5)`;
    const values4 = [ownerName, ownerPhone, ownerEmail, ownerAddress, registrationNumber];
    await db.query(query4, values4);
    //console.log("Owner details inserted:", values4);

    res.status(200).send("Details entered into the database successfully");
  } catch (error) {
    if (error.message.includes("Registration number already exists. Please enter a unique registration number.")) {
      res.status(400).send("Registration number already exists. Please enter a unique registration number.");
    } else {
      console.log(`${error.message} : Error occurred in gathering the details`);
      res.status(500).send("An error occurred while saving details");
    }
  }
}

module.exports = handleCarDetails;