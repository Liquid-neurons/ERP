import React, { useState, useEffect } from "react";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useUser } from "./contexts/context";
import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useNavigate, useParams } from "react-router-dom";
import { getConfig } from './contexts/config';

function StudentForm() {
  const [data, setData] = useState({});
  const { userEmail } = useUser();
  const [errors, setErrors] = useState({});
  const{api}=getConfig();

  const navigate = useNavigate();

  useEffect(() => {
    // Define a function to fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api.base_url}/student-master-desc`
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
    mail: userEmail,
    f_name: "",
    f_quali: "",
    f_occ: "",
    m_name: "",
    m_quali: "",
    m_occ: "",
    g_name: "",
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

  // const generatePDF = async (formData) => {
  //   try {
  //     // Create a new PDF document
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage();

  //     // Add content to the PDF
  //     const { width, height } = page.getSize();
  //     const fontSize = 15;
  //     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //     // Title
  //     const title = "LILY MONTESSORI";
  //     const address1 =
  //       "House no. 1, Cheramuthu, 2nd cross, Ayappa layout, Behind KMF,";
  //     const address2 = "Marathahalli, Bengaluru - 560037,";
  //     const phone = "Phone : +9108813990";
  //     const email = "Email: lilymontessori2022@gmail.com";

  //     const titleWidth = helveticaFont.widthOfTextAtSize(title, fontSize);
  //     const lineHeight = fontSize + 5; // Adjust this as needed for spacing between lines
  //     const centerX = width / 2;

  //     let currentY = height - 50; // Starting y-coordinate

  //     // Center aligning title and address
  //     page.drawText(title, {
  //       x: centerX - titleWidth / 2, // Center aligning title
  //       y: currentY,
  //       size: fontSize + 5,
  //       font: helveticaFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     currentY -= lineHeight;

  //     page.drawText(address1, {
  //       x: centerX - helveticaFont.widthOfTextAtSize(address1, fontSize) / 2, // Center aligning
  //       y: currentY,
  //       size: fontSize,
  //       font: helveticaFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     currentY -= lineHeight;

  //     page.drawText(address2, {
  //       x: centerX - helveticaFont.widthOfTextAtSize(address2, fontSize) / 2, // Center aligning
  //       y: currentY,
  //       size: fontSize,
  //       font: helveticaFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     currentY -= lineHeight;

  //     page.drawText(phone, {
  //       x: centerX - helveticaFont.widthOfTextAtSize(phone, fontSize) / 2, // Center aligning
  //       y: currentY,
  //       size: fontSize,
  //       font: helveticaFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     currentY -= lineHeight;

  //     page.drawText(email, {
  //       x: centerX - helveticaFont.widthOfTextAtSize(email, fontSize) / 2, // Center aligning
  //       y: currentY,
  //       size: fontSize,
  //       font: helveticaFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     // Form fields (left aligned)
  //     const startX = 50;
  //     const startY = currentY + 50; // Move down after the address

  //     const drawFormField = (label, value) => {
  //       const labelHeight = helveticaFont.heightAtSize(fontSize);
  //       const labelLines = Math.ceil(
  //         helveticaFont.widthOfTextAtSize(label, fontSize) / (width - startX)
  //       );
  //       const valueLines = Math.ceil(
  //         helveticaFont.widthOfTextAtSize(value, fontSize) /
  //           (width - (startX + 200))
  //       );
  //       const totalLines = Math.max(labelLines, valueLines);
  //       const totalHeight = totalLines * (fontSize + 5); // Adjust as needed for line spacing

  //       page.drawText(label, {
  //         x: startX,
  //         y: currentY - totalHeight, // Adjusted y-coordinate based on totalHeight
  //         size: fontSize,
  //         font: helveticaFont,
  //         color: rgb(0, 0, 0),
  //       });

  //       page.drawText(value, {
  //         x: startX + 200,
  //         y: currentY - totalHeight, // Adjusted y-coordinate based on totalHeight
  //         size: fontSize,
  //         font: helveticaFont,
  //         color: rgb(0, 0, 0),
  //       });

  //       currentY -= totalHeight;
  //     };

  //     // Render form fields
  //     for (const [label, value] of Object.entries(formData)) {
  //       drawFormField(label, value);
  //     }

  //     // Save the PDF
  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: "application/pdf" });
  //     saveAs(blob, "application.pdf");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };

  const validateInputs = () => {
    const newErrors = {};

    const isValidNumber = (value) => {
      return /^-?\d+(\.\d+)?$/.test(value);
    };
  
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.bdate) newErrors.bdate = "Birth date is required!";
    if (!formData.sex) newErrors.sex = "Gender is required!";
    if (!formData.mtongue) newErrors.mtongue = "Mother tongue is required!";
    if (!formData.p_address) newErrors.p_address = "Primary address is required!";
    if (!formData.p_phone) {
      newErrors.p_phone = "Primary phone number is required!";
    } else if (formData.p_phone.length !== 12) {
      newErrors.p_phone = "Phone number is incorrect!";
    }
    if (formData.s_phone && !isValidNumber(formData.s_phone)) {
      newErrors.s_phone = "Phone number is incorrect!";
    }
    if (!formData.f_name) newErrors.f_name = "Father's name is required!";
    if (!formData.m_name) newErrors.m_name = "Mother's name is required!";

    if (formData.distance && !isValidNumber(formData.distance)) {
      newErrors.distance = "Enter a valid numerical value in kilometers!";
    }
    if (formData.m_income && !isValidNumber(formData.m_income)) {
      newErrors.m_income = "Enter a valid numerical value!!";
    }
  
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateInputs();
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      // If there are errors, do not proceed
      return;
    }

    try {
      //Error handling)
      
      
      
      const formDataToSend = {
        ...formData, // Include regular form data properties
        files: {
          file1: await fileToBase64(file1),
          file2: await fileToBase64(file2),
          file3: await fileToBase64(file3),
          file4: await fileToBase64(file4),
          file5: await fileToBase64(file5),
        },
      };

      console.log(formDataToSend);
      // Send the form data and files separately
      const formDataResponse = await fetch(
        `${api.base_url}/STUDENT_MASTER`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSend),
        }
      );

      if (!formDataResponse.ok) {
        throw new Error("Network response for form data was not ok");
      }

      const formDataData = await formDataResponse.json();
      console.log(formDataData);
      if (formDataData.success) {
        alert(
          `Application submitted successfully\n \n Your application ID is : ${formDataData.id}`
        );
        // generatePDF(formData);
        navigate("/homepage");
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
      if (!file) {
        // If no file is provided, resolve the promise with a blank result
        resolve("");
        return;
      }

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
                {data.IMAGE}* 
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange1}
                className="form-input"
                required
              />
            </div>
            <div class="mb-2">
              <label for="name" class="form-label block font-semibold">
                {data.NAME}* 
              </label>
               <div className="relative">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input border rounded-md px-1 py-1 mt-1 mb-1 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.name}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
        </div>
      </div>
            <div class="mb-2">
              <label for="dateOfBirth" class="form-label block font-semibold">
                {data.BDATE}* 
              </label>
              <div className="relative">
              <input
                type="date"
                name="bdate"
                id="bdate"
                value={formData.bdate}
                onChange={handleChange}
                class="form-input px-3 py-1 mt-1 mb-1"
              />
              {errors.bdate && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.bdate}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
            <div class="mb-2">
              <label for="gender" class="form-label block font-semibold">
                {data["SEX "]}* 
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
              <div className="relative">
              <input
                type="text"
                name="mtongue"
                id="mtongue"
                value={formData.mtongue}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
               {errors.mtongue && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.mtongue}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
          </div>
            </div>
            <div class="mb-2">
              <label for="religion" class="form-label block font-semibold">
                {data.Religion} 
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
                {data.caste} 
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
                {data.P_ADDRESS}* 
              </label>
              <div className="relative">
              <textarea
                name="p_address"
                id="p_address"
                value={formData.p_address}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-1 mt-1 mb-1 h-40 w-3/4"
              ></textarea>
              {errors.p_address && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.p_address}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
            <div class="mb-2">
              <label for="primaryPhone" class="form-label block font-semibold">
                {data.P_PHONE}* 
              </label>
              <div className="relative">
              +<input
                type="text"
                name="p_phone"
                id="p_phone"
                value={formData.p_phone}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
                required
              />
               {errors.p_phone && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.p_phone}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
            <div class="mb-2">
              <label for="distance" class="form-label block font-semibold">
                {data.DISTANCE} 
              </label>
              <div className="relative">
              <input
                type="text"
                name="distance"
                id="distance"
                value={formData.distance}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1 "
              /> KM
              {errors.distance && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.distance}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
          </div>
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
                {data["F_NAME "]}* 
              </label>
              <div className="relative">
              <input
                type="text"
                name="f_name"
                id="f_name"
                value={formData.f_name}
                onChange={handleChange}
                className="form-input border rounded-md"
              />
               {errors.f_name && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.f_name}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
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
                {data["M_NAME "]}* 
              </label>
              <div className="relative">
              <input
                type="text"
                name="m_name"
                id="m_name"
                value={formData.m_name}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-1 mt-1 mb-1"
              />
                {errors.m_name && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.m_name}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
            <div class="mb-2">
              <label for="motherName" class="form-label block font-semibold">
                {data.M_QUALI} 
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
                {data.M_OCC} :
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
                {data["G_NAME "]} 
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
                {data.M_INCOME} 
              </label>
              <div className="relative">
              <input
                type="text"
                name="m_income"
                id="m_income"
                value={formData.m_income}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-1 mt-1 mb-1"
              />
               {errors.m_income && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.m_income}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="col-span-3 flex justify-center mt-14">
            <button
              type="submit"
              className="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 ounded flex"
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className="border p-7 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Additional Details</h2>
            <div className="mb-2">
              <label
                htmlFor="secondaryPhone"
                className="form-label block font-semibold"
              >
                {data.S_PHONE}
              </label>
              <div className="relative">
              +<input
                type="text"
                name="s_phone"
                id="s_phone"
                value={formData.s_phone}
                onChange={handleChange}
                className="form-input border rounded-md"
              />
               {errors.s_phone && (
            <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-sm py-1 px-2 rounded shadow-lg">
              {errors.s_phone}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-red-500"></div>
            </div>
          )}
              </div>
            </div>
            <div class="mb-2">
              <label for="email" class="form-label block font-semibold">
                {data.MAIL}* 
              </label>
              <input
                type="email"
                name="mail"
                id="mail"
                value={userEmail} // Set the value directly from the prop
                className="form-input border rounded-md px-3 py-1 mt-1 mb-1"
                readOnly // Make the input field read-only to prevent user modification
              />
            </div>
            <div class="mb-2">
              <label for="ailment" class="form-label block font-semibold">
                {data.C_AILMENT}?* 
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
                {data.C_AILMENT_INFO} 
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
                {data["C_INFO "]} 
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
                {data.Cert3}* 
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange4}
                className="form-input"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert1} 
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
                {data.Cert4} 
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange5}
                className="form-input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="form-label block font-semibold">
                {data.Cert2} 
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange3}
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
