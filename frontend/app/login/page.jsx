"use client";
import "../../styles/globals.css";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to Django backend
      const response = await fetch("http://127.0.0.1:8000/api/shadowslave/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully logged in, save JWT token
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        alert("Login successful!");
        // Redirect user to dashboard or home page
        window.location.href = "/dashboard"; // Replace with actual route
      } else {
        // Handle error (wrong credentials, etc.)
        alert(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="content-box">
      <h2>Login</h2>
      <div className="space"></div>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="space"></div>
    </div>
  );
}
