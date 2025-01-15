import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);




    async function loginHandler(event) {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password.');
            setUsername('');
            setPassword('');
            return;
        }

        //https://www.nikhilmotors.com/api/
        //https://www.nikhilmotors.com/api/
        //http://65.2.78.63/
        const endpoint = "https://www.nikhilmotors.com/api/login"; // Update with your actual endpoint

        try {
            setIsLoading(true)
            // Trim and convert username and password to lowercase
            const trimmedUsername = username.trim().toLowerCase();
            const trimmedPassword = password.trim().toLowerCase();

            const response = await axios.post(endpoint, {
                userID: trimmedUsername,
                userPass: trimmedPassword
            });
            const token = response.data; // Assuming the token is sent as response data
            localStorage.setItem('authToken', token);
            alert("Login Successful");


            let decodedToken;
            if (token) {
                try {
                    decodedToken = jwtDecode(token);
                    console.log(decodedToken);

                } catch (error) {
                    console.error("Invalid token", error);

                }
            }
            if (decodedToken.isAdmin == true || decodedToken.isEmployee == true) {

                navigate("/dashboard");  // Navigate to dashboard upon success
            }
            else if (decodedToken.isDriver == true) {
                navigate("/driverdashboard");
            }
            setIsLoading(false)
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Login failed: ", error.response.data);

                if (error.response.status === 400) {
                    setErrorMessage("User does not exist or details are missing.");
                } else if (error.response.status === 401) {
                    setErrorMessage("Incorrect password.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
            } else if (error.request) {
                // Request was made but no response was received
                console.error("No response received: ", error.request);
                setErrorMessage("Server is not responding. Please try again later.");
            } else {
                // Something else happened in setting up the request
                console.error("Error setting up the request: ", error.message);
                setErrorMessage("There was an error during the login process.");
            }

            // toast.error("Login failed.", { position: "top-center", autoClose: 2000 });
        }
        setIsLoading(false)

        // setUsername('');
        // setPassword('');
    }

    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-r from-green-400 to-blue-500 p-4'>
            <form className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md' onSubmit={loginHandler}>
                <div className='mb-6 sm:mb-8 text-center font-bold text-2xl sm:text-4xl text-gray-800'>
                    <p>User Login</p>
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>USER ID :</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        onChange={(event) => { setUsername(event.target.value) }}
                    />
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>PASSWORD:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                        required
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </div>
                <div className='text-center'>
                    <button
                        type='submit'
                        className='w-full px-3 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors duration-300'
                    >
                        {isLoading ? (
                            <span className="loader">Logging in...</span> // Simple text loader, you can add a spinner here
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>

                {/* Display error message */}
                {errorMessage && <p className='mt-4 text-red-600 text-center'>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;