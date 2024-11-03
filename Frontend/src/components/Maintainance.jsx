import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function Maintainance({ registernumber }) {
    // const [reportData, setReportData] = useState({ carDetails: { carNo: '' }, maintenanceRecords: [] });
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [maintainanceDate, setMaintainanceDate] = useState('');
    const [role, setRole] = useState('');

    // const fetchMaintenanceDetails = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8000/maintainance", {
    //             params: { registerNumber: registernumber },  
    //         });
    //         const { maintenanceRecords } = response.data;
    //         setReportData((prevData) => ({
    //             ...prevData,
    //             maintenanceRecords: maintenanceRecords || [],
    //         }));
    //         console.log("main", response)
    //     } catch (error) {
    //         console.error('Error fetching maintenance details:', error);
    //         toast.error('Failed to fetch maintenance details.');
    //     }
    // };

    
    // useEffect(() => {
    //     if (registernumber) fetchMaintenanceDetails();
    // }, [registernumber]);  

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        const formData = new FormData();
        formData.append('registerNumber', registernumber);  // Include the car register number
        formData.append('maintainanceType', description);   // Matches the backend 'maintainanceType'
        formData.append('maintainanceCost', price);         // Matches the backend 'maintainanceCost'
        formData.append('doneby', role);                    // Matches the backend 'doneby'
        formData.append('maintainancedate', maintainanceDate); // Matches the backend 'maintainancedate'

        // Append multiple files if any
        files.forEach((file, index) => {
            formData.append('documents', file);  // All files should be appended as 'files'
        });

        try {
            // Send POST request to add new maintenance record
            const response = await axios.post('http://localhost:8000/maintainance', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle success
            toast.success('Maintenance record added successfully!');
            console.log(response.data);

            setTitle('');
            setPrice('');
            setDescription('');
            setFiles([]);
            setMaintainanceDate('');
            setRole('');

            // fetchMaintenanceDetails();
        } catch (error) {
            console.error('Error adding maintenance record:', error);
            // toast.error('Failed to add maintenance record.');
        }
    };

    return (
        <>
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
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    >
                        <option value="" disabled>Select role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="driver">Driver</option>
                    </select>
                </div>

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
                        multiple
                        onChange={(e) => setFiles([...e.target.files])}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add Maintenance Record
                </button>
            </form>
        </>
    );
}
