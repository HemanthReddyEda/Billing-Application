import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.invoiceId}>
              <td>{report.invoiceId}</td>
              <td>${report.totalAmount}</td>
              <td>${report.paidAmount}</td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
