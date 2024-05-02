import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function SiblingRegister() {
  const navigate = useNavigate();
const { applicationId } = useParams();  
const [formData, setFormData] = useState({
    STUDENTID: applicationId,
    NAME: '',
    CLASS: '',
    AGE: '',
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
    fetch('http://49.206.252.212:5000/sibling-register', {
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
        navigate('/register')
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
    <h2 class="form-header text-2xl font-semibold mb-4 flex justify-center">Sibling registration</h2>
    <form class="form grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
            <h2 class="text-xl font-bold mb-4">Student Details</h2>
            <div class="mb-4">
                <label for="studentid" class="form-label block font-semibold">Student ID :</label>
                <input type="text" name="STUDENTID" id="studentid" value={formData.STUDENTID} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="latefeeperday" class="form-label block font-semibold">Name :</label>
                <input type="text" name="NAME" id="latefeeperday" value={formData.LATEFEEPERDAY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="class" class="form-label block font-semibold">Class :</label>
                <input type="text" name="CLASS" id="class" value={formData.CLASS} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class=" mb-4">
                <label for="cutoff" class="form-label block font-semibold">Age :</label>
                <input type="number" name="AGE" id="cutoff" value={formData.CUTOFFDAY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
        </div>
        <div class="col-span-2 flex justify-center mt-6">
        <button type="submit" class="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded">Submit</button>
      </div>
    </form>
</div>

  );
}

export default SiblingRegister;
