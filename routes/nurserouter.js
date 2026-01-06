
import express from "express";
import { protect } from "../middleware/Authmiddleware.js";
import { NurseCreate } from "../controllers/NurseController.js";
import { rolemiddleware } from "../middleware/Rolemiddleware.js";

const router =  express.Router();




router.post('/create' , protect , rolemiddleware("superadmin") ,  NurseCreate);

export default router