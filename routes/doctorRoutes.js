
import express from "express"
import { protect } from "../middleware/Authmiddleware.js";
import { createDoctor } from "../controllers/DoctorController.js";
import { rolemiddleware } from "../middleware/Rolemiddleware.js";

const router = express.Router();


router.post("/create",protect,rolemiddleware("superadmin"),createDoctor);




export default router;