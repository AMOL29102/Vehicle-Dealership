import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUploadURL, uploadToS3 } from '../../utils/s3UploadFunctions.jsx';
import { toast } from "react-toastify";
import axios from "axios";

const DocumentUpload = ({ isOffice }) => {

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();

    console.log(id);

    const handleGoBack = () => {
        if (isOffice == true) {
            navigate('/dashboard');
        }

        else if (!id) {

            navigate('/driverdashboard');
        }
        else {
            navigate(`/dashboard/costReport/${id}`);

        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            // Upload images first
            await handleUpload();

            toast.success("Documents added successfully!");
            if (window.location.pathname.includes('/dashboard')) {
                // If the current URL contains '/dashboard', navigate to '/dashboard'
                navigate('/dashboard');
            } else {
                // Otherwise, navigate to '/driverdashboard'
                navigate('/driverdashboard');
            }
        } catch (error) {

            // Display error message in toast
            console.log("Error in adding Vehicle Images. Please try again!")
            toast.error("Error in adding Vehicle Images. Please try again!");

        }
    }

    const addDescription = async (uniqueID) => {
        try {
            await axios.post('https://www.nikhilmotors.com/api/Description',
                {
                    uniqueID: uniqueID,
                    description: description
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );

        } catch (error) {
            console.log(`Error occured while saving Description : ${error}`);
        }
        return;
    }

    const handleUpload = async () => {
        setUploading(true);

        try {
            let folder = 'OfficeDocuments';
            if (id) {
                folder = `${id}/AdminDocuments`;
            }

            // Handle other image uploads if necessary (similar to DisplayImage)
            for (let i = 0; i < images.length; i++) {
                const uniqueID = Date.now();
                const image = images[i];
                const imageFileName = `${folder}/${uniqueID}`;
                const imageUploadURL = await getUploadURL(image, imageFileName);
                await uploadToS3(imageUploadURL, image);
                console.log("Descp : " + description)
                await addDescription(uniqueID);

            }

            setUploading(false);
            return true;
        } catch (error) {
            setUploading(false);
            throw error;
        }
    };


    return (
        <>
            <div className="container mx-auto pl-16 pr-16 pb-16 pt-8">
                <div className="mb-4">
                    <button
                        onClick={handleGoBack}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 transition"
                    >
                        Back to Dashboard
                    </button>
                </div>

                {id && <h2 className="text-xl font-bold mb-2 mt-2">Register Number : {id}</h2>
                }
                <div className='mt-6'>
                    <h2 className="text-xl font-bold mb-2">Upload Documents</h2>
                    <input
                        required
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="mb-4"
                    />

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
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                        <textarea
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-300"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>

            </div>
        </>
    )
}

export default DocumentUpload;