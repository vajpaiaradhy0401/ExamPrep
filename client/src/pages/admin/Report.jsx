import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Report = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/exams/report');
      setData(res.data);
    } catch (er) {
      alert("Sorry Fetching reports");
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  const handlePrint = (item) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #000; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Exam Report</h2>
          <table>
            <tr><th>Exam Name</th><td>${item.examTiltle}</td></tr>
            <tr><th>Examinee</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.Status}</td></tr>
            <tr><th>Date of Exam</th><td>${item.attemptedAt}</td></tr>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary">Examinee List</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>S.No.</th>
              <th>Exam Name</th>
              <th>Examinee</th>
              <th>Examinee Email</th>
              <th>Total marks</th>
              <th>Passing marks</th>
              <th>Score</th>
              <th>Status</th>
              <th>DOE</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.examTiltle}</td>
                <td>{item.examineeName}</td>
                <td>{item.examineeEmail}</td>
                <td>{item.totalMarks}</td>
                <td>{item.passingMarks}</td>
                <td>{item.score}</td>
                <td>{item.Status}</td>
                <td>{item.attemptedAt}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handlePrint(item)}
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
