import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for the toast notifications
import { jwtDecode } from "jwt-decode";


const AccountDetails = () => {
    const [costs, setCosts] = useState([]); // Initialize as an empty array
    const [description, setDescription] = useState("");
    const [amount, setCost] = useState("");
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());
    const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
    const [totalCost, setTotalCost] = useState(0); // State to store the total amount
    const [loading, setLoading] = useState(false); // Loading state for add button
    const [isFetching, setIsFetching] = useState(false); // Loading state for fetching data
    const [userRole, setUserRole] = useState("");
    const [username, setUsername] = useState("");
    const [accountDetails, setAccountDetails] = useState({
        totalBuy: 0,
        totalMaintainance: 0,
        totalMiscellaneous: 0,
        totalInstallments: 0,
        totalSellings: 0,
        totalDownPayments: 0,
        totalCommision: 0,
        totalInvestment: 0,
        Remaining_Balance: 0,
    });
    const navigate = useNavigate();


    const fetchAccountDetails = async () => {
        try {
            const response = await axios.get("http://3.109.83.51/api/accountDetails", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setAccountDetails(response.data);
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };



    useEffect(() => {
        fetchAccountDetails();
    }, [costs])

    useEffect(() => {
        fetchCosts();
    }, [filterMonth, filterYear]);

    const fetchCosts = async () => {
        setIsFetching(true); // Start loading
        try {
            const response = await axios.get(
                "http://3.109.83.51/api/accountDetails/filter",
                {
                    params: {
                        month: filterMonth + 1, // Adjust for 0-based month
                        year: filterYear,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },
                }
            );
            console.log(response.data.costs);
            if (Array.isArray(response.data.costs)) {
                setCosts(response.data.costs);
            } else {
                setCosts([]); // Fallback if data is not as expected
            }
            setTotalCost(response.data.totalCost || 0); // Ensure total amount is set correctly
        } catch (error) {
            console.error("Error fetching costs:", error);
            toast.error("Failed to fetch costs"); // Show error toast
            setCosts([]); // Set empty array in case of error
            setTotalCost(0); // Reset total amount if error occurs
        } finally {
            setIsFetching(false); // End loading
        }
    };

    const handleAddInvestment = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading while adding amount
        try {
            const response = await axios.post(
                "http://3.109.83.51/api/accountDetails/addInvestment",
                {
                    description,
                    amount,
                    date: new Date().toISOString(),
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }

            );
            setDescription("");
            setCost("");
            fetchCosts(); // Refresh the list after adding
            toast.success("Investment added successfully"); // Show success toast
        } catch (error) {
            console.error("Error adding amount:", error);
            toast.error("Failed to add amount"); // Show error toast
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="min-h-[89vh] flex flex-col lg:flex-row bg-gray-100 p-5">
            <div className="w-full lg:w-1/2 p-5 bg-white shadow-lg rounded-lg mb-5 lg:mb-0 lg:mr-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Add Investment Amount
                </h2>

                {/* Line between filters and add amount form */}
                <hr className="border-t-2 border-gray-300 my-4" />

                {/* Add amount Form */}
                <form onSubmit={handleAddInvestment} className="mb-5 space-y-4">
                    <input
                        type="number"
                        placeholder="amount"
                        value={amount}
                        onChange={(e) => setCost(e.target.value)}
                        className="border p-2 rounded-md w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded-md w-full"
                        required
                    />

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white px-6 py-2 rounded-md w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add amount"}
                    </button>
                </form>


                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 text-left">Description</th>
                            <th className="py-2 px-4 text-right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 px-4">Total Investment Amount</td>
                            <td className="py-2 px-4 text-right">{accountDetails?.totalInvestment}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4">Total Vehicle Buying Amount</td>
                            <td className="py-2 px-4 text-right">{accountDetails?.totalBuy}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4">Total Vehicle Maintenance Amount</td>
                            <td className="py-2 px-4 text-right">{accountDetails?.totalMaintainance}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4">Total Miscellaneous Spends</td>
                            <td className="py-2 px-4 text-right">{accountDetails?.totalMiscellaneous}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4">Total Commission</td>
                            <td className="py-2 px-4 text-right">{accountDetails?.totalCommision}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-bold">Total Remaining Balance</td>
                            <td className="py-2 px-4 text-right font-bold">{accountDetails?.Remaining_Balance}</td>
                        </tr>

                    </tbody>
                </table>



            </div>

            {/* Table Section */}
            <div className="w-full lg:w-[70%] p-5 bg-white shadow-lg rounded-lg h-[608px] overflow-y-auto flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Account Details
                </h2>
                <hr className="border-t-2 border-gray-300 mb-2" />

                <p>Filters:</p>
                <div className="mb-4 flex space-x-4">
                    <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(Number(e.target.value))}
                        className="border p-2 rounded-md w-full"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString("en", { month: "long" })}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filterYear}
                        onChange={(e) => setFilterYear(Number(e.target.value))}
                        className="border p-2 rounded-md w-full"
                    >
                        {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">
                    Costs for{" "}
                    {new Date(filterYear, filterMonth).toLocaleString("en", {
                        month: "long",
                        year: "numeric",
                    })}
                </h3>

                <div className="overflow-x-auto flex-1">
                    <table className="min-w-full table-auto border-collapse text-gray-700">
                        <thead>
                            <tr>
                                <th className="border p-3 text-left">Description</th>
                                <th className="border p-3 text-left">Amount</th>
                                <th className="border p-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? (
                                <tr>
                                    <td colSpan="3" className="border p-3 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : costs.length > 0 ? (
                                costs.map((costItem, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="border p-3">{costItem.description}</td>
                                        <td className="border p-3">{costItem.amount}</td>
                                        <td className="border p-3">
                                            {new Date(costItem.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border p-3 text-center">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 font-semibold text-gray-800">
                    Total Investment Amount: ₹{totalCost}
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default AccountDetails;