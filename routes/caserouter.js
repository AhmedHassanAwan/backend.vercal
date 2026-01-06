

import express from "express"
import { protect } from "../middleware/Authmiddleware.js";
import { rolemiddleware } from "../middleware/Rolemiddleware.js";
import { createcase, getcase  , getSingleCase } from "../controllers/CaseController.js";

const router = express.Router();


router.post("/create" , protect , rolemiddleware("Receptionist") ,createcase)
router.get("/get-case" , protect , rolemiddleware("Receptionist") ,  getcase)
router.get("/get-case/:id"  ,  protect , rolemiddleware("Receptionist") , getSingleCase)



export default router;