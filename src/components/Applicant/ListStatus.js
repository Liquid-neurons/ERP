import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../contexts/context';

function ListStatus() {
  const { userEmail } = useUser();
  const [applicationStatus, setApplicationStatus] = useState([]);

  // Fetch application IDs and status codes from backend when component mounts
  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  // Function to fetch application IDs and status codes from backend
  const fetchApplicationStatus = async () => {
    try {
      const UserEmail = userEmail; // Get user's email from the context
      const response = await fetch('http://49.206.252.212:5000/status-application-ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UserEmail }) // Send user's email in the request body
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setApplicationStatus(data);
    } catch (error) {
      console.error('Error fetching application status:', error);
      // Optionally, you can handle errors here
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'text-yellow-500';
      case 'Accepted':
        return 'text-green-500';
      case 'Rejected':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4 flex justify-center">Applications</h1>
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="border px-9 py-2">Application ID</th>
            <th className="border px-9 py-2">Review</th>
            <th className="border px-9 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicationStatus.length > 0 ? (
            applicationStatus.map(({ application_id, status }) => (
              <tr key={application_id}>
                <td className="border px-4 py-2">{application_id}</td>
                <td className="border px-4 py-2">
                  <Link to={`/view-application/${application_id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded">
                    View
                  </Link>
                </td>
                <td className={`border px-4 py-2 ${getStatusColor(status)}`}>{status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="3">No new applications</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListStatus;