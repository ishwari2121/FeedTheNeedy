import express from "express";
import { authMiddleware } from '../middleware/authMiddlware.js'
import {getalldonations,requestDonation} from '../controller/RecController.js'
const router = express.Router();

router.get("/getalldonations",authMiddleware,getalldonations);
router.post("/reqdonations",authMiddleware,requestDonation);

export default router;
