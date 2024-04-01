import React, { useState } from 'react';
import './form.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    EMPNAME: '',
    EMPID: '',
    ANNUALPAIDLEAVE: '',
    TIME_IN: '',
    TIME_OUT: '',
    ALLOWED_LATE: ''
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
      <h2 className="form-header">Employee Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          empName:
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
          empid:
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
          AnnualPaidLeave:
          <input
            type="number"
            name="ANNUALPAIDLEAVE"
            value={formData.ANNUALPAIDLEAVE}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Time_IN:
          <input
            type="text"
            name="TIME_IN"
            value={formData.TIME_IN}
            onChange={handleChange}
            className="form-input"
            placeholder="HH:MM:SS"
          />
        </label>
        <br />
        <label className="form-label">
          Time_Out:
          <input
            type="text"
            name="TIME_OUT"
            value={formData.TIME_OUT}
            onChange={handleChange}
            className="form-input"
            placeholder="HH:MM:SS"
          />
        </label>
        <br />
        <label className="form-label">
          Allowed_Late:
          <input
            type="number"
            name="ALLOWED_LATE"
            value={formData.ALLOWED_LATE}
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
