import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUploadURL, uploadToS3 } from '../../utils/s3UploadFunctions.jsx';
import { jwtDecode } from "jwt-decode";

export function Maintainance({ registernumber, isDriver, isEmployee, isAdmin, vehicleData, onMaintenanceAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [maintainanceDate, setMaintainanceDate] = useState('');
    const [role, setRole] = useState("");
    const [adding, setAdding] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [globalRegisterNumber, setGlobalRegisterNumber] = useState(registernumber);



    const [driverSubittedId, setDriverSubittedId] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);




    const navigate = useNavigate();

    if (isEmployee == true || isAdmin == true) {
        useEffect(() => {
            if (vehicleData) {
                setCarData(vehicleData);
            }
        })
    }

    function fetchToken() {
        const token = localStorage.getItem("authToken");
        let decodedToken;
        if (token) {
            try {
                decodedToken = jwtDecode(token);
                console.log(decodedToken);
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
        console.log(decodedToken);
        setDecodedToken(decodedToken);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setAdding(true);

            fetchToken();


            let currRole = isDriver ? "driver" : isAdmin ? "admin" : isEmployee ? "employee" : "";
            if (!currRole) currRole = role;

            // if(decodedToken)
            // {
            //     currRole += ` ${decodedToken.username}`;
            // }
            // console.log("CurrRole : "+currRole);

            console.log(globalRegisterNumber, description, price, currRole, maintainanceDate)
            const response = await axios.post('https://www.nikhilmotors.com/api/maintainance',
                { registernumber: globalRegisterNumber, description, price, role: currRole, maintainanceDate },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

            if (files.length != 0) {
                const nextIndex = response.data.nextIndex;
                console.log("nextIndex : " + nextIndex);;
                // Handle other image uploads if necessary (similar to DisplayImage)

                const file = files[0];
                const maintainanceDocPath = `${globalRegisterNumber}/MaintenanceDoc/${nextIndex}`;
                const maintainanceDocUrl = await getUploadURL(file, maintainanceDocPath);
                await uploadToS3(maintainanceDocUrl, file);
            }
            // Call the parent callback to refresh maintenance records
            if (onMaintenanceAdded) { onMaintenanceAdded(); }

            // Clear form fields
            setTitle('');
            setPrice('');
            setDescription('');
            setFiles([]);
            setMaintainanceDate('');
            setRole('');

            toast.success('Maintenance record added successfully!');
            console.log(response.data);
            setDriverSubittedId(false);

        } catch (error) {
            console.error('Error adding maintenance record:', error);
            toast.error('Failed to add maintenance record.');
        } finally {
            setAdding(false);
        }
    };

    // Fetch car details using the submitted ID
    const fetchCarDetails = async (currId) => {
        setUploading(true);
        setLoading(true); // Set loading to true before the fetch call
        setError(null); // Reset error before fetch
        try {
            const response = await axios.get(
                `https://www.nikhilmotors.com/api/car/${currId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }
            );
            setCarData(response.data); // Store the fetched car data
            console.log(response.data); // Log the fetched car data
        } catch (err) {
            setCarData(null);
            console.error("Error fetching car details:", err);
            setError("Error fetching car details"); // Set error message if fetch fails
        } finally {
            setLoading(false); // Set loading to false after fetch completes
            setUploading(false);
        }
    };

    const handleGoBack = () => {
        navigate('/driverdashboard');
    };

    const handleDriverSubmitID = async (e) => {
        e.preventDefault();
        const currId = inputValue;

        setInputValue("");


        try {

            setDriverSubittedId(true);
            setGlobalRegisterNumber(currId);
            if (!vehicleData) {
                await fetchCarDetails(currId);
            }

        } catch (error) {

            // Display error message in toast
            console.log("Error in adding Vehicle Images. Please try again!")
            toast.error("Error in adding Vehicle Images. Please try again!");

        }

        console.log(registernumber);
    }

    return (
        <>
            {isDriver == true && (<>
                <div className="container mx-auto pl-16 pr-16 pb-16 pt-8">
                    <div className="mb-4">
                        <button
                            onClick={handleGoBack}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                    {/* Form for submitting the vehicle reg ID */}
                    <form onSubmit={handleDriverSubmitID}>
                        <h2 className="text-xl font-bold mb-2">Vehicle Details</h2>
                        <div>
                            <label
                                htmlFor="brandName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Vehicle Reg ID
                            </label>
                            <input
                                type="text"
                                id="brandName"
                                required
                                maxLength="10"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={uploading}
                        >
                            {uploading ? 'Fetching...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </>)}


            {/* Error Message */}
            {/* {error && !loading && (
                <div className="mt-4 p-4 bg-red-100 border border-red-500 rounded text-center text-red-700">
                    {error}
                </div>
            )} */}

            {/* No data found message */}
            {driverSubittedId == true && !carData && !loading && (
                <p className="text-center mt-4">No data found for this ID.</p>
            )}

            {driverSubittedId == true && carData && carData.car && carData.car.status === true && (
                <div className="mt-4 w-[80%] mx-auto p-4 bg-green-100 border border-green-500 rounded text-center text-green-700">
                    Already Sold
                </div>
            )}

            {/* Display confirmation section only after form is submitted */}
            {driverSubittedId == true && carData && carData.car && carData.car.status === false && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
                    <div className="container mx-auto">
                        <main className="py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white shadow-md rounded-md p-4 ">
                                    <h1 className="text-2xl font-bold mb-4 mt-16">
                                        {carData.car.carcompany} {carData.car.carname}
                                    </h1>

                                    <div>
                                        <img
                                            src={carData.images[0]} // Correctly use the image URL
                                            alt={`Car ${carData.car.carname}`}
                                            className="w-full h-auto rounded-t-lg"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white shadow-md rounded-md p-4">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {" "}
                                        {carData.car.carcompany} {carData.car.carname} Details
                                    </h2>
                                    {/* <h2 className="text-2xl font-bold mb-4 text-center">Vehicle Details</h2> */}
                                    <h3 className="text-lg font-semibold mb-2">
                                        Vehicle Information
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex justify-between items-center border-b pb-2">
                                            <span className="font-semibold">Vehicle Name:</span>
                                            <span>{carData.car.carname}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b pb-2">
                                            <span className="font-semibold">Vehicle Type:</span>
                                            <span>{carData.car.carmake}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b pb-2">
                                            <span className="font-semibold">Company:</span>
                                            <span>{carData.car.carcompany}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b pb-2">
                                            <span className="font-semibold">Color:</span>
                                            <span>{carData.car.carcolor}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b pb-2">
                                            <span className="font-semibold">Price:</span>
                                            <span className="text-blue-500">
                                                ₹ {carData.car.vehiclesellprice}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            )}

            {(isEmployee == true || driverSubittedId == true || isAdmin == true) && carData && carData.car.status == false && (
                <div className='w-[90%] mx-auto mt-6 mb-10'>

                    <h2 className="text-2xl font-bold mb-4">Add Maintenance Record</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Maintenance Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 rounded p-2 w-full"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Role</label>
                            <select
                                disabled={isDriver || isAdmin || isEmployee} // Disable if any of these roles are true
                                value={isDriver ? "driver" : isEmployee==true ? "Employee" :  isAdmin==true ? "temp" : role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="border border-gray-300 rounded p-2 w-full text-sm md:text-base"
                            >
                                <option value="" disabled>
                                    Select role
                                </option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="driver">Driver</option>
                            </select>


                        </div> */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Maintenance Date</label>
                            <input
                                type="date"
                                value={maintainanceDate}
                                onChange={(e) => setMaintainanceDate(e.target.value)}
                                required
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Upload Documents</label>
                            <input
                                type="file"
                                required
                                onChange={(e) => setFiles([...e.target.files])}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${adding ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={adding}
                        >
                            {adding ? 'Adding...' : 'Add Maintenance Record'}
                        </button>
                    </form>
                </div>)}
        </>

    );
}