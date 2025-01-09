import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { jwtDecode } from 'jwt-decode';

export default function DriverDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [username, setUsername] = useState("");




    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    useEffect(() => {
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
        if (decodedToken?.isAdmin == true) {
            setUserRole("Admin");
            setUsername(decodedToken?.username)
        }
        else if (decodedToken?.isEmployee == true) {
            setUserRole("Employee");
            setUsername(decodedToken?.username)

        }
        else if (decodedToken?.isDriver == true) {
            setUserRole("Driver");
            setUsername(decodedToken?.username)

        }
    })

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col lg:flex-row">
            <div
                className={`${isSidebarOpen ? 'block' : 'hidden'
                    } lg:block bg-white w-64 p-5 fixed lg:relative z-20`}
            >
                <div className="lg:hidden mb-5">
                    <button
                        onClick={toggleSidebar}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Close Menu
                    </button>
                </div>

                <div className="flex items-center space-x-2 mb-5">
                    <img
                        className="w-8 h-12 rounded-full"
                        src="/Assets/Images/logo.png"
                        alt="Profile"
                    />
                    <div>
                        <h3 className="font-semibold">Nikhil Motors</h3>
                        <div className="flex flex-col">
                            <span className="text-gray-500">{userRole}</span>
                            <span className="text-gray-500">{username}</span>
                        </div>


                    </div>
                </div>

                <nav>
                    <ul className="space-y-4">
                        <li>
                            <NavLink className="text-blue-500 font-semibold" to="/driverdashboard">
                                Driver Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="text-gray-600 font-semibold" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="text-gray-600 font-semibold" to="/contact">
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>

            </div>

            <div className="lg:hidden p-5">
                <button
                    onClick={toggleSidebar}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                </button>
            </div>

            <div className="flex-1 p-5 lg:p-10">
                {/* <div className="flex justify-between mb-5">
                    <h2 className="text-2xl font-bold">Driver Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-8 h-8 rounded-full"
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                        />
                        <span>Nikhil Motors</span>
                    </div>
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    <NavLink className="text-gray-600 font-semibold" to="/driverdashboard/onsiteVehicleImages">
                        <div className="bg-purple-500 p-5 rounded text-white min-h-4">
                            Add Onsite Vehicle Images
                        </div>
                    </NavLink>
                    <NavLink className="text-gray-600 font-semibold" to="/driverdashboard/drivermaintainance">
                        <div className="bg-blue-500 p-5 rounded text-white min-h-4">
                            Add Maintainance
                        </div>
                    </NavLink>
                    {/* <div className="bg-orange-500 p-5 rounded text-white min-h-4">
                        Sample Card3
                    </div> */}
                </div>
            </div>
        </div>
    );
}