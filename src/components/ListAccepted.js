import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ListAccepted() {
    const [applications, setApplications] = useState([]);
    const [registrationStatus, setRegistrationStatus] = useState([]);

    // Fetch application IDs and fee registration status from backend when component mounts
    useEffect(() => {
      fetchApplicationIds();
      fetchRegistrationStatus();
    }, []);

    // Function to fetch application IDs from backend
    const fetchApplicationIds = async () => {
      try {
        const response = await fetch('http://49.206.252.212:5000/accepted-ids');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching application IDs:', error);
        // Optionally, you can handle errors here
      }
    };

    // Function to fetch fee registration status from backend
    const fetchRegistrationStatus = async () => {
        try {
            const response = await fetch('http://49.206.252.212:5000/registration-status');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRegistrationStatus(data);
            console.log(registrationStatus);
          } catch (error) {
            console.error('Error fetching registration status:', error);
            // Optionally, you can handle errors here
          }
    };

    // Function to check if fee registration is complete for a given application ID
    const isFeeRegistrationComplete = (applicationId) => {
        // Check if the applicationId is included in the registrationStatus array
        return registrationStatus.includes(applicationId);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-4 flex justify-center">Accepted Applications</h1>
            <table className="table-auto mx-auto">
                <thead>
                <tr>
                    <th className="border px-9 py-2">Application ID</th>
                    <th className="border px-9 py-2">Fee registration</th>
                    <th className="border px-9 py-2">Attendance registration</th>
                    <th className="border px-9 py-2">Sibling registration</th>
                </tr>
                </thead>
                <tbody>
                {applications.length > 0 ? (
                    applications.map(applicationId => (
                    <tr key={applicationId}>
                        <td className="border px-4 py-2">{applicationId}</td>
                        <td className="border px-4 py-2">
                            {isFeeRegistrationComplete(applicationId) ? (
                                <span className="text-green-500">Registered</span>
                            ) : (
                                <Link to={`/fee-register/${applicationId}`} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Register
                                </Link>
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            <Link to={`/student-data/${applicationId}`} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Register
                            </Link>
                        </td>
                        <td className="border px-4 py-2">
                            <Link to={`/student-data/${applicationId}`} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Register
                            </Link>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td className="border px-4 py-2" colSpan="2">No unregistered applications</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default ListAccepted;
