import React, { useState } from 'react';
import './big_form.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
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
    G_NAME: '',
    EDUCATIONAL_QUALIFICATION: '',
    OCCU: '',
    M_INCOME:'',
    C_INFO:'',
    C_AILMENT:'',
    C_AILMENT_INFO:'',
    APPLICATION_ID:''




  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert form data to JSON
    const jsonData = JSON.stringify(formData);

    console.log(formData);
  
    // Send JSON data to backend
    fetch('http://49.206.252.212:5000/STUDENT_MASTER', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      if (data.success) {
        alert('Data entered successfully');
      } else {
        alert('Failed to enter data');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Optionally, you can handle errors here
    });
  };
  

  return (
    <div className="form-container">
      <h2 className="form-header">Employee master</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          NAME:
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
          BDATE:
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
          SEX:
          <input
            type="text"
            name="SEX"
            value={formData.SEX}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Mtongue:
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
          Relegion:
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
          cast:
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
          P_ADDRESS:
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
          P_PHONE:
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
          P_CODE:
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
          DISTANCE:
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
          S_PHONE:
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
          S_CODE:
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
          MAIL:
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
          F_NAME:
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
          M_NAME:
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
          G_NAME:
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
          EDUCATIONAL_QUALIFICATION:
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
          OCCU:
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
          M_INCOME:
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
          C_INFO:
          <input
            type="text"
            name="C_INFO"
            value={formData.C_INFO}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          C_AILMENT:
          <input
            type="text"
            name="C_AILMENT"
            value={formData.C_AILMENT}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          C_AILMENT_INFO:
          <input
            type="text"
            name="C_AILMENT_INFO"
            value={formData.C_AILMENT_INFO}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          APPLICATION_ID:
          <input
            type="text"
            name="APPLICATION_ID"
            value={formData.APPLICATION_ID}
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
