
import express from  "express"
import { protect } from "../middleware/Authmiddleware.js";
import  {createReception} from "../controllers/ReceptionController.js"
import { rolemiddleware } from "../middleware/Rolemiddleware.js";


const router = express.Router();


router.post("/create" , protect ,  rolemiddleware("superadmin"),  createReception  )

export default router 