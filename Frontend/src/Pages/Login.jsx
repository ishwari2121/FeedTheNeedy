import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/authContext"; // Import useContext hook
import { useNavigate } from "react-router-dom"; 

export default function Login() {
    const { login } = useAuthContext(); // Get login function from context
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
            const response = await axios.post("http://localhost:5000/api/auth/login", formData,{ withCredentials: true });
            login(response.data);
            console.log("Login Successful:", response.data);
            navigate("/dashboard");
        } catch (error) {
            setError("Invalid credentials. Please try again.");
            console.error("Login Failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
