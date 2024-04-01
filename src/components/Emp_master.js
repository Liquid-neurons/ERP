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
    fetch('http://49.206.252.212:5000/Emp_master', {
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
          EMPNAME:
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
          EMPID:
          <input
            type="text"
            name="EMPID"
            value={formData.EMPID}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          DOJ:
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
          MTONGUE:
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
          RELEGION:
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
          CAST:
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
            type="TEXT"
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
            type="TEXT"
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
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
