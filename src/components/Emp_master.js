import React, { useState } from 'react';
import './big_form.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    EMPNAME: '',
    EMPID: '',
    DOJ: '',
    NAME: '',
    BDATE: '',
    SEX: '',
    MTONGUE: '',
    RELEGION: '',
    CAST: '',
    P_ADDRESS: '',
    P_PHONE: '',
    P_CODE: '',
    DISTANCE: '',
    S_PHONE: '',
    S_CODE: '',
    MAIL: '',
    F_NAME: '',
    M_NAME: '',
    EDUCATIONAL_QUALIFICATION:''
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
              alert("Failed to enter data");
            }
          })
          .catch((error) => {
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
            alert("Failed to enter data");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Optionally, you can handle errors here
        });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Employee master</h2>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Employee details</h2>
        <br></br>
        <label className="form-label">
          Photo* :
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Name of employee* :
          <input
            type="text"
            name="EMPNAME"
            value={formData.EMPNAME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Date of joining* :
          <input
            type="date"
            name="DOJ"
            value={formData.DOJ}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Name of the child* :
          <input
            type="text"
            name="NAME"
            value={formData.NAME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Date of birth* :
          <input
            type="date"
            name="BDATE"
            value={formData.BDATE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
            Gender* :
            <select
              name="SEX"
              value={formData.SEX}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>
        <br />
        <label className="form-label">
          Mother tongue* :
          <input
            type="text"
            name="MTONGUE"
            value={formData.MTONGUE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Relegion :
          <input
            type="text"
            name="RELEGION"
            value={formData.RELEGION}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Cast :
          <input
            type="text"
            name="CAST"
            value={formData.CAST}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Primary address* :
          <input
            type="text"
            name="P_ADDRESS"
            value={formData.P_ADDRESS}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Primary phone* :
          <input
            type="text"
            name="P_PHONE"
            value={formData.P_PHONE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Primary country code* :
          <input
            type="TEXT"
            name="P_CODE"
            value={formData.P_CODE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Distance :
          <input
            type="TEXT"
            name="DISTANCE"
            value={formData.DISTANCE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Secondary phone* :
          <input
            type="text"
            name="S_PHONE"
            value={formData.S_PHONE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Secondary code* :
          <input
            type="text"
            name="S_CODE"
            value={formData.S_CODE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Email* :
          <input
            type="email"
            name="MAIL"
            value={formData.MAIL}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Father's name* :
          <input
            type="text"
            name="F_NAME"
            value={formData.F_NAME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Mother's name* :
          <input
            type="text"
            name="M_NAME"
            value={formData.M_NAME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Highest educational qualification :
          <input
            type="text"
            name="EDUCATIONAL_QUALIFICATION"
            value={formData.EDUCATIONAL_QUALIFICATION}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <h2>For testing</h2>
        <br></br>
        <label className="form-label">
          EMPID : (To be generated automatically) 
          <input
            type="text"
            name="EMPID"
            value={formData.EMPID}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
