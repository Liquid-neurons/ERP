import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StudentData() {
  const { applicationId } = useParams(); // Get the application ID from the URL
  const [studentData, setStudentData] = useState(null); // State to store student data
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Function to fetch student data based on the application ID
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://49.206.252.212:5000/student-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ applicationId })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentData(data[0]); // Access the first object in the array
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    // Call fetchStudentData when the component mounts and when applicationId changes
    fetchStudentData();
  }, [applicationId]);

  // Display loading message while fetching data
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Student Data for Application ID: {applicationId}</h1>
        <p>Loading...</p>
      </div>
    );
  }

  // Display error message if an error occurred
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  const handleAccept = async () => {
    try {
      const response = await fetch('http://49.206.252.212:5000/status-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'accept' , applicationid: applicationId })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Handle response data here
      alert('Status updated');
    } catch (error) {
      console.error('Error accepting:', error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch('http://49.206.252.212:5000/status-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'reject' , applicationid: applicationId })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data); // Handle response data here
      alert('Status updated');
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  // Display student data when available
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Student Data for Application ID: {applicationId}</h1>
      {studentData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Render your data here */}
          <div className="border p-4 rounded-lg shadow-md">
            <p className="text-2xl">Personal Information</p>
            <div className="grid grid-cols-1 gap-2">
                <br></br>
              <p><span className="font-semibold">Name:</span> {studentData.NAME}</p>
              <p><span className="font-semibold">Date of Birth:</span> {studentData.BDATE}</p>
              <p><span className="font-semibold">Gender:</span> {studentData.SEX}</p>
              <p><span className="font-semibold">Mother Tongue:</span> {studentData.Mtongue}</p>
              <p><span className="font-semibold">Religion:</span> {studentData.Religion}</p>
              <p><span className="font-semibold">Cast:</span> {studentData.cast}</p>
              <p><span className="font-semibold">Father's Name:</span> {studentData.F_NAME}</p>
              <p><span className="font-semibold">Mother's Name:</span> {studentData.M_NAME}</p>
              <p><span className="font-semibold">Guardian's Name:</span> {studentData.G_NAME}</p>
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <p className="text-2xl">Contact Information</p>
            <br></br>
            <div className="grid grid-cols-1 gap-2">
              <p><span className="font-semibold">Primary Address:</span> {studentData.P_ADDRESS}</p>
              <p><span className="font-semibold">Primary Phone:</span> {studentData.P_PHONE}</p>
              <p><span className="font-semibold">Primary Phone Country Code:</span> +{studentData.P_CODE}</p>
              <p><span className="font-semibold">Monthly Income:</span> {studentData.M_INCOME}</p>
              <p><span className="font-semibold">Secondary Phone:</span> {studentData.S_PHONE}</p>
              <p><span className="font-semibold">Secondary Phone Country Code:</span> +{studentData.S_CODE}</p>
              <p><span className="font-semibold">Email:</span> {studentData.MAIL}</p>
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md col-span-2">
            <h2 className="text-2xl">Additional Information</h2>
            <br></br>
            <div className="grid grid-cols-1 gap-2">
              <p><span className="font-semibold">Parent's Educational Qualification:</span> {studentData.EDUCATIONAL_QUALIFICATION}</p>
              <p><span className="font-semibold">Parent's Occupation:</span> {studentData.OCCU}</p>
              <p><span className="font-semibold">Student Ailment:</span> {studentData.C_AILMENT}</p>
              <p><span className="font-semibold">Ailment Details:</span> {studentData.C_AILMENT_INFO}</p>
              <p><span className="font-semibold">Any Other Details:</span> {studentData.C_INFO}</p>
              <p><span className="font-semibold">Distance:</span> {studentData.DISTANCE}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available for application ID: {applicationId}</p>
      )}
      <br></br>
      <br></br>
        <div className='flex justify-center'>
        <div className='px-5'>
        <button onClick={handleAccept} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded'>Accept</button>
        </div>
        <button onClick={handleReject} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded'>Reject</button>
        </div>
    </div>
  );
}

export default StudentData;
