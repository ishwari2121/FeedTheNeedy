import { useEffect, useState } from "react";
import axios from "axios";

export default function Receiver() {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/receiver/getalldonations", {
          withCredentials: true,
        });
        setDonations(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, []);

  const handleSendRequest = async (donationId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/receiver/reqdonations",
        { donationId },
        { withCredentials: true }
      );
      alert(`Request sent successfully for donation ID: ${donationId}`);
    } catch (err) {
      console.error("Failed to send request:", err);
      alert("Failed to send request. Please try again.");
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      donation.foodItem.toLowerCase().includes(lowerSearch) ||
      donation.foodType.toLowerCase().includes(lowerSearch) ||
      donation.pickupLocation.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-800">🍲 Available Food Donations</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by food item, type or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 mx-auto block px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 font-medium">
              No matching donations found.
            </p>
          ) : (
            filteredDonations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-orange-700 mb-2">{donation.foodItem}</h2>
                  <p className="text-sm text-gray-800"><strong>Quantity:</strong> {donation.quantity}</p>
                  <p className="text-sm text-gray-800"><strong>Type:</strong> {donation.foodType}</p>
                  <p className="text-sm text-gray-800"><strong>Expires on:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-800"><strong>Pickup Location:</strong> {donation.pickupLocation}</p>
                  <p className="text-sm text-gray-800"><strong>Donor Name:</strong> {donation.donorName}</p>
                  <p className="text-sm text-gray-800"><strong>Contact:</strong> {donation.donorContact}</p>
                </div>

                <button
                  onClick={() => handleSendRequest(donation._id)}
                  className="mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Send Request
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
