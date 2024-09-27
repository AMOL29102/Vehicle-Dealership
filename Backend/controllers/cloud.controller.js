const cloudinary = require("cloudinary").v2; // Correct the import statement
const fs = require("fs");
require('dotenv').config(); 

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload an image to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        // Uploading the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect resource type
        });

        // Log success and return the response
        console.log("File uploaded successfully:", response.url);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return response;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // Attempt to delete the local file if it exists
        

        return null;
    }
};

module.exports = uploadOnCloudinary;