import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

function FeeRegister() {
  const navigate = useNavigate();
const { applicationId } = useParams();  
const [formData, setFormData] = useState({
    INSTITUTE: '',
    STUDENTID: applicationId,
    SESSION: '',
    CLASS: '',
    JUNE: '',
    JULY: '',
    AUGUST: '',
    SEPTEMBER: '',
    OCTOBER: '',
    NOVEMBER: '',
    DECEMBER: '',
    JANUARY: '',
    FEBRUARY: '',
    MARCH: '',
    LATEFEEPERDAY:'',
    LATEFEEAPPLICABLE: '',
    CUTOFFDAY: '',
    CHATID: '',
    R_FEE:'',
    REMARK:'',
    S_FEE:'',
    B_FEE:'',
    U_FEE:'',
    R_DATE:'',
    A_DATE:'',
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
    fetch('http://49.206.252.212:5000/fee-register', {
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
    <h2 class="form-header text-2xl font-semibold mb-4 flex justify-center">Fee registration</h2>
    <form class="form grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
            <h2 class="text-xl font-bold mb-4">Student Details</h2>
            <div class="mb-4">
                <label for="institute" class="form-label block font-semibold">Institute* :</label>
                <select name="INSTITUTE" id="institute" value={formData.INSTITUTE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full">
                    <option value="LMS">LMS</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="studentid" class="form-label block font-semibold">Student ID* :</label>
                <input type="text" name="STUDENTID" id="studentid" value={formData.STUDENTID} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">Session* :</label>
                <input type="text" name="SESSION" id="session" value={formData.SESSION} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="class" class="form-label block font-semibold">Class* :</label>
                <input type="text" name="CLASS" id="class" value={formData.CLASS} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="latefee" class="form-label block font-semibold">Applicable for late fee :</label>
                <select name="LATEFEE" id="LATEFEEAPPLICABLE" value={formData.LATEFEEAPPLICABLE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full">
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="latefeeperday" class="form-label block font-semibold">Late fee per day :</label>
                <input type="text" name="LATEFEEPERDAY" id="latefeeperday" value={formData.LATEFEEPERDAY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="cutoff" class="form-label block font-semibold">Cut off day :</label>
                <input type="text" name="CUTOFFDAY" id="cutoff" value={formData.CUTOFFDAY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="chatid" class="form-label block font-semibold">Chat ID :</label>
                <input type="text" name="CHATID" id="chatid" value={formData.CHATID} onChange={handleChange} class="form-input border rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="R_FEE" class="form-label block font-semibold">R_FEE* :</label>
                <input type="text" name="R_FEE" id="R_FEE" value={formData.R_FEE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="remark" class="form-label block font-semibold">Remark* :</label>
                <input type="text" name="REMARK" id="session" value={formData.REMARK} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="S_FEE" class="form-label block font-semibold">S_FEE* :</label>
                <input type="text" name="S_FEE" id="S_FEE" value={formData.S_FEE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="U_FEE" class="form-label block font-semibold">U_FEE* :</label>
                <input type="text" name="U_FEE" id="U_FEE" value={formData.U_FEE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="B_FEE" class="form-label block font-semibold">B_FEE* :</label>
                <input type="text" name="B_FEE" id="B_FEE" value={formData.B_FEE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="R_DATE" class="form-label block font-semibold">R_DATE* :</label>
                <input type="date" name="R_DATE" id="R_DATE" value={formData.R_DATE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="A_DATE" class="form-label block font-semibold">A_DATE* :</label>
                <input type="date" name="A_DATE" id="A_DATE" value={formData.A_DATE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
        </div>
        <div>
            <h2 class="text-xl font-bold mb-4">Month wise</h2>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">June :</label>
                <input type="text" name="JUNE" id="session" value={formData.JUNE} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">July :</label>
                <input type="text" name="JULY" id="session" value={formData.JULY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">August :</label>
                <input type="text" name="AUGUST" id="session" value={formData.AUGUST} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">September :</label>
                <input type="text" name="SEPTEMBER" id="session" value={formData.SEPTEMBER} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">October :</label>
                <input type="text" name="OCTOBER" id="session" value={formData.OCTOBER} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">November :</label>
                <input type="text" name="NOVEMBER" id="session" value={formData.NOVEMBER} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">December :</label>
                <input type="text" name="DECEMBER" id="session" value={formData.DECEMBER} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">January :</label>
                <input type="text" name="JANUARY" id="session" value={formData.JANUARY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">February :</label>
                <input type="text" name="FEBRUARY" id="session" value={formData.FEBRUARY} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
            <div class="mb-4">
                <label for="session" class="form-label block font-semibold">March :</label>
                <input type="text" name="MARCH" id="session" value={formData.MARCH} onChange={handleChange} class="form-input border  rounded-md px-3 py-2 mt-1 mb-5 w-full" />
            </div>
        </div>
        <div class="col-span-2 flex justify-center mt-6">
        <button type="submit" class="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-12 rounded">Submit</button>
      </div>
    </form>
</div>

  );
}

export default FeeRegister;
