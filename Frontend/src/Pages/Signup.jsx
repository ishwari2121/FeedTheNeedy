import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup Successful:", response.data);
      alert("Signup Successful!");
    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-5">
        <h2 className="text-2xl font-bold text-center text-blue-600">Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="tel"
          name="mobileNo"
          placeholder="Mobile Number"
          onChange={handleChange}
          value={formData.mobileNo}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
