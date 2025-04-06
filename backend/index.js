import "./cronJobs/deleteExpiredDonations.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import donarRoutes from './routes/donarRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
import cron from "node-cron";
import Donation from "../models/donation.js";

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true               // allow cookies
}));

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/donar',donarRoutes)


// Default route
app.get('/', (req, res) => {
  res.send('PrepVault Backend is running!');
});

connectDB();

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const result = await Donation.deleteMany({ expiryDate: { $lt: now } });
    console.log(`Deleted ${result.deletedCount} expired donation(s)`);
  } catch (error) {
    console.error("Cron job error:", error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
