import React, { useState } from 'react';
import './form.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    TcId: '',
    TcDesc: '',
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
    fetch('http://49.206.252.212:5000/Emp_TC_OPT', {
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
          TC Id:
          <input
            type="text"
            name="TcId"
            value={formData.TcId}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          TC desc:
          <input
            type="text"
            name="TcDesc"
            value={formData.TcDesc}
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
