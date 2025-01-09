const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();
const { format } = require('date-fns');


// Initialize S3 client with specific configurations
const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AMAZON_ACCESS_KEY,
        secretAccessKey: process.env.AMAZON_SECRET_KEY,
    }
});

async function uploadToS3(filename, contentType) {
    // Set up the parameters for the S3 upload
    const s3Params = {
        Bucket: "vehicledealership",
        Key: filename,
        ContentType: contentType
    };

    // Create a PutObjectCommand for the S3 upload
    const command = new PutObjectCommand(s3Params);

    // Generate a pre-signed URL that expires in 1 hour
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
    return url;
}


// Generate a signed URL to retrieve an object
async function getObjectURL(key, expiresIn = 3600) { // default expiration set to 1 hour
    const command = new GetObjectCommand({
        Bucket: "vehicledealership",
        Key: key,
    });

    // Generate a signed URL with an expiration time
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
}


// List images in a specified folder path
async function listImagesInFolder(path) {
    const params = {
        Bucket: 'vehicledealership', // Replace with your bucket name
        Prefix: path, // Use the folder structure based on the provided path
    };

    try {
        const command = new ListObjectsV2Command(params); // Create command
        const data = await s3Client.send(command); // Send command

        // Check if data.Contents exists and has items
        if (!data.Contents || data.Contents.length === 0) {
            // console.log(`No images found for path ${path}`);
            return []; // Return an empty array if no images found
        }

        // Extract the keys of the images
        return data.Contents?.map(item => item.Key); // Returns an array of keys
    } catch (error) {
        console.error(`Error listing images in folder for path ${path}: ${error.message}`);
        throw error; // Rethrow to handle in the main function
    }
}


async function deleteObject(filename) {
    const command = new DeleteObjectCommand({
        Bucket: "vehicledealership",
        Key: filename
    });

    try {
        await s3Client.send(command);
        console.log("Object deleted successfully");
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

}



async function uploadLogsToS3() {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const logFilePath = path.join(__dirname, `../logs/${todayDate}.csv`);

    // Deleting the log file from two days ago
    const twoDaysAgoDate = format(subDays(new Date(), 1), 'yyyy-MM-dd'); // Date two days ago
    const twoDaysAgoLogFile = `logs/${twoDaysAgoDate}.csv`;
    await deleteObject(twoDaysAgoLogFile);

    // Check if today's log file exists
    if (fs.existsSync(logFilePath)) {
        const logData = fs.readFileSync(logFilePath);

        const s3Params = {
            Bucket: "vehicledealership",
            Key: `logs/${todayDate}.csv`,
            Body: logData,
            ContentType: "text/csv",
        };

        const command = new PutObjectCommand(s3Params);

        try {
            await s3Client.send(command);
            console.log(`Log file for ${todayDate} uploaded successfully.`);
        } catch (error) {
            console.error("Error uploading logs:", error);
            throw error;
        }
    } else {
        console.log(`No log file found for ${todayDate}.`);
    }
}

async function downloadTodaysLogsFromS3() {
    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const command = new GetObjectCommand({
        Bucket: "vehicledealership",
        Key: `logs/${todayDate}.csv`,
    });

    try {
        const { Body } = await s3Client.send(command);
        const logs = await streamToString(Body);
        return logs;
    } catch (error) {
        console.error("Error downloading logs:", error);
        throw error;
    }
}

function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", chunk => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        stream.on("error", reject);
    });
}

module.exports = { s3Client, uploadToS3, getObjectURL, listImagesInFolder, deleteObject, uploadLogsToS3, downloadTodaysLogsFromS3 };