import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaTrashAlt } from 'react-icons/fa';
import { getUploadURL, uploadToS3 } from '../../utils/s3UploadFunctions.jsx';
import axios from "axios";
import { toast } from 'react-toastify';

const EditVehicleImages = ({ id }) => {
    const [images, setImages] = useState([]);
    const [DisplayImage, setDisplayImage] = useState(null);
    const [NewDisplayImage, setNewDisplayImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchedImages, setFetchedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const [selectedImageSerial, setSelectedImageSerial] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State for screen overlay





    // Fetch images function to be called on mount and after upload
    const fetchImages = async () => {
        try {
            const response = await axios.get(`https://www.nikhilmotors.com/api/car/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            const allImageUrls = response.data.images;
            setFetchedImages(allImageUrls);

            const regex = /\/InventoryVehicleImages\/(\d+)\?/;
            const match = allImageUrls[0].match(regex);
            let checkDisplayImage;

            if (match) {
                checkDisplayImage = match[1];
                console.log(checkDisplayImage);
            } else {
                console.log('No unique ID found');
            }
            if (checkDisplayImage == 0) {
                setDisplayImage(response.data.images[0]);

            }
            else {
                setDisplayImage("No Image");
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching images:", error);
            // toast.error("Failed to load images");
        }
    };

    // Call fetchImages on component mount
    useEffect(() => {
        fetchImages();
    }, []);


    const handleNewDisplayImageChange = (e) => {
        const file = e.target.files[0];
        // const imageURL = URL.createObjectURL(file);
        if (file) {
            setNewDisplayImage(file);
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };


    const handleSubmitDisplayImage = async () => {

        if (!NewDisplayImage) {
            toast.error("Select Display Image to update.")
            return;

        }

        setUploading(true);

        try {
            console.log(id);
            // Generate the S3 upload URL for the display image
            if (NewDisplayImage) {
                const displayImageFileName = `${id}/InventoryVehicleImages/0`;
                const displayImageUploadURL = await getUploadURL(NewDisplayImage, displayImageFileName);
                console.log(displayImageUploadURL);
                await uploadToS3(displayImageUploadURL, NewDisplayImage);
            }

            setUploading(false);
            setNewDisplayImage(null);
            fetchImages();
            toast.success("Display Image Updated Successfully");

            return true;
        } catch (error) {
            setUploading(false);
            toast.error("Error in uploading...")
            throw error;
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageSerial(null);
    };

    const confirmDelete = (serialnum) => {
        setSelectedImageSerial(serialnum);
        setIsModalOpen(true);
    };

    const handleSubmitImages = async () => {

        if (images.length == 0) {
            toast.error("Select Images to update.")
            return;

        }
        setUploading2(true);

        try {
            // Handle other image uploads if necessary (similar to DisplayImage)
            const len = fetchedImages.length;
            for (let i = 0; i < images.length; i++) {
                const image = images[i];
                const imageFileName = `${id}/InventoryVehicleImages/${i + len}`;
                const imageUploadURL = await getUploadURL(image, imageFileName);
                await uploadToS3(imageUploadURL, image);
            }

            setUploading2(false);
            fetchImages();
            setImages([]);
            toast.success("Images Added Successfully");
            return true;
        } catch (error) {
            setUploading2(false);
            toast.error("Error in uploading...")
            throw error;
        }
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true); // Start fade-up effect
            const deleteUrl = fetchedImages[selectedImageSerial];
            console.log("Del : " + deleteUrl);

            // Extract the uniqueID from the URL
            const regex = /\/InventoryVehicleImages\/(\d+)\?/;
            const match = deleteUrl.match(regex);
            let uniqueID;

            if (match) {
                uniqueID = match[1];
                console.log(uniqueID);
            } else {
                console.log('No unique ID found');
            }

            const path = `${id}/InventoryVehicleImages/${uniqueID}`

            await axios.delete(`https://www.nikhilmotors.com/api/delete-image`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
                ,
                params: {
                    path: path

                }
            });
            toast.success(`Image deleted successfully!`);

            // Update the state to reflect the change
            setFetchedImages((prevImages) =>
                prevImages.filter((_, index) => index !== selectedImageSerial)
            );

            if (uniqueID == 0) {
                setDisplayImage("no image")
            }

        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image");
        } finally {
            setIsLoading(false); // Remove fade-up effect
            setIsModalOpen(false);
            setSelectedImageSerial(null);
        }
    };

    return (
        <>
            {/* Image Upload Section */}
            <div>
                <div>
                    <h2 className="text-xl font-bold mb-2 mt-6 ">Display Image </h2>

                    {DisplayImage && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="relative border rounded-lg p-4 shadow-lg">
                                <img
                                    src={DisplayImage}
                                    alt={`No Display image`}
                                    className="h-48 w-full object-cover rounded-lg"
                                />

                            </div>
                        </div>

                    )}
                </div>
                <div className="flex">
                    <h2 className="text-xl font-bold mb-2 mt-6 ">Choose other image as Display image </h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewDisplayImageChange}
                        className="mb-4 mt-6 ml-8"
                    />
                </div>

                {NewDisplayImage && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="relative border rounded-lg p-4 shadow-lg">
                        <img
                            src={URL.createObjectURL(NewDisplayImage)}
                            alt={`New Display image`}
                            className="h-48 w-full object-cover rounded-lg"
                        />

                    </div>
                </div>)}
                <button
                    onClick={handleSubmitDisplayImage}
                    className={`bg-blue-500 mt-6 mb-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading}
                >
                    {uploading ? 'Changing...' : 'Change'}
                </button>
            </div>

            <hr></hr>
            {/* Display fetched images in cards with a delete button */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fetchedImages?.map((image, index) => (
                        <div key={index} className="relative border rounded-lg p-4 shadow-lg">
                            <img
                                src={image}
                                alt={`Image ${index}`}
                                className="h-48 w-full object-cover rounded-lg"
                            />
                            <button
                                onClick={() => confirmDelete(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full"
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <div className="flex">
                    <h2 className="text-xl font-bold mb-2 mt-4">Upload More Images</h2>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mb-4 ml-6 mt-4"
                    />
                </div>

                <div className="flex flex-wrap gap-4 mb-5">
                    {images?.map((image, index) => {
                        const imageURL = URL.createObjectURL(image);
                        return (
                            <img
                                key={index}
                                src={imageURL}
                                alt={`Preview ${index + 1}`}
                                className="h-32 object-cover rounded-lg shadow-lg"
                            />
                        );
                    })}
                </div>

                <button
                    onClick={handleSubmitImages}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading2}
                >
                    {uploading2 ? 'Changing...' : 'Change'}
                </button>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this image?</h3>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                onClick={closeModal}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default EditVehicleImages;