import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { HeartHandshake } from "lucide-react"; 

export default function Navbar() {
    const { authUser, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-md py-3 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link to={authUser ? "/dashboard" : "/"} className="flex items-center space-x-2">
                    <HeartHandshake className="text-orange-600" size={28} />
                    <span className="text-xl font-bold text-orange-700">FeedTheNeedy</span>
                </Link>

                <div className="space-x-4">
                    {!authUser ? (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-orange-600 transition font-medium">
                                Login
                            </Link>
                            <Link to="/signup" className="text-gray-700 hover:text-orange-600 transition font-medium">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="text-gray-700 hover:text-orange-600 transition font-medium">
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-1.5 rounded-xl hover:bg-red-600 font-medium transition"
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
