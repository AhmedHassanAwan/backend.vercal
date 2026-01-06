

import express from "express"
import { createDoctorSpecialization , GetAllDoctorSpecialization , updateDoctorSpecialization} from "../controllers/DoctorSpecializationController.js";
import { protect } from "../middleware/Authmiddleware.js";
import { rolemiddleware } from "../middleware/Rolemiddleware.js";


const router = express.Router();


router.post("/doctor-specializations/create" , protect ,  rolemiddleware("superadmin") ,  createDoctorSpecialization);
router.get("/doctor-specializations" , protect ,   rolemiddleware("superadmin") ,  GetAllDoctorSpecialization);
router.put("/doctor-specializations/:id" , protect ,  rolemiddleware("superadmin") ,   updateDoctorSpecialization);


export default router;