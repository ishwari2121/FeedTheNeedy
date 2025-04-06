import { useAuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
    const { authUser, logout } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
            navigate("/login");
        }
    }, [authUser, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-3xl font-bold">Welcome, {authUser?.name}!</h1>

            {/* Donor & Receiver Buttons */}
            <div className="flex space-x-4">
                <button 
                    onClick={() => navigate("/donar")} 
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
                >
                    Donor
                </button>

                <button 
                    onClick={() => navigate("/receiver")} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
                >
                    Receiver
                </button>
            </div>

            {/* Logout Button */}
            <button 
                onClick={logout} 
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}
