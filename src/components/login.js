import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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

    console.log(formData);

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
        console.log("Success:", data);
        if (data.success) {
          alert("Login successful");
          // Redirect to home page
          navigate("/home");
        } else {
          alert("Not authorised");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally, you can handle errors here
      });
  };

  return (
    <div>
      <center>
        <h1>Admin Login</h1>
      </center>
      <div className="login-form-container">
        <h2 className="login-form-header">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form-label">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-form-input"
            />
          </label>
          <br />
          <label className="login-form-label">
            password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="login-form-input"
            />
          </label>
          <br />
          <button type="submit" className="login-form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
