import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();

  const fetchMyDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/donar/getmydonations", {
        withCredentials: true,
      });
      setDonations(response.data);
    } catch (err) {
      console.error("Failed to fetch donations:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDonation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/donar/delete/${id}`, {
        withCredentials: true,
      });
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Failed to delete donation:", err);
      alert("Failed to delete donation.");
    }
  };

  useEffect(() => {
    fetchMyDonations();
  }, []);

  if (loading) return <p className="text-center text-gray-600 mt-6">Loading your donations...</p>;

  return (
    <div className="mt-12 max-w-6xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">🍽️ My Donations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No donations yet. Start spreading love! 💛</p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{donation.foodItem}</h2>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  donation.foodType === "Veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {donation.foodType}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">📦 Quantity: {donation.quantity}</p>
              <p className="text-sm text-gray-600 mb-1">📅 Expiry: {new Date(donation.expiryDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mb-4">📍 Location: {donation.pickupLocation}</p>

              <button
                onClick={() => deleteDonation(donation._id)}
                className="text-red-600 hover:underline text-sm font-medium"
              >
                ❌ Delete Donation
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDonations;
