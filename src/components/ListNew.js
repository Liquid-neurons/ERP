import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ListNew() {
  const [applicationIds, setApplicationIds] = useState([]);

  // Fetch application IDs from backend when component mounts
  useEffect(() => {
    fetchApplicationIds();
  }, []);

  // Function to fetch application IDs from backend
  const fetchApplicationIds = async () => {
    try {
      const response = await fetch('http://49.206.252.212:5000/application-ids');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApplicationIds(data);
    } catch (error) {
      console.error('Error fetching application IDs:', error);
      // Optionally, you can handle errors here
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4 flex justify-center">New Applications</h1>
      <table className="table-auto mx-auto">
        <thead>
          <tr>
            <th className="border px-9 py-2">Application ID</th>
            <th className="border px-9 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicationIds.length > 0 ? (
            applicationIds.map(applicationId => (
              <tr key={applicationId}>
                <td className="border px-4 py-2">{applicationId}</td>
                <td className="border px-4 py-2">
                <Link to={`/student-data/${applicationId}`} className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Review 
                  </Link>
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

export default ListNew;
