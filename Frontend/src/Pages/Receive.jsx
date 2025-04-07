import { useEffect, useState } from "react";
import axios from "axios";

export default function Receiver() {
  const [donations, setDonations] = useState([]);

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
      const response = await axios.post(
        'http://localhost:5000/api/receiver/reqdonations',
        { donationId },
        { withCredentials: true }
      );
  
      alert(`Request sent successfully for donation ID: ${donationId}`);
    } catch (err) {
      console.error("Failed to send request:", err);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{donation.foodItem}</h2>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Type:</strong> {donation.foodType}</p>
            <p><strong>Expires on:</strong> {new Date(donation.expiryDate).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {donation.pickupLocation}</p>
            <p><strong>Donor:</strong> {donation.donorName} ({donation.donorContact})</p>
            <button
              onClick={() => handleSendRequest(donation._id)}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Send Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
