import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donorContact: 
{
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Invalid mobile number']
},
donorName: 
{ 
    type: String, 
    required: true 
},
  foodItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    default: "Veg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Donation", donationSchema);
