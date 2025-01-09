  const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { format } = require("date-fns");
const { chromium } = require("playwright"); // Import Playwright
const handlebars = require("handlebars");
const db = require("../models/database.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AMAZON_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_SECRET_KEY,
  },
});

const BUCKET_NAME = "vehicledealership";

async function generateBill(req, res) {
  const { registerNumber } = req.body;

  try {
    // Query car details
    const carDetailsQuery = `SELECT * FROM cardetails WHERE registernumber = ($1)`;
    const result = await db.query(carDetailsQuery, [registerNumber]);
    if (result.rowCount === 0)
      return res.status(404).send({ message: "Car details not found" });

    const customerDetailsQuery = `SELECT * FROM soldcardetails WHERE registernumber = $1`;
    const result2 = await db.query(customerDetailsQuery, [registerNumber]);
    if (result2.rowCount === 0)
      return res.status(404).send({ message: "Customer details not found" });

    const ownerDetailsQuery = `SELECT * FROM ownerdetails WHERE registernumber = $1`;
    const result3 = await db.query(ownerDetailsQuery, [registerNumber]);
    if (result3.rowCount === 0)
      return res.status(404).send({ message: "Owner details not found" });

    // Extract data from queries
    const carDetails = result.rows[0];
    const customerDetails = result2.rows[0];
    const ownerDetails = result3.rows[0];

    const templateContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.8">
    <title>Customer Bill</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            overflow: hidden; /* Prevent content overflow */
            page-break-before: avoid; /* Avoid page break before body */
        }

        .container {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            page-break-inside: avoid; /* Prevent page break inside container */
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 24px; /* Reduced font size */
            color: #333;
        }

        .header p {
            font-size: 14px; /* Reduced font size */
            color: #555;
            margin: 0;
        }

        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .details-table th, .details-table td {
            text-align: left;
            padding: 8px; /* Reduced padding */
            border: 1px solid #ddd;
        }

        .details-table th {
            background-color: #f4f4f4;
            color: #333;
        }

        .section-title {
            font-size: 14px; /* Reduced font size */
            font-weight: bold;
            margin-top: 20px;
            color: #4CAF50;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 5px;
        }

        .footer {
            text-align: right;
            font-size: 14px; /* Reduced font size */
            font-weight: bold;
            margin-top: 20px;
        }

        .sign-section {
            margin-top: 10px;
        }

        .sign-row {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            margin-bottom: 20px;
        }

        .sign-row div {
            flex: 1;
            margin: 0 10px;
        }

        .sign-field {
            border: 1px solid #ddd;
            padding: 8px; /* Reduced padding */
            text-align: center;
            font-size: 12px;
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Customer Bill</h1>
            <p>Generated by Nikhil Motors</p>
        </div>

        <div class="section-title">Vehicle Details</div>
        <table class="details-table">
            <tr><th>Registration Number</th><td>{{carDetails.registernumber}}</td></tr>
            <tr><th>Vehicle Name</th><td>{{carDetails.carname}}</td></tr>
            <tr><th>Type</th><td>{{carDetails.carmake}}</td></tr>
            <tr><th>Company</th><td>{{carDetails.carcompany}}</td></tr>
            <tr><th>Color</th><td>{{carDetails.carcolor}}</td></tr>
            <tr><th>Fuel Type</th><td>{{carDetails.fuel}}</td></tr>
            <tr><th>Sell Price</th><td>₹{{carDetails.vehiclesellprice}}</td></tr>
        </table>

        <div class="section-title">Customer Details</div>
        <table class="details-table">
            <tr><th>Owner Name</th><td>{{customerDetails.owner_name}}</td></tr>
            <tr><th>Contact Number</th><td>{{customerDetails.contact_no}}</td></tr>
            <tr><th>Down Payment</th><td>₹{{customerDetails.down_payment}}</td></tr>
            <tr><th>Commission</th><td>₹{{customerDetails.commission}}</td></tr>
        </table>

        <div class="section-title">Owner Details</div>
        <table class="details-table">
            <tr><th>Owner Name</th><td>{{ownerDetails.ownername}}</td></tr>
            <tr><th>Contact Number</th><td>{{ownerDetails.ownerphone}}</td></tr>
            <tr><th>Email</th><td>{{ownerDetails.owneremail}}</td></tr>
            <tr><th>Address</th><td>{{ownerDetails.owneraddress}}</td></tr>
        </table>

        <div class="sign-section">
            <div class="section-title">Additional Details</div>
            <div>Date of Handover: ___________________________</div>
            <div class="sign-row">
                <div><div class="sign-field">Witness 1</div><div class="sign-field">Signature: ______________________</div></div>
                <div><div class="sign-field">Witness 2</div><div class="sign-field">Signature: ______________________</div></div>
            </div>
            <div class="sign-row">
                <div><div class="sign-field">Car Buyer</div><div class="sign-field">Signature: ______________________</div></div>
                <div><div class="sign-field">Car Seller</div><div class="sign-field">Signature: ______________________</div></div>
            </div>
        </div>
    </div>
</body>
</html>
`;

    // Compile the template using Handlebars
    const compiledTemplate = handlebars.compile(templateContent);
    const html = compiledTemplate({
      carDetails,
      customerDetails,
      ownerDetails,
    });

    // Use Playwright to generate PDF
    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Avoid extra system dependencies
      headless: true, // Headless mode
    });
    const page = await browser.newPage();
    await page.setContent(html); // Set HTML content to the page
    const buffer = await page.pdf({ format: "A4", landscape: false }); // Generate PDF buffer

    await browser.close(); // Close the Playwright browser

    // Generate S3 object key
    const s3Key = `bill/${registerNumber}_bill.pdf`;

    try {
      // Check if the bill already exists in S3
      const headParams = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
      };

      try {
        // If the file exists, generate a signed URL
        await s3Client.send(new GetObjectCommand(headParams));

        const signedUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand(headParams),
          { expiresIn: 900 }
        );
        return res
          .status(200)
          .send({
            message: "PDF already exists. You can download it using the link.",
            fileUrl: signedUrl,
          });
      } catch (headError) {
        if (headError.name === "NoSuchKey") {
          // If the file doesn't exist, upload it
          const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: s3Key,
            Body: buffer,
            ContentType: "application/pdf",
          };

          await s3Client.send(new PutObjectCommand(uploadParams));

          const signedUrl = await getSignedUrl(
            s3Client,
            new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key }),
            { expiresIn: 900 }
          );

          return res
            .status(200)
            .send({
              message: "Bill generated successfully",
              fileUrl: signedUrl,
            });
        } else {
          throw headError;
        }
      }
    } catch (err) {
      return res
        .status(500)
        .send({
          message: "Failed to upload or retrieve PDF",
          error: err.message,
        });
    }
  } catch (err) {
    console.error("Error generating bill:", err);
    return res
      .status(500)
      .send({ message: "Error generating the bill", error: err.message });
  }
}

module.exports = generateBill;
