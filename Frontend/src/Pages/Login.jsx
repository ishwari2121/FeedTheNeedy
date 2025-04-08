import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      login(response.data.user);
      console.log("Login Successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError("Invalid credentials. Redirecting to Signup...");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">🍽️ Login to Continue</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 animate-pulse">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
          >
            Login
          </button>

          <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 font-medium hover:underline">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
