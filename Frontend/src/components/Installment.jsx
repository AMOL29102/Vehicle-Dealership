import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Installment({ carID, isAdmin, soldStatus }) {
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [carDetails, setCarDetails] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [error, setError] = useState(null);
  const [viewOption, setViewOption] = useState("view");
  const [loading, setLoading] = useState(true); // Loading state
  const [insuranceDoc, setInsuranceDoc] = useState([]);
  const [soldCarImages, setSoldCarImages] = useState([]);
  const [profit, setProfit] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [accountPaidTo, setAccountPaidTo] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);

  const fetchCarDetails = async () => {
    try {
      console.log("Params : " + carID);
      const response = await axios.get(
        `https://www.nikhilmotors.com/api/dashboard/sold-cars`, // Update to your actual endpoint
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params: { carID },
        }
      );
      setCarDetails(response.data.dbData);
      setInsuranceDoc(response.data.soldCarInsuranceDocs);
      console.log("ithe", response.data);
      setSoldCarImages(response.data.soldCarImages);
    } catch (err) {
      // setError("Error fetching car details");
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const fetchInstallments = async () => {
    if (!carID) return;
    try {
      const response = await axios.get(`https://www.nikhilmotors.com/api/installments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { registernumber: carID },
      });
      setInstallments(response.data);
    } catch (err) {
      // setError("Error fetching installment details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInstallmentSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await axios.post(
        "https://www.nikhilmotors.com/api/installments",
        {
          registernumber: carID,
          amount: installmentAmount,
          installmentdate: installmentDate,
          description: description,
          paymentMode: paymentMode,
          accountPaidTo: accountPaidTo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Installment added successfully");
        setInstallmentAmount("");
        setInstallmentDate("");
        setViewOption("view");
        setDescription("");
        setPaymentMode("");
        setAccountPaidTo("");
        // Optionally fetch installments again
        fetchInstallments();
      }
    } catch (error) {
      toast.error("Failed to add installment. Please try again.");
      console.error(error);
    }
    setUploading(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalInstallmentAmount = installments.reduce(
    (total, inst) => total + parseFloat(inst.amount),
    0
  );

  // if (carID) {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true); // Start loading
  //       try {
  //         await fetchInstallments(); // Fetch installments
  //         // await fetchCarDetails(); // Fetch car details
  //       } catch (err) {
  //         console.error(
  //           "Error fetching data:",
  //           err.response ? err.response.data : err.message
  //         );
  //         setError("Error fetching data");
  //       } finally {
  //         setLoading(false); // End loading
  //       }
  //     };

  //     fetchData();

  //     console.log(insuranceDoc);
  //   }, [carID]);
  // }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // await fetchInstallments();
        if (soldStatus) {
          await fetchCarDetails(); // Fetch car details when soldStatus is true
          await fetchInstallments();
          await fetchProfit();
        }
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carID, soldStatus]);

  const fetchProfit = async () => {
    try {
      const response = await axios.get("https://www.nikhilmotors.com/api/profits", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { registernumber: carID },
      });
      setProfit(response.data.profit);
      console.log(response.data.profit);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (carID) {
  //     fetchProfit();
  //   }
  // }, [carID]);

  function abs(num) {
    return num > 0 ? num : -num;
  }
  return (
    <>
      <div className="bg-white pr-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Sold Vehicle Details</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : carDetails.length > 0 ? (
          carDetails?.map((car) => (
            <div
              key={car.registernumber}
              className="bg-white p-6 rounded-lg mt-[-4%]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Buyer:</span>{" "}
                    {car.owner_name}
                  </p>
                  <p>
                    <span className="font-semibold">Selling Price:</span> ₹
                    {car.selling_price}
                  </p>
                  <p>
                    <span className="font-semibold">Contact No:</span>{" "}
                    {car.contact_no}
                  </p>
                  <p>
                    <span className="font-semibold">Commission:</span> ₹
                    {car.commission}
                  </p>
                  <p>
                    <span className="font-semibold">Down Payment:</span> ₹
                    {car.down_payment}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {car.description}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Mode:</span>{" "}
                    {car.payment_mode}
                  </p>
                  <p>
                    <span className="font-semibold">Account Paid To:</span>{" "}
                    {car.account_paid_to}
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Insurance Document:</span>{" "}
                    {insuranceDoc.length > 0 ? (
                      <button
                        onClick={() =>
                          insuranceDoc.forEach((doc) =>
                            window.open(doc, "_blank", "noopener,noreferrer")
                          )
                        }
                        className="text-blue-500 underline hover:text-blue-700 transition duration-200"
                      >
                        View <i className="ml-2 fas fa-file-alt"></i>
                      </button>
                    ) : (
                      "Not Provided"
                    )}
                  </p>

                  <p>
                    <span className="font-semibold">Sold Vehicle Images:</span>{" "}
                    {soldCarImages.length > 0 ? (
                      <button
                        onClick={() =>
                          soldCarImages.forEach((doc) =>
                            window.open(doc, "_blank", "noopener,noreferrer")
                          )
                        }
                        className="text-blue-500 underline hover:text-blue-700 transition duration-200"
                      >
                        View <i className="ml-2 fas fa-images"></i>
                      </button>
                    ) : (
                      "Not Provided"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No car details available</p>
        )}
      </div>
      {isAdmin == true && (
        <>
          <div className="bg-white p-4 pl-6 mt-2 rounded-lg shadow-lg font-bold">
            Estimated {profit >= 0 ? "Profit" : "Loss"}: ₹{abs(profit)}
          </div>
        </>
      )}
      <div className="mt-6">
        <label className="mr-4">
          <input
            type="radio"
            value="view"
            checked={viewOption === "view"}
            onChange={() => setViewOption("view")}
          />
          <span className="ml-2">View Installments</span>
        </label>
        <label className="ml-6">
          <input
            type="radio"
            value="add"
            checked={viewOption === "add"}
            onChange={() => setViewOption("add")}
          />
          <span className="ml-2">Add Installment</span>
        </label>
      </div>

      {viewOption === "view" && (
        <>
          <div className="bg-white pt-2 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold p-2">Installment Details</h2>
            <div className="max-h-60 overflow-y-auto">
              {installments.length > 0 ? (
                installments?.map((inst, index) => (
                  <div
                    key={index}
                    className="p-4 border-b border-gray-200 mb-4"
                  >
                    {/* Installment Index */}
                    <div className="flex mb-2">
                      <span className="font-medium text-lg mr-2">
                        {index + 1})
                      </span>
                    </div>

                    {/* Amount and Date side by side */}
                    <div className="flex flex-wrap mb-2">
                      <div className="w-full sm:w-1/2 mb-2 sm:mb-0 pr-2">
                        <span className="font-medium min-w-[120px]">
                          Amount :{" "}
                        </span>
                        <span className="break-words">{inst.amount}</span>
                      </div>
                      <div className="w-full sm:w-1/2 mb-2 sm:mb-0 pl-2">
                        <span className="font-medium min-w-[120px]">
                          Date :{" "}
                        </span>
                        <span className="break-words">
                          {formatDate(inst.installment_date)}
                        </span>
                      </div>
                    </div>

                    {/* Payment Mode and Account Paid To side by side */}
                    <div className="flex flex-wrap mb-2">
                      <div className="w-full sm:w-1/2 mb-2 sm:mb-0 pr-2">
                        <span className="font-medium min-w-[120px]">
                          Payment Mode :{" "}
                        </span>
                        <span className="break-words">{inst.payment_mode}</span>
                      </div>
                      <div className="w-full sm:w-1/2 mb-2 sm:mb-0 pl-2">
                        <span className="font-medium min-w-[120px]">
                          Account Paid To :{" "}
                        </span>
                        <span className="break-words">
                          {inst.account_paid_to}
                        </span>
                      </div>
                    </div>

                    {/* Description at the bottom */}
                    <div className="w-full mb-2 sm:mb-0 pr-2">
                      <span className="font-medium min-w-[120px]">
                        Description :{" "}
                      </span>
                      <span className="break-words">{inst.description}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-2">No installments available</p>
              )}
            </div>

            {/* Total Installment Amount */}
            <p className="p-2 text-xl">
              Total Installment Amount: {totalInstallmentAmount.toFixed(2)}
            </p>
          </div>
        </>
      )}

      {viewOption === "add" && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Add Installment</h2>
          <form
            onSubmit={handleInstallmentSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Installment Amount
              </label>
              <input
                type="number"
                value={installmentAmount}
                onChange={(e) => setInstallmentAmount(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
                step="1"
                min="0"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Installment Date
              </label>
              <input
                type="date"
                value={installmentDate}
                onChange={(e) => setInstallmentDate(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            {/* New Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Payment Mode
              </label>
              <input
                type="text"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Account Paid To
              </label>
              <input
                type="text"
                value={accountPaidTo}
                onChange={(e) => setAccountPaidTo(e.target.value)}
                required
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded w-full"
              disabled={uploading}
            >
              {uploading ? "Adding..." : "Add Installment"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
