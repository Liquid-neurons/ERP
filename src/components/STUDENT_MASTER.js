import React, { useState, useEffect } from "react";
import { PDFDocumentProxy } from 'pdfjs-dist';

function StudentForm() {
  const [data, setData] = useState({});

  useEffect(() => {
    // Define a function to fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://49.206.252.212:5000/student-master-desc"
        ); // Assuming your backend server is running on the same host
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Clean up function (optional)
    return () => {
      // Perform any necessary cleanup here
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  const [formData, setFormData] = useState({
    name: "",
    bdate: "",
    sex: "",
    mtongue: "",
    religion: "",
    caste: "",
    p_address: "",
    p_phone: "",
    distance: "",
    s_phone: "",
    mail: "",
    f_name: "",
    f_quali: "",
    f_occ: "",
    m_name: "",
    m_quali: "",
    m_occ: "",
    g_name:"",
    m_income: "",
    c_info: "",
    c_ailment: "",
    c_ailment_info: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);



const handleFileChange1 = (e) => {
  const file = e.target.files[0];
  setFile1(file);
};

const handleFileChange2 = (e) => {
  const file = e.target.files[0];
  setFile2(file);
};

const handleFileChange3 = (e) => {
  const file = e.target.files[0];
  setFile3(file);
};

const handleFileChange4 = (e) => {
  const file = e.target.files[0];
  setFile4(file);
};

const handleFileChange5 = (e) => {
  const file = e.target.files[0];
  setFile5(file);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create an object to hold the form data
    const formDataToSend = {
      ...formData, // Include regular form data properties
      files: {
        file1: await fileToBase64(file1),
        file2: await fileToBase64(file2),
        file3: await fileToBase64(file3),
        file4: await fileToBase64(file4),
        file5: await fileToBase64(file5)
      }
    };

    console.log(formDataToSend);
    // Send the form data and files separately
    const formDataResponse = await fetch("http://49.206.252.212:5000/STUDENT_MASTER", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataToSend)
    });

    if (!formDataResponse.ok) {
      throw new Error("Network response for form data was not ok");
    }

    const formDataData = await formDataResponse.json();
    console.log("Success:", formDataData);
    if (formDataData.success) {
      alert("Data entered successfully");
    } else {
      alert("Data entry failed");
    }
  } catch (error) {
    alert(error.message);
    console.error("Error:", error);
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 flex justify-center">
        Student Application Form
      </h1>
      <form className="grid grid-cols-3 gap-2" onSubmit={handleSubmit}>
        <div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.IMAGE}* :
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange1}
                className="form-input"
              />
            </div>
            <div class="mb-2">
              <label for="name" class="form-label block font-semibold">
                {data.NAME}* :
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                class="form-input border  rounded-md px-1 py-1 mt-1 mb-1 "
              />
            </div>
            <div class="mb-2">
              <label for="dateOfBirth" class="form-label block font-semibold">
                {data.BDATE}* :
              </label>
              <input
                type="date"
                name="bdate"
                id="bdate"
                value={formData.bdate}
                onChange={handleChange}
                class="form-input px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="gender" class="form-label block font-semibold">
                {data["SEX "]}* :
              </label>
              <select
                name="sex"
                id="sex"
                value={formData.sex}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div class="mb-2">
              <label for="motherTongue" class="form-label block font-semibold">
                {data.Mtongue}* :
              </label>
              <input
                type="text"
                name="mtongue"
                id="mtongue"
                value={formData.mtongue}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="religion" class="form-label block font-semibold">
                {data.Religion} :
              </label>
              <input
                type="text"
                name="religion"
                id="religion"
                value={formData.religion}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="cast" class="form-label block font-semibold">
                {data.caste} :
              </label>
              <input
                type="text"
                name="caste"
                id="caste"
                value={formData.caste}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label
                for="primaryAddress"
                class="form-label block font-semibold"
              >
                {data.P_ADDRESS}* :
              </label>
              <textarea
                name="p_address"
                id="p_address"
                value={formData.p_address}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-1 mt-1 mb-1 h-40 w-3/4"
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="primaryPhone" class="form-label block font-semibold">
                {data.P_PHONE}* :
              </label>
              <input
                type="text"
                name="p_phone"
                id="p_phone"
                value={formData.p_phone}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="distance" class="form-label block font-semibold">
                {data.DISTANCE} :
              </label>
              <input
                type="text"
                name="distance"
                id="distance"
                value={formData.distance}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1 "
              />
            </div>
          </div>
        </div>
        <div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Parent Details</h2>
            <div className="mb-2">
              <label
                htmlFor="fatherName"
                className="form-label block font-semibold"
              >
                {data["F_NAME "]}* :
              </label>
              <input
                type="text"
                name="f_name"
                id="f_name"
                value={formData.f_name}
                onChange={handleChange}
                className="form-input border rounded-md"
              />
            </div>
            <div class="mb-2">
              <label
                for="parentEducation"
                class="form-label block font-semibold"
              >
                {data.F_QUALI} :
              </label>
              <input
                type="text"
                name="f_quali"
                id="f_quali"
                value={formData.f_quali}
                onChange={handleChange}
                class="form-input border rounded-md"
              />
            </div>
            <div class="mb-2">
              <label
                for="parentEducation"
                class="form-label block font-semibold"
              >
                {data.F_OCC} :
              </label>
              <input
                type="text"
                name="f_occ"
                id="f_occ"
                value={formData.f_occ}
                onChange={handleChange}
                class="form-input border rounded-md"
              />
            </div>
            <div class="mb-2">
              <label for="motherName" class="form-label block font-semibold">
                {data["M_NAME "]}* :
              </label>
              <input
                type="text"
                name="m_name"
                id="m_name"
                value={formData.m_name}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="motherName" class="form-label block font-semibold">
                {data.M_QUALI}* :
              </label>
              <input
                type="text"
                name="m_quali"
                id="m_quali"
                value={formData.m_quali}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="motherName" class="form-label block font-semibold">
                {data.M_OCC}* :
              </label>
              <input
                type="text"
                name="m_occ"
                id="m_occ"
                value={formData.m_occ}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="guardianName" class="form-label block font-semibold">
                {data["G_NAME "]} :
              </label>
              <input
                type="text"
                name="g_name"
                id="g_name"
                value={formData.g_name}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="monthlyIncome" class="form-label block font-semibold">
                {data.M_INCOME} :
              </label>
              <input
                type="text"
                name="m_income"
                id="m_income"
                value={formData.m_income}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="col-span-3 flex justify-center mt-14">
            <button
              type="submit"
              className="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 rounded flex"
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Additional Details</h2>
            <div className="mb-2">
              <label
                htmlFor="secondaryPhone"
                className="form-label block font-semibold"
              >
                {data.S_PHONE}:
              </label>
              <input
                type="text"
                name="s_phone"
                id="s_phone"
                value={formData.s_phone}
                onChange={handleChange}
                className="form-input border rounded-md"
              />
            </div>
            <div class="mb-2">
              <label for="email" class="form-label block font-semibold">
                {data.MAIL}* :
              </label>
              <input
                type="email"
                name="mail"
                id="mail"
                value={formData.mail}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label for="ailment" class="form-label block font-semibold">
                {data.C_AILMENT}?* :
              </label>
              <select
                name="c_ailment"
                id="c_ailment"
                value={formData.c_ailment}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              >
                <option value="N">No</option>
                <option value="Y">Yes</option>
              </select>
            </div>
            <div class="mb-2">
              <label
                for="ailmentDetails"
                class="form-label block font-semibold"
              >
                {data.C_AILMENT_INFO} :
              </label>
              <input
                type="text"
                name="c_ailment_info"
                id="c_ailment_info"
                value={formData.c_ailment_info}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
            </div>
            <div class="mb-2">
              <label
                for="ailmentDetails"
                class="form-label block font-semibold"
              >
                {data["C_INFO "]} :
              </label>
              <textarea
                name="c_info"
                id="c_info"
                value={formData.c_info}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-1 mt-1 mb-1 h-40 w-3/4"
              ></textarea>
            </div>
            <br></br>
            <br></br>
            <h2 className="text-xl font-bold mb-2">Certificates and records</h2>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert1}* :
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange2}
                className="form-input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert2}* :
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange3}
                className="form-input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert3}* :
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange4}
                className="form-input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert4}* :
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange5}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
