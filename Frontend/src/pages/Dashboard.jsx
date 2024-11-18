import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { jwtDecode } from "jwt-decode";

// const token = localStorage.getItem('authToken');

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [carDetails, setCarDetails] = useState([]);
  const { query, setQuery } = useContext(SearchContext);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleView = (url) => {
    navigate(`/dashboard/costReport/${url}`);
  };

  const handleEdit = (url) => {
    navigate(`/dashboard/edit/${url}`);
  };

  const handleSearchInputChange = (e) => {
    // console.log(e.target.value)
    setQuery(e.target.value);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    navigate("/AddEmployee");
  };
  const addDriver = (e) => {
    e.preventDefault();
    navigate("/AddDriver");
  };

  useEffect(() => {
    const fetchTotalSellingPrice = async () => {
      try {
        const response = await axios.get(
          "https://vehicle-dealership.vercel.app/dashboard/total-selling-price",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setTotalSellingPrice(response.data.totalSellingPrice); // Assuming response contains 'totalSellingPrice'
      } catch (error) {
        console.error("Error fetching total selling price:", error);
      }
    };

    fetchTotalSellingPrice();
  }, []);

  const downloadLogFile = async () => {
    try {
      const response = await fetch("https://vehicle-dealership.vercel.app/logs/download", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ensure the user is authenticated
        },
      });

      if (!response.ok) {
        throw new Error("File not found or failed to download.");
      }

      // Create a Blob from the response and trigger a download
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `user_activity_log_${
        new Date().toISOString().split("T")[0]
      }.csv`; // File name with today's date
      link.click();
    } catch (error) {
      console.error("Error downloading log file:", error);
      alert("Failed to download log file.");
    }
  };
  // Fetch car details from the API
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        let params = {};
        if (query) params.carSearch = query;
        // console.log(params)
        const response = await axios.get(`https://vehicle-dealership.vercel.app/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params,
        });
        console.log(response.data);
        setCarDetails(response.data); // Assuming the response contains an array of car details
      } catch (error) {
        if (error.response?.status == 400) {
          navigate("/admin");
        } else console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [query]);

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
    if (decodedToken?.isAdmin && decodedToken.isAdmin == true) {
      setUserRole("Admin");
      setUsername(decodedToken?.username);
    } else if (decodedToken?.isEmployee && decodedToken.isEmployee == true) {
      setUserRole("Employee");
      setUsername(decodedToken?.username);
    }
  });

  const fetchMonthlyCosts = async () => {
    try {
      const response = await axios.get(
        "https://vehicle-dealership.vercel.app/miscellaneous-costs/current-month",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      ); // Endpoint for miscellaneous costs
      const allCosts = response.data;

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Filter costs for current month and year
      const thisMonthCosts = allCosts.filter((cost) => {
        const costDate = new Date(cost.date);
        return (
          costDate.getMonth() === currentMonth &&
          costDate.getFullYear() === currentYear
        );
      });

      // Calculate the total for the current month
      const totalMonthlyCost = thisMonthCosts.reduce(
        (accumulator, cost) => accumulator + parseFloat(cost.cost),
        0
      );

      setMonthlyCost(totalMonthlyCost.toFixed(2)); // Format to 2 decimal places
    } catch (error) {
      console.error("Error fetching monthly costs:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyCosts();
  }, []);

  const currentDate = new Date();
  const soldCarsCount = carDetails.filter((car) => car.status === true).length;
  const totalCars = carDetails.filter((car) => car.status === false).length;
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col lg:flex-row">
      {/* {console.log("HI", username)} */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
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
              <NavLink className="text-gray-600 font-semibold" to="/contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="min-h-[2px] mt-10 bg-black"></div>
        <NavLink to={"/dashboard/carDetailsForm"}>
          <button className="mt-6 bg-blue-500 text-white w-36 px-7 py-2 rounded hover:bg-blue-600">
            Add Vehicle
          </button>
        </NavLink>

        <NavLink to={"/dashboard/deleteCarDetails"}>
          <button className="mt-6 bg-red-500 text-white w-36 px-4 py-2 rounded hover:bg-red-600">
            Remove Vehicle
          </button>
        </NavLink>

        <NavLink to={"/dashboard/addNoticeImage"}>
          <button className="mt-6 bg-yellow-500 text-white w-36 px-4 py-2 rounded hover:bg-yellow-600">
            Add Notice
          </button>
        </NavLink>

        <NavLink to={"/dashboard/sellCarDetails"}>
          <button className="mt-6 bg-blue-500 text-white w-36 px-4 py-2 rounded hover:bg-blue-600">
            Sell Vehicle
          </button>
        </NavLink>

        <div className="min-h-[2px] mt-6   bg-black"></div>
        <NavLink to={"/dashboard/customerEnquiry"}>
          <button className="mt-6 bg-green-500 text-white w-36 px-10 py-2 rounded hover:bg-green-600">
            Enquiry
          </button>
        </NavLink>
      </div>

      <div className="lg:hidden p-5">
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      <div className="flex-1 p-5 lg:p-10">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <div className="flex items-center space-x-2">
            {/* <img
              className="w-8 h-12 rounded-full"
              src="/Assets/Images/logo.png"
              alt="Profile"
            />
            <span>Nikhil Motors</span> */}
          </div>
        </div>
        <div className="ml-auto mb-4 flex space-x-4">
          {userRole === "Admin" && (
            <>
              <button
                onClick={addEmployee}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Employee
              </button>
              <button
                onClick={addDriver}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Driver
              </button>
              <button
                onClick={downloadLogFile}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Download Logs
              </button>
            </>
          )}
          {userRole === "Employee" && (
            <>
              <button
                onClick={addDriver}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Driver
              </button>
            </>
          )}
        </div>
        <h2 className="mb-4">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
  <div className="bg-purple-300 pl-5 p-3 rounded text-white min-h-4">
    <p>Vehicle Inventory: {totalCars}</p>
    <p>Sold Vehicles: {soldCarsCount}</p>
  </div>

  <div
    onClick={() => navigate("/dashboard/miscellaneous-costs")}
    className="bg-blue-300 p-3 rounded text-white min-h-4 cursor-pointer hover:bg-blue-400 transition-all transform hover:scale-105 active:scale-95"
  >
    <p>Miscellaneous Expenses This Month</p>
    <p className="text-lg font-bold">₹{monthlyCost}</p>
  </div>

  <div className="bg-orange-300 p-3 rounded text-white min-h-4">
    <p>Total Sold Vehicles Cost</p>
    <p className="text-lg font-bold">₹{totalSellingPrice}</p>
    {/* Display total selling price */}
  </div>

  <div className="bg-green-400 p-3 rounded text-white min-h-4">
    <p>Office Documents</p>
    <div className="py-1 flex space-x-4 flex-nowrap">
      <button
        onClick={() => navigate("/dashboard/addOfficeDocuments")}
        className="text-white px-2 py-2 rounded border cursor-pointer hover:bg-green-500 transition-all transform hover:scale-105 active:scale-95"
      >
        Add Docs
      </button>
      <button
        onClick={() => navigate("/dashboard/viewOfficeDocuments")}
        className="text-white px-2 py-2 rounded border cursor-pointer hover:bg-green-500 transition-all transform hover:scale-105 active:scale-95"
      >
        View Docs
      </button>
    </div>
  </div>
</div>


        <div className="bg-white p-5 rounded-lg shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-3">Car Details</h3>

          {/* search section */}
          <div className="relative mx-auto w-full max-w-md ml-0 mb-4">
            <input
              type="text"
              className="w-full h-8 pl-10 pr-4 py-2 border border-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              placeholder="Search..."
              value={query}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M18.4 10.55a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </div>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-2">Owner Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone No.</th>
                <th className="p-2">Vehicle Type</th>
                <th className="p-2">Vehicle Name</th>
                <th className="p-2">Registration No.</th>
                <th className="p-2">Status</th>
                <th className="p-2">View</th>
                <th className="p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {carDetails.map((car, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{car.ownername}</td>
                  <td className="p-2">{car.owneremail}</td>
                  <td className="p-2">{car.ownerphone}</td>
                  <td className="p-2">{car.carmake}</td>
                  <td className="p-2">{car.carname}</td>
                  <td className="p-2">{car.registernumber}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        car.status === true
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {car.status === true ? "sold" : "Available"}
                    </span>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleView(car.registernumber)}>
                      <i className={"fas fa-eye"}></i>
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleEdit(car.registernumber)}>
                      <i className="fas fa-pencil-alt"></i>
                    </button>
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
