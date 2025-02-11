import React, { useState, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios'; // Add axios import
import SalesReport from './SalesReport'; // Correct import path

const GenerateReports: React.FC = () => {
  const [reportType, setReportType] = useState<string>('daily');
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/reports/generate?type=${reportType}`);
      const reportData = response.data.reportData;

      // Generate report content based on the fetched data
      const reportContent = `Generated ${reportType} report with ${reportData.length} entries.`;
      setGeneratedReport(reportContent);
      console.log(`Generating ${reportType} report`);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handlePrintReport = () => {
    if (reportRef.current) {
      const printContents = reportRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Generate Reports</h2>
      <label className="block font-medium text-gray-700 mb-2">
        Report Type:
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={handleGenerateReport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Generate Report
        </button>
        <button
          type="button"
          onClick={handlePrintReport}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Print Report
        </button>
      </div>
      <div className="mb-4">
        <nav className="bg-gray-100 p-2 rounded-md">
          <ul className="flex space-x-4">
            <li>
              <Link to="/reports/sales" className="text-blue-600 hover:text-blue-800">
                Sales Report
              </Link>
            </li>
            {/* Add more report types here */}
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/sales" element={<SalesReport />} />
          {/* Add more report routes here */}
        </Routes>
      </div>
      <div ref={reportRef} className="mt-6 p-4 border rounded-md">
        <h3 className="text-xl font-semibold mb-2">
          {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
        </h3>
        <p>{generatedReport}</p>
        <p>Compiled by: Ashaba Ronald</p>
        <p>Date: {getCurrentDate()}</p>
      </div>
    </div>
  );
};

export default GenerateReports;