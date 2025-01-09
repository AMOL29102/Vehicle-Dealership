import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'
import { FaFileAlt } from "react-icons/fa";
export default function DocumentView({ isOffice }) {
    const [fetchedImages, setFetchedImages] = useState([]);
    const [fetchedDescription, setFetchedDescription] = useState([]);
    const [fetchedUniqueIds, setFetchedUniqueIds] = useState([]);


    const { id } = useParams();
    const navigate = useNavigate();

    // Initialize a state to track image errors for all documents
    const [imageErrors, setImageErrors] = useState({});

    // Handler function to update imageErrors state
    const handleImageError = (index) => {
        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true, // Mark this index as having an image load error
        }));
    };


    const fetchImages = async () => {
        try {

            let folderPath = 'OfficeDocuments';
            if (id) {
                folderPath = `${id}/AdminDocuments`;
            }
            const response1 = await axios.get('https://www.nikhilmotors.com/api/get-images', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                params: {
                    folderPath: folderPath
                }
            });
            setFetchedImages(response1.data);

            const response2 = await axios.get('https://www.nikhilmotors.com/api/Description', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setFetchedDescription(response2.data.descriptions);
            setFetchedUniqueIds(response2.data.uniqueids);


            console.log(response2.data);
            console.log(response1.data);

        } catch (error) {
            console.error("Error fetching notice images:", error);
            toast.error("Failed to load notice images");
        }
    };

    // Call fetchImages on component mount
    useEffect(() => {
        fetchImages();
    }, []);


    const handleGoBack = () => {

        if (isOffice == true) {
            navigate("/dashboard");
        }
        else { navigate(`/dashboard/costReport/${id}`); }


    };

    let descMap;

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


                    <div className="py-4 w-full">
                        {fetchedImages.length === 0 && (
                            <div className="flex flex-col items-center py-4">
                                <p>No Admin Documents Exist!</p>
                            </div>
                        )}


                        {/* Create a map of uniqueId to description */}
                        {(() => {
                            descMap = new Map();
                            fetchedUniqueIds.forEach((uniqueId, index) => {
                                descMap.set(uniqueId, fetchedDescription[index] || "No Description Available");
                            });
                            return null; // No UI change, only map creation
                        })()}

                        {/* Table-like structure */}
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            {/* Table Header */}
                            <div className="flex bg-gray-200 text-gray-700 font-semibold py-4">
                                <div className="w-1/3 px-4 text-center border-r border-gray-300">Description</div>
                                <div className="w-2/3 px-4 text-center">Document (Click to Download)</div>
                            </div>

                            {/* Table Rows */}
                            {fetchedImages?.map((url, index) => {
                                let extractedUniqueid = null;

                                // Check and extract uniqueid for both types of paths
                                const officeDocMatch = url.match(/OfficeDocuments\/(\d+)/);
                                const adminDocMatch = url.match(/\/[A-Z0-9]+\/AdminDocuments\/(\d+)/);

                                if (officeDocMatch) {
                                    // Extract uniqueid from OfficeDocuments
                                    extractedUniqueid = officeDocMatch[1];
                                } else if (adminDocMatch) {
                                    // Extract uniqueid from AdminDocuments pattern
                                    extractedUniqueid = adminDocMatch[1];
                                }

                                // Fetch description from the map
                                const description = extractedUniqueid && descMap.has(extractedUniqueid)
                                    ? descMap.get(extractedUniqueid)
                                    : "No Description Available";

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col md:flex-row items-center justify-between w-full py-6 border-t"
                                    >
                                        {/* Description Column */}
                                        <div className="w-full md:w-1/3 px-4 text-center md:text-right border-r border-gray-300">
                                            <p className="text-md font-medium">{description}</p>
                                        </div>

                                        {/* Document Column */}
                                        <div className="w-full md:w-2/3 px-4 flex justify-center">
                                            <a
                                                href={url}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center items-center w-full md:w-3/4 px-4"
                                            >
                                                {/* Attempt to load image first */}
                                                {!imageErrors[index] ? (
                                                    <img
                                                        src={url}
                                                        alt={`Document ${index + 1}`}
                                                        className="w-3/4 md:w-2/3 rounded-lg shadow-lg cursor-pointer hover:opacity-80"
                                                        title="Click to Download Image"
                                                        onError={() => handleImageError(index)} // Handle error by updating state
                                                    />
                                                ) : (
                                                    // Fallback to generic document icon
                                                    <div className="flex flex-col items-center">
                                                        <FaFileAlt className="text-gray-600 text-5xl mb-2" />
                                                        <p className="text-blue-500 underline">Click to Download</p>
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}