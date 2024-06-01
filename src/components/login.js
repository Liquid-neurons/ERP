import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useUser } from "./contexts/context";


function Login() {
  const navigate = useNavigate();
  const { setUserEmail, setUserRole } = useUser(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    // Send JSON data to backend
    fetch("http://49.206.252.212:5000/login", {
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
        if (data.success) {
          setUserEmail(formData.email);
          setUserRole(data.role)
          if(data.role=='applicant'){
            alert("Login successful!");
            // Redirect to home page
            navigate("/homepage");
          }
          else{
            if(data.role=='admin'){
              alert("Login successful");
              // Redirect to home page
              navigate("/homepage-admin");
            }
          }
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally, you can handle errors here
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-center text-gray-800 mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Link to='/signup'><span className="block text-sm font-medium text-blue-700">New applicant? Register here</span></Link>
          <br></br>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
