import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fromByteArray } from 'base64-js';


function ViewApplication() {
  const navigate = useNavigate();

  const { applicationId } = useParams(); // Get the application ID from the URL
  const [studentData, setStudentData] = useState(null); // State to store student data
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [data,setData]=useState(null);

  useEffect(() => {
    // Function to fetch student data based on the application ID
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "http://49.206.252.212:5000/student-data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ applicationId }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentData(data[0]);
        console.log(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(error);
        setIsLoading(false);
      }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://49.206.252.212:5000/student-master-desc"
        ); // Assuming your backend server is running on the same host
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };
  
    fetchData(); // Call fetchData when the component mounts

    // Call fetchStudentData when the component mounts and when applicationId changes
    fetchStudentData();
  }, [applicationId]);


  // Display loading message while fetching data
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">
          Student Data for Application ID: {applicationId}
        </h1>
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
  

  const openCertificate = (certificate) => {
    // Decode the base64 string
    const byteArray = new Uint8Array(
      atob(certificate)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    // Create a blob from the byte array
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a URL for the blob and open it in a new tab
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  // Display student data when available
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">
        Student Data for Application ID: {applicationId}
      </h1>
      {studentData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student Information */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-2xl">Student Information</h2>
          <div className="grid grid-cols-1 gap-2">
          <img
            src={`data:image/jpeg;base64,${studentData.IMAGE}`} // Assuming IMAGE field contains JPEG data
            alt="Student Image"
            style={{ maxWidth: '30%', height: 'auto' }}
          />
            <p><span className="font-semibold">{data.NAME}</span> {studentData.NAME}</p>
            <p><span className="font-semibold">{data["BDATE"]}:</span> {studentData.BDATE}</p>
            <p><span className="font-semibold">{data["SEX "]}:</span> {studentData.SEX}</p>
            <p><span className="font-semibold">{data["Mtongue"]}:</span> {studentData.Mtongue}</p>
            <p><span className="font-semibold">{data["Religion"]}:</span> {studentData.Religion}</p>
            <p><span className="font-semibold">{data["caste"]}:</span> {studentData.caste}</p>
            <p><span className="font-semibold">{data["C_AILMENT"]}:</span> {studentData.C_AILMENT}</p>
            <p><span className="font-semibold">{data["C_AILMENT_INFO"]}:</span> {studentData.C_AILMENT_INFO}</p>
            <p><span className="font-semibold">{data["C_INFO "]}:</span> {studentData.C_INFO}</p>
            {/* Add more student information fields here */}
          </div>
        </div>
        
        {/* Parent's Information */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-2xl">Parent's Information</h2>
          <div className="grid grid-cols-1 gap-2">
            <p><span className="font-semibold">{data["F_NAME "]}:</span> {studentData.F_NAME}</p>
            <p><span className="font-semibold">{data["F_OCC"]}:</span> {studentData.F_OCC}</p>
            <p><span className="font-semibold">{data["F_QUALI"]}:</span> {studentData.F_QUALI}</p>
            <p><span className="font-semibold">{data["M_NAME "]}:</span> {studentData.M_NAME}</p>
            <p><span className="font-semibold">{data["M_OCC"]}:</span> {studentData.M_OCC}</p>
            <p><span className="font-semibold">{data["M_QUALI"]}:</span> {studentData.M_QUALI}</p>
            <p><span className="font-semibold">{data["G_NAME "]}:</span> {studentData.G_NAME}</p>
            <p><span className="font-semibold">{data["M_INCOME"]}:</span> {studentData.M_INCOME}</p>
            {/* Add more parent information fields here */}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="border p-4 rounded-lg shadow-md">
          <h2 className="text-2xl">Contact Information</h2>
          <div className="grid grid-cols-1 gap-2">
            <p><span className="font-semibold">{data["P_ADDRESS"]}:</span> {studentData.P_ADDRESS}</p>
            <p><span className="font-semibold">{data["P_PHONE"]}:</span> {studentData.P_PHONE}</p>
            <p><span className="font-semibold">{data["S_PHONE"]}:</span> {studentData.S_PHONE}</p>
            <p><span className="font-semibold">{data["MAIL"]}:</span> {studentData.MAIL}</p>
            {/* Add more contact information fields here */}
          </div>
        </div>
        
       {/* Certificates */}
       <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl">Certificates</h2>
            <p>
              <span className="font-semibold">{data["Cert1"]}:</span>
              <button onClick={() => openCertificate(studentData["Cert1"])}>
                View
              </button>
            </p>
            <p>
              <span className="font-semibold">{data["Cert2"]}:</span>
              <button onClick={() => openCertificate(studentData["Cert2"])}>
                View
              </button>
            </p>
            <p>
              <span className="font-semibold">{data["Cert3"]}:</span>
              <button onClick={() => openCertificate(studentData["Cert3"])}>
                View
              </button>
            </p>
            <p>
              <span className="font-semibold">{data["Cert4"]}:</span>
              <button onClick={() => openCertificate(studentData["Cert4"])}>
                View
              </button>
            </p>
          </div>
      </div>
      ) : (
        <p>No data available for application ID: {applicationId}</p>
      )}
      <br></br>
      <br></br>
    </div>
  );
}

export default ViewApplication;
