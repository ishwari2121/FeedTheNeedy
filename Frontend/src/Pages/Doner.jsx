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
    foodType: "Veg"
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
        foodType: "Veg"      
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Donate Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        Name of Food Item
        <input type="text" name="foodItem" value={formData.foodItem} onChange={handleChange} placeholder="Food Item" required className="w-full p-2 border rounded" />
        Quantity
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity (e.g., 2 kg, 5 plates)" required className="w-full p-2 border rounded" />
        Expiry date
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="w-full p-2 border rounded" />
        PickUplocation
        <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup Location" required className="w-full p-2 border rounded" />
        Food type
        <select name="foodType" value={formData.foodType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>


        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Donate Now</button>
      </form>

      <MyDonations/>
    </div>
  );
}
