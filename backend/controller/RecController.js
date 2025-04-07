import express from "express";
import Donation from "../models/donation.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
const router = express.Router();

export const requestDonation = async (req, res) => {
  try {
    const { donationId } = req.body;

    const donation = await Donation.findById(donationId).populate("donorId");

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const { name, email, mobileNo } = req.user;
    const donorEmail = donation.donorId.email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: donorEmail,
      subject: `🍱 New Food Request: ${donation.foodItem} by ${name}`,
      html: `
        <h2>Hello ${donation.donorId.name || 'Donor'},</h2>
        <p>You have received a new food donation request!</p>
    
        <h3>📝 Request Details:</h3>
        <ul>
          <li><strong>Food Item:</strong> ${donation.foodItem}</li>
          <li><strong>Requested By:</strong> ${name}</li>
          <li><strong>Requested At:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })} IST</li>
        </ul>
    
        <h3>📩 Receiver Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Contact Number:</strong> ${mobileNo}</li>
        </ul>
    
        <p>📦 Please reach out to the receiver to coordinate the food pickup.</p>
        <br/>
        <p>Thank you for sharing food and kindness! 💚</p>
      `
    };
    

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request email sent to donor!" });

  } catch (error) {
    console.error("Email error:", error.message);
    res.status(500).json({ message: "Error sending email" });
  }
};

export const getalldonations = async (req, res) => {
    try {
      const donations = await Donation.find().sort({ createdAt: -1 });
      res.json(donations);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
}

export default router;
