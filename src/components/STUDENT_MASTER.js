import React, { useState } from "react";
import "./big_form.css";

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
    <div className="form-container">
      <h2 className="form-header">Employee master</h2>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Student details</h2>
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
          Name* :
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
          Primary Phone* :
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
            type="text"
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
            type="text"
            name="DISTANCE"
            value={formData.DISTANCE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Secondary phone :
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
          Secondary country code :
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
            Does the child have any major ailment/allergy?* :
            <select
              name="C_AILMENT"
              value={formData.C_AILMENT}
              onChange={handleChange}
              className="form-input"
            >
              <option value="N">No</option>
              <option value="Y">Yes</option>
            </select>
          </label>
        <br />
        <label className="form-label">
          Ailment/allergy details :
          <input
            type="text"
            name="C_AILMENT_INFO"
            value={formData.C_AILMENT_INFO}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <h2>Parent details</h2>
        <br></br>
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
          Guardian's name :
          <input
            type="text"
            name="G_NAME"
            value={formData.G_NAME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Highest educational qualification of parents :
          <input
            type="text"
            name="EDUCATIONAL_QUALIFICATION"
            value={formData.EDUCATIONAL_QUALIFICATION}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Occupation :
          <input
            type="text"
            name="OCCU"
            value={formData.OCCU}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Monthly income :
          <input
            type="text"
            name="M_INCOME"
            value={formData.M_INCOME}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Any other details to be shared :
          <input
            type="text"
            name="C_INFO"
            value={formData.C_INFO}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <br></br>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
