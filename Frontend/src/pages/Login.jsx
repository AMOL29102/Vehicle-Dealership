import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    function loginHandler(event) {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password.');
            setUsername('');
            setPassword('');
            return;
        }
        alert("Login successful");
        navigate("/dashboard")
        setUsername('');
        setPassword('');

    }
    return (
        <div className='flex items-center justify-center h-[calc(100vh-80px)] bg-gradient-to-r from-green-400 to-blue-500 p-4'>
            <form className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
                <div className='mb-6 sm:mb-8 text-center font-bold text-2xl sm:text-4xl text-gray-800'>
                    <p>Admin Login</p>
                </div>
                <div className='mb-4 sm:mb-6'>
                    <label className='block mb-2 text-gray-700 font-medium'>USERNAME:</label>
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
                        onClick={loginHandler}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
