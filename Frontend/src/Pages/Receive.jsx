import { useState, useEffect } from "react";
import axios from "axios";

export default function Receive() {
    const [foodItems, setFoodItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get("http://localhost:5000/food-items"); // Backend API
                setFoodItems(response.data);
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };
        fetchFoodItems();
    }, []);

    // Filter food items based on search
    const filteredItems = foodItems.filter(item =>
        item.foodItem.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Available Food Items</h2>
            
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />

            {/* Food Items List */}
            <div className="grid gap-4">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item._id} className="p-4 bg-gray-100 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{item.foodItem}</h3>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Expires on:</strong> {item.expiryDate}</p>
                            <p><strong>Pickup Location:</strong> {item.pickupLocation}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No food items found.</p>
                )}
            </div>
        </div>
    );
}
