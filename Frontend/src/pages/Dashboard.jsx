import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            className="w-10 h-10 rounded-full"
            src="https://via.placeholder.com/40"
            alt="Profile"
          />
          <div>
            <h3 className="font-semibold">Nikhil Motors</h3>
            <span className="text-gray-500">Admin</span>
          </div>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink className="text-blue-500 font-semibold" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className="text-gray-600 font-semibold" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="text-gray-600 font-semibold" to="/about">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>



        <div className="min-h-[2px] mt-10 bg-black"></div>
        <NavLink to={'/dashboard/carDetailsForm'}>
          <button className="mt-10 bg-blue-500 text-white w-36 px-7 py-2 rounded hover:bg-blue-600">
            Add Vehicle
          </button>
        </NavLink>

        <NavLink to={'/dashboard/deleteCarDetails'}>
          <button className="mt-10 bg-red-500 text-white w-36 px-4 py-2 rounded hover:bg-red-600">
            Remove Vehicle
          </button>
        </NavLink>

        <div className="min-h-[2px] mt-10 bg-black"></div>
        <NavLink to={'/dashboard/customerEnquiry'}>
          <button className="mt-10 bg-green-500 text-white w-36 px-10 py-2 rounded hover:bg-green-600">
            Enquiry
          </button>
        </NavLink>

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
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="Profile"
            />
            <span>Nikhil Motors</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-purple-300 p-5 rounded text-white min-h-4">
            Sample Card1
          </div>
          <div className="bg-blue-300 p-5 rounded text-white min-h-4">
            Sample Card1
          </div>
          <div className="bg-orange-300 p-5 rounded text-white min-h-4">
            Sample Card1
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">Car Details</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-2">Owner</th>
                <th className="p-2">Email</th>
                <th className="p-2">Vehicle Type</th>
                <th className="p-2">Vehicle no</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  owner: "Mike Bhagat",
                  email: "mikebhagat@gmail.com",
                  VechicleType: "MUV",
                  VechicleNo: "MH48Ck9597",
                  status: "sold",
                },
                {
                  owner: "Anika Suri",
                  email: "anikasuri@mail.com",
                  VechicleType: "Car",
                  VechicleNo: "MH48Ck9596",
                  status: "available",
                },
                {
                  owner: "Ravi Kumar",
                  email: "ravikumar@gmail.com",
                  VechicleType: "Truck",
                  VechicleNo: "MH48Ck9595",
                  status: "sold",
                },
                {
                  owner: "Mike Honey",
                  email: "mikehoney@gmail.com",
                  VechicleType: "Muv",
                  VechicleNo: "MH48Ck9594",
                  status: "available",
                },
                {
                  owner: "Kevin Peterson",
                  email: "kevinp@mail.com",
                  VechicleType: "Car",
                  VechicleNo: "MH48Ck9591",
                  status: "sold",
                },
              ].map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{user.owner}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.VechicleType}</td>
                  <td className="p-2">{user.VechicleNo}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.status === "sold"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
