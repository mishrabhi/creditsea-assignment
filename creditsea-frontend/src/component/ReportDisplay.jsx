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
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-3">Credit Reports</h2>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            className="p-4 mb-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="text-lg font-semibold">{report.name}</h3>
            <p>Credit Score: {report.creditScore}</p>
            <p>Total Accounts: {report.reportSummary.totalAccounts}</p>
            <p>Active Accounts: {report.reportSummary.activeAccounts}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportDisplay;
