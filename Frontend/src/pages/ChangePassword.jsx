import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function changePasswordHandler(event) {
        event.preventDefault();
        setErrorMessage('');

        if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New Password and Confirm New Password do not match.");
            return;
        }

        if (newPassword == oldPassword) {
            setErrorMessage("New Password is same as old Password.");
            return;
        }

        const endpoint = "https://www.nikhilmotors.com/api/dashboard/change-password"; // Update with your actual endpoint

        try {
            setIsLoading(true);
            const requestBody = {
                oldPassword: oldPassword.trim(),
                newPassword: newPassword.trim(),
            };

            const response = await axios.post(endpoint, requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            toast.success("Password changed successfully!", { position: "top-center", autoClose: 1000 });
            setIsLoading(false);
            navigate("/dashboard");
        } catch (error) {
            setIsLoading(false);

            if (error.response) {
                console.error("Password change failed: ", error.response.data);

                // Handle specific status codes
                // console.log("+++++"+error.response.status);
                if (error.response.status == 501) {
                    setErrorMessage("Old password does not match.");
                } else {
                    setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
                }
            } else if (error.request) {
                console.error("No response received: ", error.request);
                setErrorMessage("Server is not responding. Please try again later.");
            } else {
                console.error("Error setting up the request: ", error.message);
                setErrorMessage("An error occurred during the process. Please try again.");
            }

            toast.error("Password change failed.", { position: "top-center", autoClose: 2000 });
        }
    }


    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-r from-green-400 to-blue-500 p-4'>
            <form className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md' onSubmit={changePasswordHandler}>
                <div className='mb-6 sm:mb-8 text-center font-bold text-2xl sm:text-4xl text-gray-800'>
                    <p>Change Password</p>
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>Old Password:</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        onChange={(event) => { setOldPassword(event.target.value) }}
                    />
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>New Password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        onChange={(event) => { setNewPassword(event.target.value) }}
                    />
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>Confirm New Password:</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        onChange={(event) => { setConfirmNewPassword(event.target.value) }}
                    />
                </div>
                <div className='text-center'>
                    <button
                        type='submit'
                        className='w-full px-3 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors duration-300'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loader">Processing...</span>
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </div>

                {errorMessage && <p className='mt-4 text-red-600 text-center'>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default ChangePassword;
