import React, { useState } from 'react';
import { getConfig } from './contexts/config';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    TCID: '',
    TCDESC: '',
  });

  const {api}=getConfig();

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
    fetch(`${api.base_url}/Emp_TC_OPT`, {
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
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Optionally, you can handle errors here
    });
  };

  return (
    <div className="form-container max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="form-header text-2xl font-semibold mb-4 flex justify-center">Employee TC OPT</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          TC_ID:
          <input
            type="text"
            name="TCID"
            value={formData.TCID}
            onChange={handleChange}
            className="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
          />
        </label>
        <label className="form-label">
          TC_DESC:
          <input
            type="text"
            name="TCDESC"
            value={formData.TCDESC}
            onChange={handleChange}
            className="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
          />
        </label>
        <button type="submit" className="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
