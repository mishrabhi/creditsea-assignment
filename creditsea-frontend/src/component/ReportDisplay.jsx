import { fetchReports } from "../api";
import { useState, useEffect } from "react";

const ReportDisplay = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await fetchReports();
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    getReports();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        Credit Reports
      </h2>
      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No reports available.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            className="p-6 mb-6 bg-white shadow-lg rounded-lg"
          >
            {/* Basic Details */}
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {report.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <p className="text-gray-600">
                <span className="font-medium">Mobile:</span>{" "}
                {report.mobilePhone}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">PAN:</span> {report.PAN}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Credit Score:</span>{" "}
                {report.creditScore}
              </p>
            </div>

            {/* Report Summary */}
            <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Report Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <p className="text-gray-600">
                  <span className="font-medium">Total Accounts:</span>{" "}
                  {report.reportSummary.totalAccounts}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Active Accounts:</span>{" "}
                  {report.reportSummary.activeAccounts}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Closed Accounts:</span>{" "}
                  {report.reportSummary.closedAccounts}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Current Balance:</span> ₹
                  {report.reportSummary.currentBalance}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Secured Amount:</span> ₹
                  {report.reportSummary.securedAmount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Unsecured Amount:</span> ₹
                  {report.reportSummary.unsecuredAmount}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Last 7 Days Enquiries:</span>{" "}
                  {report.reportSummary.last7DaysEnquiries}
                </p>
              </div>
            </div>

            {/* Credit Accounts */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Credit Accounts
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-3 border">Credit Card</th>
                      <th className="p-3 border">Bank</th>
                      <th className="p-3 border">Account No.</th>
                      <th className="p-3 border">Overdue Amount</th>
                      <th className="p-3 border">Current Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.creditAccounts.map((account, index) => (
                      <tr key={index} className="text-gray-600">
                        <td className="p-3 border">{account.creditCard}</td>
                        <td className="p-3 border">{account.bank}</td>
                        <td className="p-3 border">{account.accountNumber}</td>
                        <td className="p-3 border">₹{account.amountOverDue}</td>
                        <td className="p-3 border">
                          ₹{account.currentBalance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportDisplay;
