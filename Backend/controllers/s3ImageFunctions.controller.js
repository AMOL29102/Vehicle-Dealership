const { uploadToS3, deleteObject, listImagesInFolder, getObjectURL } = require('../amazonS3/s3config');

// Controller to directly call uploadToS3Image and return pre-signed URL
async function generatePresignedUploadUrl(req, res) {
    try {
        const { filename, filetype, path } = req.query; // Expect filename from the request body

        // Check if filename is provided and is a string
        // console.log(req.body);
        if (!filename) {
            return res.status(400).send({ message: "Filename is required" });
        }


        // Directly call uploadToS3Image with an empty buffer and filename
        const uploadUrl = await uploadToS3(path, filetype);
        console.log("Controller url : " + uploadUrl);

        res.status(200).send({ uploadUrl });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        res.status(500).send({ message: "Failed to generate pre-signed URL" });
    }
}

async function handleDeleteImage(req, res) {
    const { path } = req.query;  // Now using query parameter

    if (!path) {
        return res.status(400).send("uniqueID number is required");
    }

    try {
        // Delete the image with the specified serialnum
        const deletePath = path;
        await deleteObject(deletePath);

        // Return success message if the image was deleted
        res.send(`Image deleted successfully`);
    } catch (error) {
        console.log(`${error} : Error occurred while deleting the  image`);
        res.status(500).send("An error occurred while deleting the  image");
    }
}


async function handleGetImages(req, res) {
    try {

        // S3 folder structure for images (e.g., regisNum/VehicleImages/)
        // const NoticeFolder = `Notices/`;
        // let ImageFolder = 'Notices/';
        const ImageFolder = req.query.folderPath;
        console.log(ImageFolder)

        // Fetch image keys from the S3 folder
        const ImagesKeys = await listImagesInFolder(ImageFolder);

        // Generate signed URLs for other images, starting from 1
        const ImagesPromises = ImagesKeys?.map(async (key, index) => {
            return await getObjectURL(key); // Generate URL for each image key
        });

        // Wait for all other image promises to resolve
        const Images = await Promise.all(ImagesPromises);

        res.json(Images);

    } catch (error) {
        console.log(`${error} : Error occurred while fetching the images`);
        res.status(500).send("An error occurred while fetching the images");
    }
}



module.exports = { generatePresignedUploadUrl, handleDeleteImage, handleGetImages };