
import express from 'express';
import { login , logout , changePassword } from '../controllers/authController.js';
import { refreshToken } from '../controllers/tokencontroller.js';
import { protect } from "../middleware/Authmiddleware.js";



const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/changed-password' , protect , changePassword  )

export default router;