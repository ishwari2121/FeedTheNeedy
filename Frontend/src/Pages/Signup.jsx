import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup Successful:", response.data);
      alert("Signup Successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error("Signup Failed:", error.response?.data || error.message);
      alert("Signup Failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-orange-600">🍽️ Create an Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="tel"
          name="mobileNo"
          placeholder="Mobile Number"
          onChange={handleChange}
          value={formData.mobileNo}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-orange-700 transition"
        >
          Signup
        </button>

        <div className="text-sm text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}
