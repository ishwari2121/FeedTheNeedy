import { useState } from "react";
import { useAuthContext } from "../Context/authContext";
import axios from "axios";
import MyDonations from "../Components/MyDonation";

export default function Donor() {
  const { authUser } = useAuthContext();

  const [formData, setFormData] = useState({
    foodItem: "",
    quantity: "",
    expiryDate: "",
    pickupLocation: "",
    foodType: "Veg",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      alert("Please login to donate.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/donar/addDonar",
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      alert("Donation Listed Successfully!");
      setFormData({
        foodItem: "",
        quantity: "",
        expiryDate: "",
        pickupLocation: "",
        foodType: "Veg",
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation.");
    }
  };

  return (
    <div className="px-4 md:px-10 py-10  bg-orange-50">
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200 mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">🍛 Donate Food</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Name of Food Item</label>
            <input
              type="text"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleChange}
              placeholder="e.g. Biryani, Sandwiches"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 5 plates, 2 kg"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g. Shivaji Nagar, Pune"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Food Type</label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
          >
            Donate Now
          </button>
        </form>
      </div>

      <hr className="border-t border-gray-300 my-12 mx-auto max-w-4xl" />

      <div className="max-w-6xl mx-auto">
        <MyDonations />
      </div>
    </div>
  );
}
