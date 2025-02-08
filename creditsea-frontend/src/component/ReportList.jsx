import React, { useEffect, useState } from "react";
import { getReports } from "../api";

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports()
      .then((res) => setReports(res.data))
      .catch(() => alert("Error loading reports"));
  }, []);

  return (
    <div>
      <h2>Credit Reports</h2>
      {reports.map((report) => (
        <div key={report._id}>
          <h3>{report.name}</h3>
          <p>Credit Score: {report.creditScore}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
