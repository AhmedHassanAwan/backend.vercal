
import express from "express"
import {protect} from "../middleware/Authmiddleware.js"
import { rolemiddleware } from "../middleware/Rolemiddleware.js"
import { createBranch , GetAllBranches , updateBranch} from "../controllers/Branches.js"



const router = express.Router()

router.post("/create" , protect , rolemiddleware("superadmin") ,  createBranch)
router.get("/getallbranch" , protect , rolemiddleware("superadmin") , GetAllBranches)
router.put("/branch/:id" , protect , rolemiddleware("superadmin") , updateBranch)


export default router