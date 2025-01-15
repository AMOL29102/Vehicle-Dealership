const db = require("../models/database");

async function addInstallments(req, res) {
    const { registernumber, amount, installmentdate, description, paymentMode, accountPaidTo } = req.body;
    try {
        const sellingPriceResponse = await db.query(
            `SELECT selling_price FROM soldcardetails WHERE registernumber = $1`,
            [registernumber]
        );

        if (sellingPriceResponse.rows.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }

        const selling_price = sellingPriceResponse.rows[0].selling_price;

        // Check if there is an existing installment for this registernumber
        const result = await db.query(
            `SELECT total_amount FROM installments WHERE registernumber = $1 LIMIT 1`,
            [registernumber]
        );

        // If no records found, currentTotalAmount should be 0
        let currentTotalAmount = result.rows.length > 0 ? result.rows[0].total_amount : 0;

        // Calculate the new total_amount
        let updatedTotalAmount = currentTotalAmount + amount;

        // If there is a previous installment, update the total_amount; otherwise, just insert the new installment
        if (currentTotalAmount > 0) {
            // Update the total_amount for the registernumber
            await db.query(
                `UPDATE installments
         SET total_amount = $1
         WHERE registernumber = $2`,
                [updatedTotalAmount, registernumber]
            );
        } else {
            // If no previous installments, initialize total_amount with the first installment amount
            updatedTotalAmount = amount;
        }

        // Insert the new installment with the updated total_amount
        const insertResponse = await db.query(
            `INSERT INTO installments (registernumber, amount, installment_date, total_amount, description, payment_mode, account_paid_to)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [registernumber, amount, installmentdate, updatedTotalAmount, description, paymentMode, accountPaidTo]
        );

        const installmentId = insertResponse.rows[0].id;



        res.status(200).json({ message: "Installment added successfully", installmentId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add installment", error: error.message });
    }
}
const getInstallments = async (req, res) => {
    const { registernumber } = req.query;
    console.log(registernumber);

    try {
        // Query to fetch installments and sum of the 'amount' column
        const installmentsResponse = await db.query(
            `SELECT *, (SELECT SUM(amount) FROM installments WHERE registernumber = $1) AS total_amount 
             FROM installments WHERE registernumber = $1`,
            [registernumber]
        );

        // Check if installments are found
        if (installmentsResponse.rows.length === 0) {
            return res.status(404).json({ message: "No installments found for this car" });
        }

        // Return the installments along with the sum of the amount
        res.status(200).json({
            installments: installmentsResponse.rows,
            totalAmount: installmentsResponse.rows[0].total_amount // Access the sum value from the first row
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve installments", error: error.message });
    }
};


// Export the controllers
module.exports = {
    addInstallments,
    getInstallments
};