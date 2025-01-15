import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For getting the params from the URL
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { Maintainance } from "../components/Maintainance";
import Installment from "../components/Installment";
import { jwtDecode } from "jwt-decode";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const CostReport = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [soldStatus, setSoldStatus] = useState();
  const navigate = useNavigate();
  // const [buying]
  const [vehicleData, setvehicleData] = useState({
    insuranceCommission: 0,
    maintenanceRecords: [],
    installments: [],
    carDetails: {
      buyingprice: 0,
      sellingprice: 0,
      carNo: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      model: "",
      color: "",
      type: "",
    },
    totalAmountToBePaid: 0,
    remainingAmount: 0,
  });
  // Form state for installments
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [fetchedVehicleData, setFetchedVehicleData] = useState(null);
  const [vehicleImages, setvehicleImages] = useState([]);
  const [onsiteVehicleImages, setOnsiteVehicleImages] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const [maintainanceData, setMaintainanceData] = useState({
    carDetails: { carNo: "" },
    maintenanceRecords: [],
    totalMaintenanceCost: 0,
  });

  function cleanURL(url) {
    // Use a regex to extract the correct URL
    const match = url.match(/https?:\/\/[^\s"']+/);
    return match ? match[0] : ""; // Return the first matched URL or an empty string
  }

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`https://www.nikhilmotors.com/api/car/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const { car, images, insurance, owner, onsiteImages } = response.data;
        setSoldStatus(response.data.car.status);
        setFetchedVehicleData(response.data);
        setvehicleImages(images);
        setOnsiteVehicleImages(onsiteImages);

        console.log(response.data);

        setvehicleData((prevData) => ({
          ...prevData,
          carDetails: {
            carNo: car.registernumber,
            ownerName: owner.ownername,
            ownerPhone: owner.ownerphone,
            ownerEmail: owner.owneremail,
            model: car.carname,
            color: car.carcolor,
            type: car.carmake,
            fuelType: car.fuel,
            carCompany: car.carcompany,
            buyingprice: car.vehiclebuyprice,
            sellingprice: car.vehiclesellprice
          },
        }));
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details.");
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    function fetchRole() {
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
        setIsAdmin(true);
      } else if (decodedToken?.isEmployee && decodedToken.isEmployee == true) {
        setIsEmployee(true);
      }
    }
    fetchRole();
  }, []);

  const handleGenerateBill = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://www.nikhilmotors.com/api/bill/generate-bill`,
        { registerNumber: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data && response.data.fileUrl) {
        toast.success("Bill generated successfully!");

        // Open the URL in a new tab
        const newTab = window.open(response.data.fileUrl, "_blank");
        if (newTab) {
          newTab.focus(); // Focus on the new tab
        } else {
          toast.error("Failed to open the bill in a new tab.");
        }
      }
      setLoading(false);
    } catch (error) {
      // Handle the case when the bill already exists (or any error occurs)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Error message from the backend
      } else {
        toast.error("Failed to generate bill.");
      }
      console.error(error);
      setLoading(false);
    }
  };

  const fetchMaintenanceDetails = async () => {
    try {
      console.log("hi+" + id);
      const response = await axios.get("https://www.nikhilmotors.com/api/maintainance", {
        params: { registernumber: id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 201) {
        return;
      }

      const { maintenanceRecords, totalmaintainance } = response.data;

      // Check if maintenanceRecords is an array before setting the state
      if (Array.isArray(maintenanceRecords)) {
        setMaintainanceData((prevData) => ({
          ...prevData,
          maintenanceRecords: maintenanceRecords,
          totalMaintenanceCost: Number(totalmaintainance),
        }));
      } else {
        toast.error("Invalid maintenance records format.");
      }
    } catch (error) {
      console.error("Error fetching maintenance details:", error);
      // toast.error("Failed to fetch maintenance details.");
    }
  };

  useEffect(() => {
    if (id) fetchMaintenanceDetails();
  }, [id]);

  const handleMaintenanceAdded = () => {
    fetchMaintenanceDetails(); // Refresh maintenance records after adding a new one
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row p-5 bg-gray-100 ">
        <div className="flex-1 p-5 bg-white shadow-lg rounded-lg mr-0 lg:mr-2 mb-2 lg:mb-0 ">
          <h2 className="text-2xl font-bold mb-2">Vehicle Details</h2>
          {/* {console.log("efef",vehicleData.buyingPrice)} */}
          {isAdmin === true && (
            <div className="ml-auto mb-4 flex space-x-4">
              <button
                onClick={() =>
                  navigate(`/dashboard/costReport/${id}/addAdminDoc`)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Admin Doc
              </button>
              <button
                onClick={() =>
                  navigate(`/dashboard/costReport/${id}/viewAdminDoc`)
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                View Admin Docs
              </button>
              {soldStatus && (
                <button
                  onClick={handleGenerateBill}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {loading ? "Downloading...." : "Download Bill"}
                </button>
              )}
            </div>
          )}
          {/* Car Details */}
          {/* Car Details and Owner Details */}
          <div className="mb-2 p-4 bg-blue-200 text-blue-800 font-semibold rounded">
            <div className="flex justify-between">
              <div className="w-1/2 pr-2">
                <h2 className="font-bold text-xl">Vehicle Details</h2>
                <p className="break-words">
                  Registration Number: {vehicleData.carDetails.carNo}
                </p>
                <p className="break-words">
                  Vehicle Company: {vehicleData.carDetails.carCompany}
                </p>
                <p className="break-words">
                  Model: {vehicleData.carDetails.model}
                </p>
                {/* <p className="break-words">Type: {vehicleData.carDetails.type}</p>
      <p className="break-words">Fuel Type: {vehicleData.carDetails.fuelType}</p>
      <p className="break-words">Color: {vehicleData.carDetails.color}</p> */}
              </div>
              <div className="w-1/2 pl-2">
                <h4 className="font-bold text-xl">Owner Details</h4>
                <p className="break-words">
                  Owner: {vehicleData.carDetails.ownerName}
                </p>
                <p className="break-words">
                  Phone: {vehicleData.carDetails.ownerPhone}
                </p>
                <p className="break-words">
                  Email: {vehicleData.carDetails.ownerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center mx-auto gap-6">
            {/* First Carousel - Inventory Images */}
            <div className="w-full md:w-1/2">
              {vehicleImages.length !== 0 ? (
                <p className="mb-2">Inventory Images</p>
              ) : (
                <p className="mb-2">Inventory Images Not Available</p>
              )}
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                className="rounded-t-lg"
              >
                {vehicleImages?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Carousel 1 Image ${index + 1}`}
                      className="w-full h-auto rounded-t-lg max-h-[16vh] object-contain"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Second Carousel - OnSite Vehicle Images */}
            <div className="w-full md:w-1/2">
              {onsiteVehicleImages.length !== 0 ? (
                <p className="mb-2">OnSite Vehicle Images</p>
              ) : (
                <p className="mb-2">OnSite Vehicle Images Not Available</p>
              )}
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                className="rounded-t-lg"
              >
                {onsiteVehicleImages?.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`OnSite Vehicle Image ${index + 1}`}
                      className="w-full h-auto rounded-t-lg max-h-[16vh] object-contain"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* Maintenance Records */}
          <h3 className="text-lg font-semibold mt-2 ">Maintenance Records:</h3>
          <div className="overflow-y-auto max-h-40">
            {maintainanceData.maintenanceRecords.length > 0 ? (
              <ul className="mt-2">
                {maintainanceData.maintenanceRecords?.map((record, index) => {
                  return (
                    <li
                      key={index}
                      className="mb-2 p-4 bg-yellow-200 text-yellow-800 rounded flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-black">
                          {index + 1}) {record.description}
                        </p>
                        <p>Cost: ₹{record.price}</p>
                        <p>
                          Date:{" "}
                          {new Date(record.maintainanceDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                        <p>Done By: {record.username}</p>
                        <p>
                          Receipt:{" "}
                          <a
                            href={record.maintainanceReceipt}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Receipt
                          </a>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No maintenance records available.</p>
            )}
          </div>

          {/* Total Maintenance Cost */}

          <div className="mt-4 p-6 bg-yellow-100 border border-yellow-300 text-yellow-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">
              Total Maintenance Cost:{" "}
              <span className="font-semibold">
                ₹{maintainanceData.totalMaintenanceCost}
              </span>
            </h3>

            {isAdmin && (
              <>
                <h3 className="text-xl font-bold mb-2">
                  Buying Price:{" "}
                  {console.log(vehicleData.carDetails)}
                  <span className="font-semibold">₹{vehicleData.carDetails.buyingprice}</span>
                </h3>
                <h3 className="text-xl font-bold">
                  Total:{" "}
                  <span className="font-semibold">
                    ₹
                    {Number(vehicleData.carDetails.buyingprice) +
                      maintainanceData.totalMaintenanceCost}
                  </span>
                </h3>
              </>
            )}

          </div>



          {/* Insurance Commission */}
          {/* <div className="mt-4 p-4 bg-orange-200 text-orange-800 font-semibold rounded">
            <h3 className="text-lg">Insurance Commission: ₹{vehicleData.insuranceCommission}</h3>
          </div> */}

          {/* Net Profit */}
          {/* <div className="mt-4 p-4 bg-green-200 text-green-800 font-semibold rounded">
            <h3 className="text-lg">Net Profit: ₹{netProfit}</h3>
          </div> */}
        </div>

        {/* Form Section */}
        <div className="flex-1 p-5 bg-white shadow-lg rounded-lg">
          {soldStatus === false ? (
            <Maintainance
              registernumber={id}
              isDriver={false}
              isEmployee={isEmployee}
              isAdmin={isAdmin}
              vehicleData={fetchedVehicleData}
              onMaintenanceAdded={handleMaintenanceAdded}
            />
          ) : (
            <Installment carID={id} isAdmin={isAdmin} soldStatus={soldStatus} />
          )}

          {/* <h2 className="text-2xl font-bold mt-6 mb-4">Set Total Amount to be Paid</h2>
          <form onSubmit={handleTotalAmountSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Total Amount</label>
              <input
                type="number"
                value={totalAmountToBePaid} 
                onChange={(e) => setTotalAmountToBePaid(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <button type="submit" className="bg-purple-500 text-white p-2 rounded">
              Set Total Amount
            </button>
          </form> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CostReport;
