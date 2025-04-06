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

  if (loading) return <p>Loading your donations...</p>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">My Donations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.length === 0 ? (
          <p className="col-span-full text-center">No donations yet.</p>
        ) : (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 relative"
            >
              <h2 className="text-lg font-semibold mb-1">{donation.foodItem}</h2>
              <p className="text-sm text-gray-600">Quantity: {donation.quantity}</p>
              <p className="text-sm text-gray-600">Type: {donation.foodType}</p>
              <p className="text-sm text-gray-600">
                Expiry: {new Date(donation.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Pickup: {donation.pickupLocation}
              </p>
              <button
                onClick={() => deleteDonation(donation._id)}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyDonations;
