import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonthlyAccountDetails = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);  // Default to current month
  const [year, setYear] = useState(new Date().getFullYear());      // Default to current year
  const [monthlyData, setMonthlyData] = useState(null);
  const [totalData, setTotalData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [monthlyProfit, setMonthlyProfit] = useState();
  const [isAdmin, setIsAdmin] = useState();
  useEffect(() => {
    fetchData();
    fetchMonthlyProfit();

  }, [month, year]);

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
      }
    }
    fetchRole();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`https://www.nikhilmotors.com/api/accountDetails/filter`, {
        params: { month, year },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      setMonthlyData(response.data);
      setTotalData(response.data); // Assuming total data is available in the same response
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchMonthlyProfit = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`https://www.nikhilmotors.com/api/profits/monthly`, {
        params: { month, year },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      })
      setMonthlyProfit(response.data.totalProfit);
      setIsFetching(false)
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Left Section (Monthly Data) */}
      <div className="w-full lg:w-1/2 p-5 bg-white shadow-lg rounded-lg overflow-y-auto h-[89vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Data</h2>

        <div className="mb-4">
          <label>Month: </label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index} value={index + 1}>
                {new Date(0, index).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <label className="ml-4">Year: </label>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={new Date().getFullYear() - 5 + index}>
                {new Date().getFullYear() - 5 + index}
              </option>
            ))}
          </select>
        </div>

        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div>
            {/* Monthly Investment Costs Table */}
            <h3 className="font-semibold text-gray-700">Installments Costs</h3>
            <table className="min-w-full table-auto border-collapse text-gray-700">
              <thead>
                <tr>
                  <th className="border p-3 text-left">Registration Number</th>
                  <th className="border p-3 text-left">Amount</th>
                  <th className="border p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData?.installmentCosts?.map((cost, index) => (
                  <tr key={index}>
                    <td className="border p-3">{cost.registernumber}</td>
                    <td className="border p-3">{cost.total_amount}</td>
                    <td className="border p-3">{new Date(cost.installment_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Monthly Sales Table */}
            <h3 className="font-semibold text-gray-700 mt-4">Sales</h3>
            <table className="min-w-full table-auto border-collapse text-gray-700">
              <thead>
                <tr>
                  <th className="border p-3 text-left">Registration Number</th>
                  <th className="border p-3 text-left">Price</th>
                  <th className="border p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData?.monthlySales?.map((sale, index) => (
                  <tr key={index}>
                    <td className="border p-3">{sale.registernumber}</td>
                    <td className="border p-3">{sale.selling_price}</td>
                    <td className="border p-3">{new Date(sale.selldate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Section (Total Data) */}
      <div className="w-full lg:w-1/2 p-5 bg-white shadow-lg rounded-lg overflow-y-auto h-[89vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Total Data for {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}
        </h2>

        {isFetching ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div>
            {/* Total Investment Section */}
            <h3 className="font-semibold text-gray-700 mt-4 border-b pb-2">Total Investment</h3>
            <p className="text-gray-600">
              ₹<span className="font-bold">{totalData?.totalInvestment || 0}</span>
            </p>

            {/* Sales and Commission Section */}
            <h3 className="font-semibold text-gray-700 mt-6 border-b pb-2">Sales & Commission</h3>
            <p className="text-gray-600">
              Sales: ₹<span className="font-bold">{totalData?.totalSales || 0}</span>
            </p>
            <p className="text-gray-600">
              Commission: ₹<span className="font-bold">{totalData?.totalCommission || 0}</span>
            </p>
            <p className="text-gray-600">
              In Hand Amount (Installments + Downpayments): ₹<span className="font-bold">{totalData?.totalInHandAmount || 0}</span>
            </p>
            {isAdmin && <p className="text-gray-600">
              Profit: ₹<span className="font-bold">{monthlyProfit || 0}</span>
            </p>}

            {/* Maintenance and Installments Section */}
            <h3 className="font-semibold text-gray-700 mt-6 border-b pb-2">Maintenance & Installments</h3>
            <p className="text-gray-600">
              Maintenance: ₹<span className="font-bold">{totalData?.totalMaintenance || 0}</span>
            </p>
            <p className="text-gray-600">
              Installments: ₹<span className="font-bold">{totalData?.totalInstallments || 0}</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MonthlyAccountDetails;
