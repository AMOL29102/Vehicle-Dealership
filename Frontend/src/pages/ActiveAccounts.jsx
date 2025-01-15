import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

export default function ActiveAccounts() {
  const [employees, setEmployees] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDelete, setCurrentDelete] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://www.nikhilmotors.com/api/activeAccounts/getaccounts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const accounts = response.data;
        setEmployees(
          accounts.filter((account) => account.userdesignation === "Employee")
        );
        setDrivers(
          accounts.filter((account) => account.userdesignation === "Driver")
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch accounts. Please try again later.");
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const openModal = (userId, designation) => {
    setCurrentDelete({ userId, designation });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentDelete(null);
  };

  const handleDelete = async () => {
    const { userId, designation } = currentDelete;

    try {
      // Send the DELETE request to the server
      setLoading(true);
      await axios.delete(`https://www.nikhilmotors.com/api/activeAccounts/deleteAccount`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: { userId }, // Sending userId in the request body
      });

      // Update the UI by filtering out the deleted user
      if (designation === "Employee") {
        setEmployees((prev) =>
          prev.filter((employee) => employee.userid !== userId)
        );
      } else if (designation === "Driver") {
        setDrivers((prev) => prev.filter((driver) => driver.userid !== userId));
      }

      // Display success toast
      toast.success("Deleted successfully!", { position: "top-center", autoClose: 1000 });
    } catch (err) {
      // Display error toast if deletion fails
      toast.error("Failed to delete the account. Please try again later.");
    } finally {
      // Close the modal after the operation is completed
      closeModal();
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <div className="text-center p-4">Loading...</div>;
  // }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }
  const handleGoBack = () => {
    navigate("/dashboard");
  };
  return (
    <div className="p-4">
      <button
        onClick={handleGoBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 transition"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mb-4 mt-10">Active Accounts</h1>
      <div className={`flex flex-col sm:flex-row sm:space-x-4 ${loading ? "opacity-50" : ""}`}>
        {/* Employee Table */}
        <div className="w-full sm:w-1/2 p-2 mb-4 sm:mb-0">
          <h2 className="text-xl font-semibold mb-2">Employees</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">User ID</th>
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Password</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.userid}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.username}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.userpassword}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openModal(employee.userid, "Employee")}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Driver Table */}
        <div className="w-full sm:w-1/2 p-2">
          <h2 className="text-xl font-semibold mb-2">Drivers</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">User ID</th>
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Password</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {driver.userid}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {driver.username}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {driver.userpassword}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openModal(driver.userid, "Driver")}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-[20%]"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this account?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 px-4 py-2 mr-2 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            {loading ? "Loading..." : "Yes, Delete"}
          </button>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
}
