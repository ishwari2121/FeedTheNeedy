import express from "express";
import { addDonar,mydonations,deletemydonation} from "../controller/donarController.js";
import { authMiddleware } from '../middleware/authMiddlware.js'

const router = express.Router();

router.post("/addDonar",authMiddleware, addDonar);
router.get("/getmydonations",authMiddleware,mydonations);
router.delete("/delete/:id",authMiddleware,deletemydonation)
export default router;
