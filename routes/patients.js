
import express from "express"
import { protect } from "../middleware/Authmiddleware.js"
import { rolemiddleware } from "../middleware/Rolemiddleware.js"
import { createPatient } from "../controllers/PatientsController.js"

const router = express.Router()



router.post("/create" , protect , rolemiddleware("Receptionist") , createPatient);


export default router;