import React, { useState } from 'react';
import { getConfig } from './contexts/config';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    EMPNAME: '',
    EMPID: '',
    ANNUALPAIDLEAVE: '',
    TIME_IN: '',
    TIME_OUT: '',
    ALLOWED_LATE: ''
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
    fetch(`${api.base_url}/Emp_TC`, {
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
    <div class="form-container max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
    <h2 class="form-header text-2xl font-semibold mb-4 flex justify-center">Employee TC</h2>
    <form class="form" onSubmit={handleSubmit}>
        <label class="form-label">
            empName:
            <input
                type="text"
                name="EMPNAME"
                value={formData.EMPNAME}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
            />
        </label>
        <label class="form-label">
            empid:
            <input
                type="text"
                name="EMPID"
                value={formData.EMPID}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
            />
        </label>
        <label class="form-label">
            AnnualPaidLeave:
            <input
                type="number"
                name="ANNUALPAIDLEAVE"
                value={formData.ANNUALPAIDLEAVE}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
            />
        </label>
        <label class="form-label">
            Time_IN:
            <input
                type="text"
                name="TIME_IN"
                value={formData.TIME_IN}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
                placeholder="HH:MM:SS"
            />
        </label>
        <label class="form-label">
            Time_Out:
            <input
                type="text"
                name="TIME_OUT"
                value={formData.TIME_OUT}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
                placeholder="HH:MM:SS"
            />
        </label>
        <label class="form-label">
            Allowed_Late:
            <input
                type="number"
                name="ALLOWED_LATE"
                value={formData.ALLOWED_LATE}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full"
            />
        </label>
        <button type="submit" class="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
</div>

  );
}

export default EmployeeForm;
