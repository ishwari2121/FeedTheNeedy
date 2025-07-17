import express from "express";
import Donation from "../models/donation.js";

const router = express.Router();

export const addDonar = async (req, res) => {
  try {
    const {
      foodItem,
      quantity,
      expiryDate,
      pickupLocation,
      foodType,
    } = req.body;

    const donation = new Donation({
      foodItem,
      quantity,
      expiryDate,
      pickupLocation,
      foodType,
      donorName: req.user.name,
      donorContact: req.user.mobileNo,
      donorId: req.user.id,
    });

    await donation.save();
    res.status(201).json({ message: "Donation submitted successfully", donation });
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const mydonations = async (req, res) => {
    try {
      const userId = req.user.id;
      const donations = await Donation.find({ donorId: userId }).sort({ createdAt: -1 });
      res.status(200).json(donations);
    } catch (err) {
      console.error("Error fetching user donations:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

export const deletemydonation = async (req, res) => {

    try {
        const { id } = req.params;
    
        const donation = await Donation.findById(id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });
        console.log("donation.donorId:", donation.donorId);
        console.log("req.user.id:", req.user.id);

    
        if (donation.donorId.toString() !== req.user.id) {
          return res.status(403).json({ message: "Not allowed to delete this donation" });
        }
    
        await Donation.findByIdAndDelete(id);
        res.status(200).json({ message: "Donation deleted successfully" });
      } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: "Server error" });
      }

  }



export default router;
