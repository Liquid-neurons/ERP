import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FeeRegister() {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [data, setData] = useState({});
  const [instCodes, setInstCodes] = useState([]);
  const [formData, setFormData] = useState({
    INSTITUTE: "",
    STUDENTID: applicationId,
    SESSION: "",
    CLASS: "",
    JUNE: "",
    JULY: "",
    AUGUST: "",
    SEPTEMBER: "",
    OCTOBER: "",
    NOVEMBER: "",
    DECEMBER: "",
    JANUARY: "",
    FEBRUARY: "",
    MARCH: "",
    LATEFEEPERDAY: "",
    LATEFEEAPPLICABLE: "",
    CUTOFFDAY: "",
    CHATID: "",
    R_FEE: "",
    REMARK: "",
    S_FEE: "",
    B_FEE: "",
    U_FEE: "",
    R_DATE: "",
    A_DATE: "",
  });

  useEffect(() => {
    // Define a function to fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://49.206.252.212:5000/fee-master-desc"
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

    const fetchInstCodes = async () => {
      try {
        const response = await fetch("http://49.206.252.212:5000/fetch-inst_codes");
        if (!response.ok) {
          throw new Error("Failed to fetch institute codes");
        }
        const jsonData = await response.json();
        setInstCodes(jsonData);
      } catch (error) {
        console.error("Error fetching institute codes:", error);
        // Handle error
      }
    };


    // Call the fetchData function when the component mounts
    fetchData();
    fetchInstCodes();
    console.log(instCodes);

    // Clean up function (optional)
    return () => {
      // Perform any necessary cleanup here
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form data to JSON
    const jsonData = JSON.stringify(formData);

    console.log(formData);

    // Send JSON data to backend
    fetch("http://49.206.252.212:5000/fee-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.success) {
          alert("Data entered successfully");
          navigate("/register");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally, you can handle errors here
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2 flex justify-center">
        Fee registration
      </h1>
      <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
        <div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Student Details</h2>
            <div className="mb-2">
        <label htmlFor="institute" className="form-label block font-semibold">
          Institute* :
        </label>
        <select
          name="INSTITUTE"
          id="institute"
          value={formData.INSTITUTE}
          onChange={handleChange}
          className="form-input border rounded-md px-3 py-2 mt-1 mb-5"
        >
          <option value="">Select Institute</option>
          {instCodes.map((code, index) => (
            <option key={index} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
            <div class="mb-2">
              <label for="studentid" class="form-label block font-semibold">
                {data["Student_ID "]}* :
              </label>
              <input
                type="text"
                name="STUDENTID"
                id="studentid"
                value={formData.STUDENTID}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="session" class="form-label block font-semibold">
                {data.SESSION}* :
              </label>
              <input
                type="text"
                name="SESSION"
                id="session"
                value={formData.SESSION}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="class" class="form-label block font-semibold">
                {data.CLASS}* :
              </label>
              <input
                type="text"
                name="CLASS"
                id="class"
                value={formData.CLASS}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="chatid" class="form-label block font-semibold">
                {data.Chat_ID}:
              </label>
              <input
                type="text"
                name="CHATID"
                id="chatid"
                value={formData.CHATID}
                onChange={handleChange}
                class="form-input border rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="R_DATE" class="form-label block font-semibold">
                {data.R_DATE}* :
              </label>
              <input
                type="date"
                name="R_DATE"
                id="R_DATE"
                value={formData.R_DATE}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="A_DATE" class="form-label block font-semibold">
                {data.A_DATE}* :
              </label>
              <input
                type="date"
                name="A_DATE"
                id="A_DATE"
                value={formData.A_DATE}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Late Fee Setup</h2>
            <div class="mb-2">
              <label for="latefee" class="form-label block font-semibold">
                {data.LateFeeApplicable} :
              </label>
              <select
                name="LATEFEEAPPLICABLE"
                id="LATEFEEAPPLICABLE"
                value={formData.LATEFEEAPPLICABLE}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              >
                <option value="N">No</option>
                <option value="Y">Yes</option>
              </select>
            </div>
            <div class="mb-2">
              <label for="latefeeperday" class="form-label block font-semibold">
                {data.LateFee_PerDay} :
              </label>
              <input
                type="text"
                name="LATEFEEPERDAY"
                id="latefeeperday"
                value={formData.LATEFEEPERDAY}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
            <div class="mb-2">
              <label for="cutoff" class="form-label block font-semibold">
                {data.cutoffDay} :
              </label>
              <input
                type="text"
                name="CUTOFFDAY"
                id="cutoff"
                value={formData.CUTOFFDAY}
                onChange={handleChange}
                class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="border p-4 rounded-lg shadow-md grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <div class="mb-2 flex justify-center">
                <h2 class="text-xl font-bold mb-2">Student Fee setup</h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 ml-20 px-5">
                <div class="mb-2">
                  <label for="S_FEE" class="form-label block font-semibold">
                    {data.S_FEE}* :
                  </label>
                  <input
                    type="text"
                    name="S_FEE"
                    id="S_FEE"
                    value={formData.S_FEE}
                    onChange={handleChange}
                    class="form-input border rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="R_FEE" class="form-label block font-semibold">
                    {data.R_FEE}* :
                  </label>
                  <input
                    type="text"
                    name="R_FEE"
                    id="R_FEE"
                    value={formData.R_FEE}
                    onChange={handleChange}
                    class="form-input border rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="U_FEE" class="form-label block font-semibold">
                    {data.U_FEE}* :
                  </label>
                  <input
                    type="text"
                    name="U_FEE"
                    id="U_FEE"
                    value={formData.U_FEE}
                    onChange={handleChange}
                    class="form-input border rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="B_FEE" class="form-label block font-semibold">
                    {data.B_FEE}* :
                  </label>
                  <input
                    type="text"
                    name="B_FEE"
                    id="B_FEE"
                    value={formData.B_FEE}
                    onChange={handleChange}
                    class="form-input border rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md col-span-2 mt-4">
            <div className="col-span-2">
              <div class="mb-2 flex justify-center">
                <h2 class="text-xl font-bold mb-2">Installment Setup</h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 ml-20 px-5">
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.June} :
                  </label>
                  <input
                    type="text"
                    name="JUNE"
                    id="session"
                    value={formData.JUNE}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.July} :
                  </label>
                  <input
                    type="text"
                    name="JULY"
                    id="session"
                    value={formData.JULY}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.August} :
                  </label>
                  <input
                    type="text"
                    name="AUGUST"
                    id="session"
                    value={formData.AUGUST}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.September} :
                  </label>
                  <input
                    type="text"
                    name="SEPTEMBER"
                    id="session"
                    value={formData.SEPTEMBER}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.October} :
                  </label>
                  <input
                    type="text"
                    name="OCTOBER"
                    id="session"
                    value={formData.OCTOBER}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.November} :
                  </label>
                  <input
                    type="text"
                    name="NOVEMBER"
                    id="session"
                    value={formData.NOVEMBER}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.December} :
                  </label>
                  <input
                    type="text"
                    name="DECEMBER"
                    id="session"
                    value={formData.DECEMBER}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.January} :
                  </label>
                  <input
                    type="text"
                    name="JANUARY"
                    id="session"
                    value={formData.JANUARY}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.February} :
                  </label>
                  <input
                    type="text"
                    name="FEBRUARY"
                    id="session"
                    value={formData.FEBRUARY}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
                <div class="mb-2">
                  <label for="session" class="form-label block font-semibold">
                    {data.March} :
                  </label>
                  <input
                    type="text"
                    name="MARCH"
                    id="session"
                    value={formData.MARCH}
                    onChange={handleChange}
                    class="form-input border  rounded-md px-3 py-2 mt-1 mb-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg shadow-md col-span-2 mt-4">
            <div class="mb-2">
              <label
                for="ailmentDetails"
                class="form-label block font-semibold"
              >
                {data["REMARK"]} :
              </label>
              <textarea
                name="REMARK"
                id="REMARK"
                value={formData.REMARK}
                onChange={handleChange}
                class="form-input border rounded-md px-2 py-0.5 mt-1 mb-1 h-40 w-full"
              ></textarea>
            </div>
          </div>
        </div>

        <div></div>
        <div className="col-span-3 flex justify-center mt-14">
            <button
              type="submit"
              className="form-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 rounded flex"
            >
              Submit
            </button>
          </div>
      </form>
    </div>
  );
}

export default FeeRegister;

