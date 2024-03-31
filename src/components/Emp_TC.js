import React, { useState } from 'react';
import './form.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    empName: '',
    empid: '',
    AnnualPaidLeave: '',
    Time_IN: '',
    Time_Out: '',
    Allowed_Late: ''
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
    fetch('http://49.206.252.212:5000/Emp_TC', {
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
      // Optionally, you can perform any additional actions here
    })
    .catch(error => {
      console.error('Error:', error);
      // Optionally, you can handle errors here
    });
  };
  

  return (
    <div className="form-container">
      <h2 className="form-header">Employee Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Employee Name:
          <input
            type="text"
            name="empName"
            value={formData.empName}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Employee ID:
          <input
            type="text"
            name="empid"
            value={formData.empid}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Annual Paid Leave:
          <input
            type="number"
            name="AnnualPaidLeave"
            value={formData.AnnualPaidLeave}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Time In:
          <input
            type="text"
            name="Time_IN"
            value={formData.Time_IN}
            onChange={handleChange}
            className="form-input"
            placeholder="HH:MM:SS"
          />
        </label>
        <br />
        <label className="form-label">
          Time Out:
          <input
            type="text"
            name="Time_Out"
            value={formData.Time_Out}
            onChange={handleChange}
            className="form-input"
            placeholder="HH:MM:SS"
          />
        </label>
        <br />
        <label className="form-label">
          Allowed Late:
          <input
            type="number"
            name="Allowed_Late"
            value={formData.Allowed_Late}
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
