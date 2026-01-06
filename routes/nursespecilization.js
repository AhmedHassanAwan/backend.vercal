

import express from "express"
import { GetAllNurseSpecialization , createNurseSpecialization } from "../controllers/NurseSpecializationController.js";
import { protect } from "../middleware/Authmiddleware.js";
import { rolemiddleware } from "../middleware/Rolemiddleware.js";


const router = express.Router();


router.post("/nurse-specializations/create" , protect , rolemiddleware("superadmin") ,  createNurseSpecialization);
router.get("/nurse-specializations" , protect ,  rolemiddleware("superadmin") ,  GetAllNurseSpecialization);

export default router;