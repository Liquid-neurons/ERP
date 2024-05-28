import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../contexts/context';

function ListStatus() {
  const { userEmail } = useUser();
  const [applicationIds, setApplicationIds] = useState([]);



  // Fetch application IDs from backend when component mounts
  useEffect(() => {
    fetchApplicationIds();
  }, []);

  // Function to fetch application IDs from backend
  const fetchApplicationIds = async () => {
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
      setApplicationIds(data);
    } catch (error) {
      console.error('Error fetching application IDs:', error);
      // Optionally, you can handle errors here
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
          {applicationIds.length > 0 ? (
            applicationIds.map(applicationId => (
              <tr key={applicationId}>
                <td className="border px-4 py-2">{applicationId}</td>
                <td className="border px-4 py-2">
                <Link to={`/view-application/${applicationId}`} className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded">
                    View 
                  </Link>
                </td>
                <td className="border px-4 py-2">
               
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan="2">No new applications</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListStatus;
