import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { authUser, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">MyApp</Link>

                <div className="space-x-4">
                    {!authUser ? (
                        <>
                            <Link to="/login" className="text-white hover:underline">Login</Link>
                            <Link to="/signup" className="text-white hover:underline">Signup</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="text-white hover:underline">Profile</Link>
                            <button 
                                onClick={handleLogout} 
                                className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
