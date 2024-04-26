import React, { useState } from "react";
import Navbar from "./navbar";

function EmployeeForm() {
  
  const [formData, setFormData] = useState({
    NAME: "",
    BDATE: "",
    SEX: "",
    MTONGUE: "",
    RELEGION: "",
    CAST: "",
    P_ADDRESS: "",
    P_PHONE: "",
    P_CODE: "",
    DISTANCE: "",
    S_PHONE: "",
    S_CODE: "",
    MAIL: "",
    F_NAME: "",
    M_NAME: "",
    G_NAME: "",
    EDUCATIONAL_QUALIFICATION: "",
    OCCU: "",
    M_INCOME: "",
    C_INFO: "",
    C_AILMENT: "",
    C_AILMENT_INFO: "",
    APPLICATION_ID: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to JSON
    const jsonData = { ...formData }; // Copy existing form data
    const reader = new FileReader();

    if (file) {
      // If an image file is selected
      reader.readAsDataURL(file); // Read the file as base64

      reader.onload = () => {
        // When file reading is complete
        const base64URL = reader.result; // Get the base64 URL
        jsonData.imageBase64 = base64URL; // Add base64 URL to the form data
        console.log(jsonData);

        // Send JSON data to backend
        fetch("http://49.206.252.212:5000/STUDENT_MASTER", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success:", data);
            if (data.success) {
              alert("Data entered successfully");
            } else {
              alert(data.message);
            }
          })
          .catch((error) => {
            alert(error.message)
            console.error("Error:", error);
            // Optionally, you can handle errors here
          });
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
      };
    } else {
      // If no image file is selected, send only the form data
      fetch("http://49.206.252.212:5000/STUDENT_MASTER", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          if (data.success) {
            alert("Data entered successfully");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          alert(error.message)
          console.error("Error:", error);
          // Optionally, you can handle errors here
        });
    }
  };

  return (
    <div class="form-container max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
    <h2 class="form-header text-2xl font-semibold mb-4 flex justify-center">Employee Master</h2>
    <form class="form grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div>
        <h2 class="text-xl font-bold mb-4">Student Details</h2>
        <div class="mb-4">
          <label for="image" class="form-label block font-semibold">Photo* :</label>
          <input type="file" name="image" id="image" onChange={handleFileChange} class="form-input" />
        </div>
        <div class="mb-4">
          <label for="name" class="form-label block font-semibold">Name* :</label>
          <input type="text" name="NAME" id="name" value={formData.NAME} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="dateOfBirth" class="form-label block font-semibold">Date of Birth* :</label>
          <input type="date" name="BDATE" id="dateOfBirth" value={formData.BDATE} onChange={handleChange} class="form-input px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="gender" class="form-label block font-semibold">Gender* :</label>
          <select name="SEX" id="gender" value={formData.SEX} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full">
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="motherTongue" class="form-label block font-semibold">Mother Tongue* :</label>
          <input type="text" name="MTONGUE" id="motherTongue" value={formData.MTONGUE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="religion" class="form-label block font-semibold">Religion :</label>
          <input type="text" name="RELEGION" id="religion" value={formData.RELEGION} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="cast" class="form-label block font-semibold">Cast :</label>
          <input type="text" name="CAST" id="cast" value={formData.CAST} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="primaryAddress" class="form-label block font-semibold">Primary Address* :</label>
          <input type="text" name="P_ADDRESS" id="primaryAddress" value={formData.P_ADDRESS} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="primaryPhone" class="form-label block font-semibold">Primary Phone* :</label>
          <input type="text" name="P_PHONE" id="primaryPhone" value={formData.P_PHONE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="primaryCountryCode" class="form-label block font-semibold">Primary Country Code* :</label>
          <input type="text" name="P_CODE" id="primaryCountryCode" value={formData.P_CODE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="distance" class="form-label block font-semibold">Distance :</label>
          <input type="text" name="DISTANCE" id="distance" value={formData.DISTANCE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Additional Details</h2>
        <div class="mb-4">
          <label for="secondaryPhone" class="form-label block font-semibold">Secondary Phone :</label>
          <input type="text" name="S_PHONE" id="secondaryPhone" value={formData.S_PHONE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="secondaryCountryCode" class="form-label block font-semibold">Secondary Country Code :</label>
          <input type="text" name="S_CODE" id="secondaryCountryCode" value={formData.S_CODE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="email" class="form-label block font-semibold">Email* :</label>
          <input type="email" name="MAIL" id="email" value={formData.MAIL} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="ailment" class="form-label block font-semibold">Does the child have any major ailment/allergy?* :</label>
          <select name="C_AILMENT" id="ailment" value={formData.C_AILMENT} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full">
            <option value="N">No</option>
            <option value="Y">Yes</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="ailmentDetails" class="form-label block font-semibold">Ailment/Allergy Details :</label>
          <input type="text" name="C_AILMENT_INFO" id="ailmentDetails" value={formData.C_AILMENT_INFO} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-4">Parent Details</h2>
        <div class="mb-4">
          <label for="fatherName" class="form-label block font-semibold">Father's Name* :</label>
          <input type="text" name="F_NAME" id="fatherName" value={formData.F_NAME} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="motherName" class="form-label block font-semibold">Mother's Name* :</label>
          <input type="text" name="M_NAME" id="motherName" value={formData.M_NAME} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="guardianName" class="form-label block font-semibold">Guardian's Name :</label>
          <input type="text" name="G_NAME" id="guardianName" value={formData.G_NAME} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="parentEducation" class="form-label block font-semibold">Highest Educational Qualification of Parents :</label>
          <input type="text" name="EDUCATIONAL_QUALIFICATION" id="parentEducation" value={formData.EDUCATIONAL_QUALIFICATION} onChange={handleChange} class="form-input border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="occupation" class="form-label block font-semibold">Occupation :</label>
          <input type="text" name="OCCU" id="occupation" value={formData.OCCU} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="monthlyIncome" class="form-label block font-semibold">Monthly Income :</label>
          <input type="text" name="M_INCOME" id="monthlyIncome" value={formData.M_INCOME} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
        <div class="mb-4">
          <label for="otherDetails" class="form-label block font-semibold">Any Other Details to be Shared :</label>
          <input type="text" name="C_INFO" id="otherDetails" value={formData.C_INFO} onChange={handleChange} class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full" />
        </div>
      </div>
      <div class="col-span-2 flex justify-center mt-6">
        <button type="submit" class="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded px-3 py-2 mt-1 mb-5 w-full">Submit</button>
      </div>
    </form>
  </div>
  
  
  );
}

export default EmployeeForm;

